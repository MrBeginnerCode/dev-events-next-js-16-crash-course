import React from 'react'
import {notFound} from "next/navigation";
import Image from "next/image";
import "@/app/globals.css";
import BookEvent from "@/components/bookEvent";
import {IEvent} from "@/database/event.model";
import {getSimilarEventBySLug} from "@/lib/actions/event.actions";
import EventCard from '@/components/EventCard';
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
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const EventDetailPage = async({params}:{params:Promise<{slug:string}>}) => {
    const {slug} = await params;
    const request = await fetch(`${BASE_URL}/api/events/${slug}`,{
        next: {revalidate: 60}
    });
    const {event:{description,image,overview,date,time,location,mode,agenda,audience,organizer,tags }} = await request.json();
    if (!description) return notFound();
    const bookings = 10;
    const SimilarEvents : IEvent[] = await getSimilarEventBySLug(slug);

    return (
        <section id = "event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>
            <div className="details">
                {/*     Left Side - Event Content  */}
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

                {/*     Right Side - Booking Form  */}
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
                        <BookEvent />
                    </div>
                </aside>
            </div>
            <div className = 'flex w-full flex-col gap-4 pt-20'>
                <h2> Similar Events</h2>
                <div className={"events"}>
                    {SimilarEvents.length > 0 && SimilarEvents.map((SimilarEvent: IEvent)=>(
                        <EventCard key = {(SimilarEvent.title)}{...SimilarEvent}/>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default EventDetailPage
