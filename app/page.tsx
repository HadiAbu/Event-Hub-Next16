import { EventDocument } from "@/database";
import EventCard from "./components/EventCard";
import ExploreBtn from "./components/ExploreBtn";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const INTERNAL_BASE_URL = process.env.INTERNAL_API_BASE_URL;

const Page = async () => {
  "use cache";
  cacheLife("hours");

  if (!BASE_URL) {
    throw new Error(
      "INTERNAL_BASE_URL is not defined. Set INTERNAL_BASE_URL in your environment."
    );
  }

  let events: EventDocument[] = [];

  // try {
  //   const res = await fetch(`${BASE_URL}/api/events`);

  //   if (!res.ok) {
  //     throw new Error(
  //       `Failed to fetch events: ${res.status} ${res.statusText}`
  //     );
  //   }

  //   const payload = await res.json();

  //   if (!payload || !Array.isArray(payload.events)) {
  //     throw new Error(
  //       "Invalid response shape from /api/events; expected { events: [] }"
  //     );
  //   }

  //   events = payload.events as EventDocument[];
  // } catch (err) {
  //   // Throw so Next.js surfaces the error during SSR; alternative: render fallback UI
  //   const message = err instanceof Error ? err.message : String(err);
  //   throw new Error(`Error fetching events: ${message}`);
  // }

  return (
    <section>
      <h1 className="text-center">
        Welcome to <span className="text-primary">EventHub</span>
      </h1>
      <p className="text-center mt-5">
        Discover and join amazing events around you!
      </p>
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
