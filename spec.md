# Specification

## Summary
**Goal:** Add 25 JEE-style multiple-choice questions to the backend quiz questions store.

**Planned changes:**
- Add 25 JEE-style questions to the backend Motoko actor in `backend/main.mo`
- Each question includes question text, 4 answer options (A, B, C, D), and the correct answer index
- Questions are distributed across Physics (~8-9), Chemistry (~8-9), and Mathematics (~8-9) topics relevant to JEE preparation

**User-visible outcome:** Users can take quizzes featuring 25 JEE-style questions covering Physics, Chemistry, and Mathematics, with correct answer validation working for all questions.
