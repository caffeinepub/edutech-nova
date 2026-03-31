# EduTech Nova - APE AI Enhanced

## Current State
APE AI section exists with conversational game/app code generation. It shows generated HTML/JS/CSS code and renders it in an iframe as a live demo. Games include Snake, Pong, Breakout, Tic-Tac-Toe, Memory Match, Platformer, and various web apps (Calculator, Todo, Timer, etc.).

## Requested Changes (Diff)

### Add
- **Published Apps Gallery**: A "Published Apps" tab/section in APE AI where all user-published creations are listed with view counts
- **Publish Button**: After generating an app/game, user can click "Publish" to save it to the gallery
- **View Count Tracking**: Each published app tracks how many times it has been opened/viewed
- **Full-screen Play Mode**: When viewing a published app, it opens in a full-screen modal with the actual working game/app running (not just a small demo iframe)
- **App Cards in Gallery**: Each published app shows title, type (game/app), view count, and a "Play" / "Open" button
- **Actual Working Games**: The generated games must be fully playable (keyboard controls, mouse controls, scoring, win/lose conditions) — not just demos

### Modify
- APE AI chat: After generating code, add a prominent "Publish This App" button alongside the existing live demo
- Improve game templates to be fully playable with complete game loops
- iframe demo size increased for better preview

### Remove
- Nothing removed

## Implementation Plan
1. Add localStorage-based store for published apps (id, title, type, code, views, publishedAt)
2. Add "Publish" button in the code output area
3. Add "Published Apps" section/tab showing gallery of published apps
4. Each gallery card: title, emoji icon, view count badge, "Play" button
5. Play button opens full-screen modal with the app running in a sandboxed iframe
6. View count increments each time Play is clicked
7. Improve game code templates to be fully playable (Snake with score+game over, Pong with AI opponent, Breakout complete, Platformer with controls)
8. Keep all existing features intact
