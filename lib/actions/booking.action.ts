'use server'


import connectDB from '@/lib/mongodb'
import {Booking} from '@/database/booking.model'
import {getPostHogClient} from '@/lib/posthog-server'
export const createBooking = async ({eventId,slug,email}: {eventId:string,slug:string,email:string,}) => {
    try{
        await connectDB();
        await Booking.create({eventId,slug,email});

        const posthog = getPostHogClient();
        posthog.capture({
            distinctId: email,
            event: 'booking_created',
            properties: { eventId, slug, email },
        });

        return {success: true};
    } catch(e){
        console.log("Event booking failed",e);
        return {success: false};
    }
}