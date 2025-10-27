"use client";
import ExploreBtn from "./components/ExploreBtn";

const Home = () => {
  return (
    <section>
      <h1 className="text-center">
        And you shall see me as the rightus deliverer <br /> of good and evil
      </h1>
      <p className="text-center mt-5">The power of christ compels you!</p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Upcoming Events</h3>

        <ul className="event">
          {[1, 2, 3, 4, 5].map((event) => (
            <li key={event} className="event-card">
              {`Event ${event}`}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
