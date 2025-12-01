import { EventDocument } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { capitalize } from "@/lib/utils";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import BookEvent from "./BookEvent";
import EventCard from "./EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item: string) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventDetailsItem = ({
  icon,
  label,
  alt,
}: {
  icon: string;
  label: string;
  alt: string;
}) => {
  return (
    <div className="flex-row-gap-2">
      <Image src={icon} alt={alt} width={17} height={17} />
      <span>{label}</span>
    </div>
  );
};

const EventDetails = async ({ params }: { params: Promise<string> }) => {
  "use cache";
  cacheLife("hours");

  const slug = await params; // slug must be awaited

  let event;
  try {
    const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!request.ok) {
      if (request.status === 404) {
        return notFound();
      }
      throw new Error(`Failed to fetch event: ${request.statusText}`);
    }

    const response = await request.json();
    event = response.event;

    if (!event) {
      return notFound();
    }
  } catch (error) {
    console.error("Error fetching event:", error);
    return notFound();
  }
  //descructure event object
  const {
    title,
    description,
    image,
    overview,
    location,
    time,
    venue,
    mode,
    audience,
    organizer,
    agenda,
    tags,
  } = event;

  if (!description) {
    return notFound();
  }

  const bookings = 10;

  // Similar Events
  const similarEvents: EventDocument[] = (await getSimilarEventsBySlug(
    slug
  )) as unknown as EventDocument[];

  return (
    <section id="event">
      <div className="header">
        <h1>{`${capitalize(title)}`}</h1>
        <p>{` ${description}`}</p>
        <div className="details">
          <div className="content">
            <img
              src={image}
              alt="event-image"
              width={800}
              height={800}
              className="banner"
            />
            <section className="flex-col-gap-2">
              <h2>Overview</h2>
              <p>{overview}</p>
            </section>
            <section className="flex-col-gap-2">
              <h2>Event Details</h2>
              <EventDetailsItem
                icon="/icons/calendar.svg"
                label={"Date: " + time.toString().slice(0, 10)}
                alt="calendar-icon"
              />
              <EventDetailsItem
                icon="/icons/audience.svg"
                label={audience}
                alt="audience-icon"
              />
              <EventDetailsItem
                icon="/icons/clock.svg"
                label={"Time: " + time.toString().slice(11, 16)}
                alt="clock-icon"
              />
              <EventDetailsItem
                icon="/icons/pin.svg"
                label={venue + ", " + location}
                alt="pin-icon"
              />
              <EventDetailsItem
                icon="/icons/mode.svg"
                label={mode}
                alt="mode-icon"
              />
            </section>
            {agenda && agenda.length != 0 && (
              <EventAgenda agendaItems={agenda} />
            )}
            {tags && tags.length != 0 && <EventTags tags={tags} />}
            <div className="flex-col-gap-2">
              <h2>Organizer</h2>
              <p>{organizer}</p>
            </div>
          </div>
          <aside className="booking">
            <div className="signup-card">
              <h2>Book your spot</h2>
              {bookings > 0 ? (
                <p className="text-lg semi-bold">
                  Join people who have already booked their spot
                </p>
              ) : (
                <p className="text-sm semi-bold">
                  Be the first to book your spot
                </p>
              )}
              <BookEvent eventId={event._id} slug={event.slug} />
            </div>
          </aside>
        </div>
        <div className="flex w-full flex-col gap-4 pt-20">
          <h2>Similar Events</h2>
          <div className="events">
            {similarEvents &&
              similarEvents.length != 0 &&
              similarEvents.map((event: EventDocument) => (
                <EventCard key={event.slug} {...event}></EventCard>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
