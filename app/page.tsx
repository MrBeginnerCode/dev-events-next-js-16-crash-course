import React, { Suspense } from 'react' // 1. THÊM IMPORT SUSPENSE Ở ĐÂY
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 
                 (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// Tạo một component phụ để xử lý fetch riêng biệt
const EventList = async () => {
    const response = await fetch(`${BASE_URL}/api/events`, {
        next: { revalidate: 3600 } 
    });
    const { events } = await response.json();

    return (
        <ul className="events">
            {events && events.length > 0 && events.map((event: IEvent) => {
                 return <li key={event.title} className={'list-none'}> <EventCard {...event} /> </li>
            })}
        </ul>
    )
}

const Page = async () => {
    return (
        <section>
            <h1 className="text-center">
                The Hub for Every Dev <br/>
                Event You Can't Miss
            </h1>

            <p className="text-center mt-5"> Hackathons, Meetups and Conferences, All in One Place</p>
            <ExploreBtn/>
            <div className="space-y-7 mt-20">
                <h3>Featured Event</h3>
                
                {/* 2. BỌC SUSPENSE XUNG QUANH COMPONENT FETCH DATA */}
                <Suspense fallback={<p className="text-center">Loading events...</p>}>
                    <EventList />
                </Suspense>
                
            </div>
        </section>
    )
}
export default Page;