# ModuLeague Lobby Foundation

## Run locally
1. `npm install`
2. `npm run dev`
3. Open `/lobby`

## What is mocked
- Authenticated user/session data (`ScoreSeeker`)
- Lobby dashboard stats, season progress, daily challenge, rank, friends, announcements
- Open matches feed
- Ranked queue start/cancel flow and join/custom match confirmations

## Future backend integrations
Replace `lib/services/lobby-service.ts` implementations with real API or WebSocket calls:
- `getCurrentUser()`
- `getLobbyDashboard()`
- `getOpenMatches()`
- `startRankedQueue(preferences)`
- `cancelQueue()`
- `joinMatch(matchId)`
- `getFriendsOnline()`
- `getAnnouncements()`

This `/lobby` page is structured as an authenticated game dashboard shell for future routes: `/ranked`, `/leaderboard`, `/stats`, `/store`, `/practice`, `/tournaments`, and `/friends`.
