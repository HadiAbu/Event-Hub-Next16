type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

// another way to type params
// const EventDetailsPage = async ({params}:{params: Promise<{slug: string}>}) => {
const EventDetailsPage = async ({ params }: RouteParams) => {
  const { slug } = await params; // slug must be awaited
  return <div>page - {`${slug}`}</div>;
};

export default EventDetailsPage;
