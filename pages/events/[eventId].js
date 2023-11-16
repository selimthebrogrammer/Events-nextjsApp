import Head from "next/head";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

const EventDetailPage = ({ event }) => {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  const { title, date, location, image, description } = event;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </>
  );
};

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((e) => ({ params: { eventId: e.id } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { eventId },
  } = context;

  const event = await getEventById(eventId);

  if (!event) return { notFound: true };

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export default EventDetailPage;
