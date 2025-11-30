import Image from "next/image";
import Link from "next/link";
import { capitalize, formatTime, formatDate } from "../../lib/utils";

interface EventCardProps {
  image: string;
  title: string;
  description: string;
  location: string;
  slug: string;
  agenda: string;
  time: string;
  mode: string;
  venue: string;
}

const EventCard = ({
  image,
  title,
  location,
  description,
  slug,
  agenda,
  mode,
  venue,
  time,
}: EventCardProps) => {
  return (
    <div>
      <Link href={`/events/${slug}`} id="event-card">
        <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Image
            src={image}
            alt={title}
            width={410}
            height={300}
            className="poster"
          />
          <h1 className="title ml-2 mt-2">{capitalize(title)}</h1>
          <div className="flex flex-row gap-2 p-1 ml-2">
            <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
            <p>{location}</p>
          </div>

          <div className="datetime mb-2">
            <div className="ml-2">
              <Image
                src="/icons/calendar.svg"
                alt="date"
                width={14}
                height={14}
              />
              <p>{formatDate(time)}</p>
              <p>
                <span className="font-semibold">Venue:</span>{" "}
                {capitalize(venue)}
              </p>
              <p>
                <span className="font-semibold">Mode:</span> {capitalize(mode)}
              </p>
            </div>
            <div>
              <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
              <p>{formatTime(time)}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
