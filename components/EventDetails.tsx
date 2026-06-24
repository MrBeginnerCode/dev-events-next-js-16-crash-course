import React from 'react'
import {notFound} from "next/navigation";
import Image from "next/image";
import "@/app/globals.css";
import BookEvent from "@/components/bookEvent";
import {IEvent} from "@/database/event.model";
import {getSimilarEventBySLug} from "@/lib/actions/event.actions";
import EventCard from '@/components/EventCard';
import {cacheLife} from 'next/cache';
import { Suspense } from 'react';

const EventDetailedItem = ({icon, alt,label}: {icon : string; alt:string;label :string})=> (
    <div className ="flex items-center gap-2">
        <Image src = {icon} alt={alt} height ={17} width ={17}/>
        <p>{label}</p>
    </div>
)
const EventAgenda = ({agendaItems}: {agendaItems:string[]}) => (
    <div className ="agenda">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => (
                <li key = {item}>{item}</li>
            ))}
        </ul>
    </div>
)
const EventTag = ({tags}:{tags:string[]}) => (
    <div className ="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag)=>(
            <div className = "pill" key = {tag}>{tag}</div>
        ))}
    </div>
)

// Đảm bảo BASE_URL tự động nhận diện domain Production nếu biến môi trường bị lỗi
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 
                 (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// GIỮ NGUYÊN KIỂU DỮ LIỆU Promise<string> THEO Ý BẠN
const EventDetails = async ({params}: {params: Promise<string>}) => {

    'use cache'
    cacheLife('seconds'); // Đồng bộ theo giây tương thích với cấu hình Turbopack tĩnh lúc build
    
    // Đợi giải nén Promise lấy chuỗi slug thật
    const slug = await params;
    
    let eventData: any = null;

    try {
        // Thực hiện gọi fetch an toàn bằng URL tuyệt đối
        const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
            next: { revalidate: 60 }
        });
        
        if (request.ok) {
            const data = await request.json();
            eventData = data.event;
        }
    } catch (error) {
        console.error("Lỗi Fetch API chi tiết event trên Vercel:", error);
    }

    // Nếu không fetch được data hoặc data trống, trả về trang 404 thay vì làm sập web
    if (!eventData || !eventData.description) return notFound();

    const { _id, description, image, overview, date, time, location, mode, agenda, audience, organizer, tags } = eventData;
    const bookings = 10;
    const SimilarEvents : IEvent[] = await getSimilarEventBySLug(slug);

    return (
        <section id = "event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>
            <div className="details">
                {/* Left Side - Event Content  */}
                <div className="content">
                    <Image src={image} alt ="Event Banner" width = {800} height = {800} className="banner" />
                    <section className="flex flex-col gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2>Event Details </h2>
                        <EventDetailedItem icon={"/icons/calendar.svg"} alt={"calendar"} label={date}/>
                        <EventDetailedItem icon={"/icons/clock.svg"} alt={"calendar"} label={time}/>
                        <EventDetailedItem icon={"/icons/pin.svg"} alt={"calendar"} label={location}/>
                        <EventDetailedItem icon={"/icons/mode.svg"} alt={"calendar"} label={mode}/>
                        <EventDetailedItem icon={"/icons/audience.svg"} alt={"calendar"} label={audience}/>
                    </section>
                    <EventAgenda agendaItems={agenda}/>
                    <section className="flex flex-col gap-2">
                        <h2>About the Organizer </h2>
                        <p>{organizer}</p>
                    </section>
                    <EventTag tags={tags}/>
                </div>

                {/* Right Side - Booking Form  */}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0? (
                            <p className="text-sm">
                                Join {bookings} people who have already booked their spot!
                            </p>
                        ):(
                            <p className="text-sm">
                                Be the first to book your spot!
                            </p>
                        )}
                        <Suspense fallback={<p>Loading form...</p>}>
                            <BookEvent eventId={_id?.toString()} slug={slug}/>
                        </Suspense>
                    </div>
                </aside>
            </div>
            <div className = 'flex w-full flex-col gap-4 pt-20'>
                <h2> Similar Events</h2>
                <div className={"events"}>
                    {SimilarEvents && SimilarEvents.length > 0 &&
                        SimilarEvents.map((event: IEvent) => (
                            <EventCard
                            key={event._id.toString()}
                            title={event.title}
                            image={event.image}
                            slug={event.slug}
                            location={event.location}
                            date={event.date}
                            time={event.time}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default EventDetails;