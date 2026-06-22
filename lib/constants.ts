export interface Event {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    image: "/images/event1.png",
    title: "React Summit 2026",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands",
    date: "June 2-3, 2026",
    time: "9:00 AM - 6:00 PM",
  },
  {
    image: "/images/event2.png",
    title: "Next.js Conf 2026",
    slug: "nextjs-conf-2026",
    location: "San Francisco, CA",
    date: "October 25-26, 2026",
    time: "9:00 AM - 5:00 PM",
  },
  {
    image: "/images/event3.png",
    title: "TypeScript Bootcamp",
    slug: "typescript-bootcamp-2026",
    location: "New York, NY",
    date: "July 10-12, 2026",
    time: "10:00 AM - 4:00 PM",
  },
  {
    image: "/images/event4.png",
    title: "Web Performance Summit",
    slug: "web-perf-summit-2026",
    location: "Berlin, Germany",
    date: "August 15-17, 2026",
    time: "9:00 AM - 6:00 PM",
  },
  {
    image: "/images/event5.png",
    title: "JavaScript Hackathon 2026",
    slug: "js-hackathon-2026",
    location: "London, UK",
    date: "September 18-20, 2026",
    time: "Friday 6:00 PM - Sunday 6:00 PM",
  },
  {
    image: "/images/event6.png",
    title: "Full Stack Dev Meetup",
    slug: "fullstack-meetup-2026",
    location: "Toronto, Canada",
    date: "July 22, 2026",
    time: "6:30 PM - 8:30 PM",
  },
];
