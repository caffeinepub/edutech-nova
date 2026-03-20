# EduTech Nova

## Current State
APE AI page exists as a game-only AI assistant (Snake, Pong, Breakout, Quiz game, Platformer). It handles game development prompts only.

## Requested Changes (Diff)

### Add
- Full app/website builder capability (todo apps, calculators, landing pages, portfolios, dashboards, weather UI, timer, etc.)
- More game types (Tetris, memory match, flappy bird, tic-tac-toe, etc.)
- Code generation for React components, CSS styling, HTML pages
- App idea brainstorming and planning responses
- More quick prompt chips covering diverse app types
- Caffeine AI-style welcome message introducing full-stack capabilities
- Live HTML iframe demos for all generated web apps
- Richer conversational responses for "what can you build", "help me", "ideas" etc.

### Modify
- Expand getApeResponse to handle 20+ prompt categories
- Update quick prompts to show diverse app types
- Update header subtitle from "Game Developer AI" to "Build Anything AI"
- Welcome message updated to reflect full capabilities

### Remove
- Nothing removed

## Implementation Plan
1. Add 15+ new HTML app templates (calculator, todo, timer, landing page, dashboard, portfolio, weather UI, markdown editor, quiz builder, color picker, password generator, etc.)
2. Add 8+ new game templates (Tetris, tic-tac-toe, memory match, flappy bird, etc.)
3. Expand getApeResponse with comprehensive keyword matching
4. Update quick prompts chips to cover both apps and games
5. Update header and welcome message
6. Support iframe rendering for all HTML demos
