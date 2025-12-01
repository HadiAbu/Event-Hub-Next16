import { Suspense } from "react";

// another way to type params
const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = params.then((p) => p.slug);
  return (
    <main>
      <Suspense fallback={<div>Loading event details...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <EventDetails params={slug} />
      </Suspense>
    </main>
  );
};

export default EventDetailsPage;
