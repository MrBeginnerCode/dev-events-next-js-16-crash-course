<wizard-report>
# PostHog post-wizard report

The wizard completed a deep integration of PostHog analytics into the DevEvent Next.js App Router project. Client-side PostHog is initialized via `instrumentation-client.ts` (Next.js 15.3+ pattern) with a reverse proxy configured in `next.config.ts`. A server-side PostHog client in `lib/posthog-server.ts` is shared across Server Actions and API routes. Users are identified with their email address when they submit a booking. Three new events were added to supplement the four that were already instrumented.

| Event name | Description | File |
|---|---|---|
| `event_card_clicked` | Fires when a user clicks an event card on the listing page | `components/EventCard.tsx` |
| `explore_button_clicked` | Fires when the "Explore Events" CTA button is clicked | `components/ExploreBtn.tsx` |
| `nav_link_clicked` | Fires when a navigation link is clicked in the header | `components/NavBar.tsx` |
| `event_booked` | Fires on the client after a booking form is successfully submitted | `components/bookEvent.tsx` |
| `booking_created` | Server-side confirmation that a booking was persisted to the database | `lib/actions/booking.action.ts` |
| `event_created` | Server-side event fired when a new event is published via the POST API | `app/api/events/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) dashboard](https://us.posthog.com/project/481162/dashboard/1754867)
- [Event card clicks over time](https://us.posthog.com/project/481162/insights/ObfuY5qQ)
- [Booking conversion funnel](https://us.posthog.com/project/481162/insights/KleAyhrd)
- [Total bookings](https://us.posthog.com/project/481162/insights/t1jbAIQN)
- [User engagement — explore & navigation](https://us.posthog.com/project/481162/insights/wqBtWPxa)
- [New events created](https://us.posthog.com/project/481162/insights/ux4XslK3)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any onboarding scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — currently identification only happens on fresh booking submissions; a user who has booked before and returns in a new session will be anonymous until their next booking.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
