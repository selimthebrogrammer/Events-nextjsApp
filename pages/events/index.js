import Head from "next/head";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-util";

const EventsPage = ({ events }) => {
  const { push } = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    push(fullPath).then();
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolge..."
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default EventsPage;
