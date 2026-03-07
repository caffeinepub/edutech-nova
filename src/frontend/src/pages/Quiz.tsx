import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { JEE_QUESTIONS, type LocalQuestion } from "@/data/quizData";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  FunctionSquare,
  Sparkles,
  User,
  XCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";

type AnswerState = "unanswered" | "correct" | "incorrect";

const SUBJECT_COLORS: Record<LocalQuestion["subject"], string> = {
  Physics: "oklch(0.42 0.22 265)",
  Chemistry: "oklch(0.38 0.16 185)",
  Mathematics: "oklch(0.68 0.20 52)",
};

const SUBJECT_BG: Record<LocalQuestion["subject"], string> = {
  Physics: "oklch(0.92 0.05 265 / 0.8)",
  Chemistry: "oklch(0.92 0.06 185 / 0.8)",
  Mathematics: "oklch(0.95 0.06 85 / 0.8)",
};

const SubjectIcon = ({ subject }: { subject: LocalQuestion["subject"] }) => {
  if (subject === "Physics") return <Zap className="w-3.5 h-3.5" />;
  if (subject === "Chemistry") return <FlaskConical className="w-3.5 h-3.5" />;
  return <FunctionSquare className="w-3.5 h-3.5" />;
};

export default function Quiz() {
  const navigate = useNavigate();
  const questions = JEE_QUESTIONS;

  const [studentName, setStudentName] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isAnswered = answerState !== "unanswered";
  const isLastQuestion = currentIndex === questions.length - 1;
  const progressPercent = (currentIndex / questions.length) * 100;

  const handleSelectAnswer = (idx: number) => {
    if (isAnswered) return;
    const isCorrect = idx === currentQuestion.correctIndex;
    setSelectedAnswer(idx);
    setAnswerState(isCorrect ? "correct" : "incorrect");
    if (isCorrect) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      navigate({
        to: "/quiz/results",
        search: {
          score,
          total: questions.length,
          name: studentName,
        },
      });
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedAnswer(null);
    setAnswerState("unanswered");
  };

  // ── Name entry screen ──────────────────────────────────────────────
  if (!quizStarted) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-lg">
        <div
          className="rounded-3xl p-8 md:p-10 border animate-scale-in"
          style={{
            background: "oklch(1 0 0)",
            border: "1px solid oklch(0.88 0.03 265 / 0.7)",
            boxShadow:
              "0 8px 40px -8px oklch(0.18 0.08 265 / 0.14), 0 2px 8px -2px oklch(0.18 0.08 265 / 0.06)",
          }}
        >
          {/* Icon */}
          <div className="flex items-center justify-center mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-glow-indigo animate-float"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.42 0.22 265), oklch(0.52 0.24 285))",
              }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-3">
              Before You Begin...
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Enter your name to receive a personalized certificate upon
              completion! 🎓
            </p>
          </div>

          {/* Name Input */}
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input
                data-ocid="quiz.input"
                type="text"
                placeholder="Your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && studentName.trim()) {
                    setQuizStarted(true);
                  }
                }}
                className="pl-12 h-14 text-base rounded-2xl border-2 focus:border-indigo bg-background font-semibold text-foreground placeholder:text-muted-foreground/60 transition-colors"
                style={{ borderColor: "oklch(0.88 0.03 265 / 0.8)" }}
                autoFocus
              />
            </div>

            <Button
              data-ocid="quiz.submit_button"
              size="lg"
              disabled={!studentName.trim()}
              onClick={() => setQuizStarted(true)}
              className="w-full text-white font-bold text-base py-6 rounded-2xl shadow-glow-indigo hover:scale-[1.02] transition-all duration-200 border-0 h-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.42 0.22 265), oklch(0.52 0.24 285))",
              }}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Start Quiz
            </Button>
          </div>

          {/* Info pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: "oklch(0.92 0.05 265 / 0.8)",
                color: "oklch(0.42 0.22 265)",
              }}
            >
              📝 {questions.length} Questions
            </span>
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: "oklch(0.95 0.06 85 / 0.8)",
                color: "oklch(0.68 0.20 52)",
              }}
            >
              🏆 Certificate on completion
            </span>
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: "oklch(0.92 0.06 185 / 0.8)",
                color: "oklch(0.38 0.16 185)",
              }}
            >
              ⚡ Instant feedback
            </span>
          </div>

          {/* Subject badges */}
          <div
            className="mt-5 pt-5 border-t"
            style={{ borderColor: "oklch(0.92 0.03 265 / 0.5)" }}
          >
            <p className="text-center text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              Subjects Covered
            </p>
            <div className="flex justify-center gap-2">
              {(["Physics", "Chemistry", "Mathematics"] as const).map((s) => (
                <span
                  key={s}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{
                    background: SUBJECT_BG[s],
                    color: SUBJECT_COLORS[s],
                  }}
                >
                  <SubjectIcon subject={s} />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz screen ────────────────────────────────────────────────────
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-glow-indigo"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.42 0.22 265), oklch(0.52 0.24 285))",
            }}
          >
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">
              JEE Quiz
            </h1>
            <p className="text-xs text-muted-foreground">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="text-sm font-bold px-3 py-1.5"
          style={{
            background: "oklch(0.92 0.05 265 / 0.8)",
            color: "oklch(0.42 0.22 265)",
            border: "none",
          }}
        >
          Score: {score}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress
          value={progressPercent}
          className="h-2.5 rounded-full bg-muted"
        />
        <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
          <span>{currentIndex} done</span>
          <span>{questions.length - currentIndex} remaining</span>
        </div>
      </div>

      {/* Subject Badge */}
      <div className="mb-3">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{
            background: SUBJECT_BG[currentQuestion.subject],
            color: SUBJECT_COLORS[currentQuestion.subject],
          }}
        >
          <SubjectIcon subject={currentQuestion.subject} />
          {currentQuestion.subject}
        </span>
      </div>

      {/* Question Card */}
      <div
        className="rounded-3xl p-6 md:p-8 border mb-6 animate-fade-in"
        style={{
          background: "oklch(1 0 0)",
          border: "1px solid oklch(0.88 0.03 265 / 0.7)",
          boxShadow:
            "0 4px 24px -4px oklch(0.18 0.08 265 / 0.10), 0 2px 8px -2px oklch(0.18 0.08 265 / 0.06)",
        }}
      >
        <div className="flex items-start gap-3 mb-6">
          <span
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-glow-indigo"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.42 0.22 265), oklch(0.52 0.24 285))",
            }}
          >
            {currentIndex + 1}
          </span>
          <h2 className="font-display font-bold text-xl md:text-2xl text-foreground leading-snug">
            {currentQuestion.text}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.answers.map((answer, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrectAnswer = idx === currentQuestion.correctIndex;

            let optionClass = "answer-option border-border bg-background";

            if (isAnswered) {
              if (isCorrectAnswer) {
                optionClass =
                  "answer-option correct border-teal bg-teal-light/30";
              } else if (isSelected && !isCorrectAnswer) {
                optionClass =
                  "answer-option incorrect border-destructive bg-destructive/10";
              } else {
                optionClass =
                  "answer-option border-border bg-background opacity-60";
              }
            } else if (isSelected) {
              optionClass =
                "answer-option selected border-indigo bg-indigo-light/30";
            }

            return (
              <button
                // biome-ignore lint/suspicious/noArrayIndexKey: answer options are positional
                key={idx}
                type="button"
                className={cn(
                  "w-full text-left flex items-center gap-3",
                  optionClass,
                )}
                onClick={() => handleSelectAnswer(idx)}
                disabled={isAnswered}
              >
                <span
                  className={cn(
                    "flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors",
                    isAnswered && isCorrectAnswer
                      ? "border-teal bg-teal text-white"
                      : isAnswered && isSelected && !isCorrectAnswer
                        ? "border-destructive bg-destructive text-white"
                        : "border-muted-foreground text-muted-foreground",
                  )}
                >
                  {isAnswered && isCorrectAnswer ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isAnswered && isSelected && !isCorrectAnswer ? (
                    <XCircle className="w-4 h-4" />
                  ) : (
                    String.fromCharCode(65 + idx)
                  )}
                </span>
                <span className="font-semibold text-foreground">{answer}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Banner */}
      {isAnswered && (
        <div
          className={cn(
            "rounded-2xl p-4 mb-6 flex items-center gap-3 animate-scale-in",
            answerState === "correct"
              ? "bg-teal-light/40 border border-teal"
              : "bg-destructive/10 border border-destructive",
          )}
        >
          {answerState === "correct" ? (
            <>
              <CheckCircle2 className="w-6 h-6 text-teal flex-shrink-0" />
              <div>
                <p className="font-bold text-teal">Correct! 🎉</p>
                <p className="text-sm text-muted-foreground">
                  Great job! Keep it up.
                </p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
              <div>
                <p className="font-bold text-destructive">Not quite right</p>
                <p className="text-sm text-muted-foreground">
                  The correct answer was:{" "}
                  <span className="font-semibold text-foreground">
                    {currentQuestion.answers[currentQuestion.correctIndex]}
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Next Button */}
      {isAnswered && (
        <Button
          data-ocid="quiz.primary_button"
          size="lg"
          onClick={handleNext}
          className="w-full text-white font-bold text-base py-6 rounded-2xl shadow-glow-indigo hover:scale-[1.02] transition-all duration-200 border-0 h-auto animate-fade-in"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.42 0.22 265), oklch(0.52 0.24 285))",
          }}
        >
          {isLastQuestion ? (
            <>
              See Results
              <BookOpen className="w-5 h-5 ml-2" />
            </>
          ) : (
            <>
              Next Question
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}
