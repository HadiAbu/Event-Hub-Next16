import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  image: string;
  title: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ image, title, location, date, time }: EventCardProps) => {
  return (
    <div>
      <Link href={`/events`} id="event-card">
        <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Image
            src={image}
            alt={title}
            width={410}
            height={300}
            className="poster"
          />
          <div className="flex flex-row gap-2 p-1">
            <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
            <p>{location}</p>
          </div>

          <p className="title">{title}</p>

          <div className="datetime">
            <div>
              <Image
                src="/icons/calendar.svg"
                alt="date"
                width={14}
                height={14}
              />
              <p>{date}</p>
            </div>
            <div>
              <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
              <p>{time}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
