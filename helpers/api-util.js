export async function getAllEvents() {
  // const url = process.env.NEXT_PUBLIC_API_URL + "/events.json";
  // const response = await fetch(url);
  // const data = await response.json();
  const data = [
    {
      id : 'm1',
      title : 'first title',
      location : 'first place',
      image : '',
      description : 'first tour',
      date : '20-10-2023'
    },
    {
      id : 'm2',
      title : 'second title',
      location : 'second place',
      image : '',
      description : 'second tour',
      date : 'no'
    }
  ]

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const events = await getAllEvents();
  return events.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const events = await getAllEvents();

  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
}

export async function getEventById(id) {
  const events = await getAllEvents();
  return events.find((event) => event.id === id);
}
