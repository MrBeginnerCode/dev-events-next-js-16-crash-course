# PostHog post-wizard report

The wizard has completed a deep integration of the DevEvent Next.js App Router project — a hub for developer events (hackathons, meetups, conferences). PostHog client-side analytics is initialized via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), a reverse proxy is configured in `next.config.ts`, and three user interaction events are now instrumented. `NavBar.tsx` was converted to a client component and gained `nav_link_clicked` tracking. A server-side PostHog utility (`lib/posthog-server.ts`) was created using `posthog-node` for future API route or Server Action usage. Environment variables were written to `.env.local`.

| Event | Description | File |
|---|---|---|
| `event_card_clicked` | User clicks on an event card to view details about a dev event. | `components/EventCard.tsx` |
| `explore_button_clicked` | User clicks the 'Explore Events' call-to-action button on the homepage. | `components/ExploreBtn.tsx` |
| `nav_link_clicked` | User clicks a navigation link in the site header. | `components/NavBar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/481162/dashboard/1744990)
- [Event engagement over time](https://us.posthog.com/project/481162/insights/U7IBuoPj)
- [Unique users clicking events](https://us.posthog.com/project/481162/insights/dXiZnTYb)
- [Explore to event card conversion funnel](https://us.posthog.com/project/481162/insights/5mDX2nf0)
- [Nav link clicks by destination](https://us.posthog.com/project/481162/insights/iOijnoFV)
- [Top events clicked by users](https://us.posthog.com/project/481162/insights/R7cU4d8G)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
