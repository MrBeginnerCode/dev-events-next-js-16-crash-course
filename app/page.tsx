import React, { Suspense } from 'react'
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";

// Đảm bảo URL luôn tuyệt đối 100% trên Vercel
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 
                 (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const EventList = async () => {
    let events: IEvent[] = [];
    
    try {
        // Log để kiểm tra chính xác URL đang gọi trên Vercel (xem trong Vercel Logs)
        console.log("Fetching from URL:", `${BASE_URL}/api/events`);
        
        const response = await fetch(`${BASE_URL}/api/events`, {
            next: { revalidate: 60 } // Thiết lập thời gian cache mềm
        });

        if (response.ok) {
            const data = await response.json();
            events = data.events || [];
        }
    } catch (error) {
        console.error("API Fetch Error:", error);
    }

    return (
        <ul className="events">
            {events && events.length > 0 ? (
                events.map((event: IEvent) => (
                    <li key={event._id?.toString() || event.title} className={'list-none'}> 
                        <EventCard {...event} /> 
                    </li>
                ))
            ) : (
                <p className="text-center text-gray-400">No events found.</p>
            )}
        </ul>
    );
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
                
                {/* Phải có Suspense bao quanh để Next.js tách luồng xử lý fetch động */}
                <Suspense fallback={<p className="text-center">Loading events from API...</p>}>
                    <EventList />
                </Suspense>
            </div>
        </section>
    )
}

export default Page;