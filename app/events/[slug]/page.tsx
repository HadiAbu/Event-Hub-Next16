import { notFound } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { EventDocument } from "@/database";
import Image from "next/image";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

const EventTags = ({ tagItems }: { tagItems: string[] }) => (
  <div className="tags">
    <h2>Tags</h2>
    <ul className="">
      {tagItems.map((item: string) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
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

// another way to type params
// const EventDetailsPage = async ({params}:{params: Promise<{slug: string}>}) => {
const EventDetailsPage = async ({ params }: RouteParams) => {
  const { slug } = await params; // slug must be awaited
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const event = await request.json();
  const {
    event: {
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
    },
  } = event;
  if (!event) {
    return notFound();
  }
  return (
    <section id="event">
      <div className="header">
        <h1>{`${slug}`}</h1>
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
            {tags && tags.length != 0 && (
              <EventTags tagItems={JSON.parse(tags[0])} />
            )}
          </div>
          <aside className="booking">
            <p className="text-lg semi-bold">Book Event</p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
