import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Event } from "@/database/event.model";

interface RouteParams {
  slug: string;
}

interface ErrorResponse {
  message: string;
  error?: string;
}

/**
 * GET /api/events/[slug]
 * Fetch a single event by its URL-friendly slug.
 *
 * @param request - Next.js request object
 * @param params - Route parameters containing slug
 * @returns JSON response with event data or error message
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
): Promise<NextResponse<{ message: string; event?: object } | ErrorResponse>> {
  try {
    // Extract and validate slug from route parameters
    const { slug } = await params;

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        {
          message: "Invalid request",
          error: "slug parameter is required and must be a non-empty string",
        },
        { status: 400 }
      );
    }

    // Normalize slug to lowercase for consistent queries
    const normalizedSlug = slug.toLowerCase().trim();

    // Connect to database
    await connectDB();

    // Query the Event model for a matching slug
    const event = await Event.findOne({ slug: normalizedSlug });

    // Return 404 if event not found
    if (!event) {
      return NextResponse.json(
        {
          message: "Event not found",
          error: `No event found with slug: ${normalizedSlug}`,
        },
        { status: 404 }
      );
    }

    // Return event data on success
    return NextResponse.json(
      {
        message: "Event fetched successfully",
        event: event.toObject(),
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging
    console.error("Error fetching event by slug:", error);

    // Return generic error response for unexpected errors
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error:
          error instanceof Error ? error.message : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
