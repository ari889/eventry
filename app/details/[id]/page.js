import EventDetails from "@/components/details/EventDetails";
import EventVenue from "@/components/details/EventVenue";
import HeroSection from "@/components/details/HeroSection";
import { getEventById } from "@/db/queries";

export async function generateMetadata({ params: { id } }) {
  const eventInfo = await getEventById(id);
  return {
    title: `Eventry - ${eventInfo?.name}`,
    description: eventInfo?.details,
    opengraph: {
      images: [eventInfo?.imageUrl],
    },
  };
}

const DetailsPage = async ({ params: { id } }) => {
  const event = await getEventById(id);
  return (
    <>
      <HeroSection event={event} />
      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          <EventDetails details={event?.details} swags={event?.swags} />
          <EventVenue location={event?.location} />
        </div>
      </section>
    </>
  );
};
export default DetailsPage;
