import React, { Suspense } from 'react'
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import connectDB from "@/lib/mongodb";
import { Event } from "@/database/event.model";
import { cacheLife } from 'next/cache';

// 1. Tách phần kết nối DB và lấy dữ liệu thành 1 Component riêng biệt
const EventList = async () => {
    'use cache';
    cacheLife('seconds');

    let events: IEvent[] = [];
    try {
        await connectDB();
        const data = await Event.find().sort({ createdAt: -1 }).lean();
        events = JSON.parse(JSON.stringify(data));
    } catch (error) {
        console.error("Lỗi lấy dữ liệu từ DB:", error);
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
                <p className="text-center text-gray-400">No events found in Database.</p>
            )}
        </ul>
    );
};

// 2. Component Page chính chỉ lo phần khung giao diện và bọc Suspense
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
                
                {/* Bọc Suspense ở đây để Next.js tách luồng xử lý DB tĩnh lúc build */}
                <Suspense fallback={<p className="text-center text-gray-400">Loading events...</p>}>
                    <EventList />
                </Suspense>
            </div>
        </section>
    )
}

export default Page;