import { notFound } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { EventDocument } from "@/database";
import Image from "next/image";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

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
    <div className="flex-row-gap-2 items-center">
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
              label={"Date & Time: " + time}
              alt="calendar-icon"
            />
          </section>
        </div>
        <div className="booking">
          <aside className="text-lg semi-bold">Book Event</aside>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
