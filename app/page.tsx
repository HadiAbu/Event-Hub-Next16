import { EventDocument } from "@/database";
import EventCard from "./components/EventCard";
import ExploreBtn from "./components/ExploreBtn";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

  return (
    <section>
      <h1 className="text-center">
        And you shall see me as the rightus deliverer <br /> of good and evil
      </h1>
      <p className="text-center mt-5">The power of christ compels you!</p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Upcoming Events</h3>

        <ul className="event grid" id="events">
          {events &&
            events.length > 0 &&
            events.map((event: EventDocument) => (
              <li key={event.title} className="list-none">
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
