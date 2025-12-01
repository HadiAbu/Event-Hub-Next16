const AboutPage = () => {
  return (
    <section className="max-w-4xl">
      <h1 className="text-center">
        About <span className="text-primary">EventHub</span>
      </h1>
      <p className="text-center mt-5 text-light-100">
        Your premier destination for discovering and booking amazing events
      </p>

      <div className="mt-16 space-y-12">
        <div className="space-y-4">
          <h2>Our Mission</h2>
          <p className="text-light-100 text-lg leading-relaxed">
            EventHub is dedicated to connecting people with extraordinary
            experiences. We believe that events have the power to inspire,
            educate, and bring communities together. Our platform makes it easy
            to discover, book, and attend events that matter to you.
          </p>
        </div>

        <div className="space-y-4">
          <h2>What We Offer</h2>
          <ul className="space-y-3 text-light-100 text-lg">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>
                A curated selection of events across various categories
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Easy booking and registration process</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Real-time updates on event details and availability</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Personalized recommendations based on your interests</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2>Join Our Community</h2>
          <p className="text-light-100 text-lg leading-relaxed">
            Whether you're looking to attend a workshop, conference, concert, or
            networking event, EventHub has something for everyone. Join
            thousands of event-goers who trust us to help them discover their
            next unforgettable experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
