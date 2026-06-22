import React from 'react'
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {events} from "@/lib/constants";
const Page = () => {
    return (
    <section>
            <h1 className="text-center">
                The Hub for Every Dev <br/>
                Event You Can't Miss
            </h1>

        <p className = "text-center mt-5"> Hackathons, Meetups and Conferences, All in One Place</p>
        <ExploreBtn/>
        <div className="space-y-7 mt-20">
            <h3>
                Featured Event
            </h3>
            <ul className="events">
                {events.map((event)=>{
                     return <li key = {event.title}> <EventCard {...event} /> </li>
                })}
            </ul>
        </div>
    </section>

    )
}
export default Page
