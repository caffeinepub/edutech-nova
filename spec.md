# EduTech Nova

## Current State
- React + Motoko app with quiz (25 JEE questions) and motivational messages
- Quiz page shows questions and navigates to results page with score/total
- Results page shows score percentage, grade, and buttons to retry or go home
- No name input before quiz, no certificate generation

## Requested Changes (Diff)

### Add
- Name input screen before quiz starts: user types their name before beginning the quiz
- Name is stored in component state and passed along to results via router search params
- Certificate generation page/section in QuizResults: after quiz completion, a downloadable certificate is auto-generated on a canvas element
- Certificate design includes:
  - EduTech Nova official stamp (circular badge with logo)
  - "Apatra" signature at the bottom
  - Student name prominently displayed
  - Score/percentage achieved
  - Date of completion
  - Certificate title: "Certificate of Achievement"
- Download button to save certificate as PNG image
- Certificate gallery view: certificates are displayed in a gallery card style on the results page

### Modify
- Quiz.tsx: Add a "name entry" screen shown before the first question. User enters their name and clicks "Start Quiz". Name is passed to results route via search params.
- QuizResults.tsx: Accept `name` from search params, generate certificate on canvas, show download button
- App.tsx: Update route search param types to include `name` field for quiz results route

### Remove
- Nothing removed

## Implementation Plan
1. Update App.tsx to include `name` in quizResultsRoute search params validation
2. Update Quiz.tsx to show name input form before quiz begins; pass name to results route
3. Update QuizResults.tsx:
   - Accept name from search params
   - Add `<canvas>` element that renders the certificate
   - Draw certificate on canvas: background, title, name, score, date, EduTech Nova stamp image, Apatra signature text
   - Add "Download Certificate" button that uses canvas.toDataURL() to trigger download
4. Generate stamp image asset: circular EduTech Nova official stamp PNG
5. Generate signature image: "Apatra" handwritten-style signature PNG
