import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, XCircle, ChevronRight, BookOpen, AlertCircle } from 'lucide-react';
import { useGetAllQuestions } from '@/hooks/useQueries';
import { useQuiz } from '@/hooks/useQuiz';
import { cn } from '@/lib/utils';

export default function Quiz() {
  const navigate = useNavigate();
  const { data: questions = [], isLoading, isError } = useGetAllQuestions();
  const quiz = useQuiz(questions);

  // Navigate to results when quiz is finished
  useEffect(() => {
    if (quiz.isFinished) {
      navigate({
        to: '/quiz/results',
        search: { score: quiz.score, total: quiz.totalQuestions },
      });
    }
  }, [quiz.isFinished, quiz.score, quiz.totalQuestions, navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h2 className="font-display font-bold text-2xl mb-2">Failed to load quiz</h2>
        <p className="text-muted-foreground mb-6">Please try again later.</p>
        <Button onClick={() => navigate({ to: '/' })}>Go Home</Button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <div className="bg-card rounded-3xl p-12 border border-border shadow-card">
          <img
            src="/assets/generated/quiz-icon.dim_128x128.png"
            alt="Quiz"
            className="w-20 h-20 mx-auto mb-6 opacity-60"
          />
          <h2 className="font-display font-bold text-2xl mb-3">No Questions Yet</h2>
          <p className="text-muted-foreground mb-6">
            The quiz hasn't been set up yet. Check back soon!
          </p>
          <Button onClick={() => navigate({ to: '/' })} variant="outline">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[quiz.currentIndex];
  const progressPercent = ((quiz.currentIndex) / quiz.totalQuestions) * 100;
  const isAnswered = quiz.answerState !== 'unanswered';
  const isLastQuestion = quiz.currentIndex === quiz.totalQuestions - 1;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-amber flex items-center justify-center shadow-glow">
            <img
              src="/assets/generated/quiz-icon.dim_128x128.png"
              alt="Quiz"
              className="w-6 h-6 object-contain"
            />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">Quiz Time</h1>
            <p className="text-xs text-muted-foreground">
              Question {quiz.currentIndex + 1} of {quiz.totalQuestions}
            </p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="text-sm font-bold px-3 py-1 bg-amber-light text-amber-foreground border-0"
        >
          Score: {quiz.score}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress
          value={progressPercent}
          className="h-2.5 rounded-full bg-muted"
        />
        <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
          <span>{quiz.currentIndex} done</span>
          <span>{quiz.totalQuestions - quiz.currentIndex} remaining</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-card mb-6 animate-fade-in">
        <div className="flex items-start gap-3 mb-6">
          <span className="flex-shrink-0 w-8 h-8 rounded-full gradient-amber flex items-center justify-center text-white text-sm font-bold shadow-glow">
            {quiz.currentIndex + 1}
          </span>
          <h2 className="font-display font-bold text-xl md:text-2xl text-foreground leading-snug">
            {currentQuestion.text}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.answers.map((answer, idx) => {
            const isSelected = quiz.selectedAnswer === idx;
            const correctIdx = Number(currentQuestion.correctIndex);
            const isCorrectAnswer = idx === correctIdx;

            let optionClass = 'answer-option border-border bg-background';

            if (isAnswered) {
              if (isCorrectAnswer) {
                optionClass = 'answer-option correct border-teal bg-teal-light/30';
              } else if (isSelected && !isCorrectAnswer) {
                optionClass = 'answer-option incorrect border-destructive bg-destructive/10';
              } else {
                optionClass = 'answer-option border-border bg-background opacity-60';
              }
            } else if (isSelected) {
              optionClass = 'answer-option selected border-amber bg-amber-light/30';
            }

            return (
              <button
                key={idx}
                className={cn('w-full text-left flex items-center gap-3', optionClass)}
                onClick={() => quiz.selectAnswer(idx)}
                disabled={isAnswered}
              >
                <span className={cn(
                  'flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors',
                  isAnswered && isCorrectAnswer
                    ? 'border-teal bg-teal text-white'
                    : isAnswered && isSelected && !isCorrectAnswer
                    ? 'border-destructive bg-destructive text-white'
                    : 'border-muted-foreground text-muted-foreground'
                )}>
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
        <div className={cn(
          'rounded-2xl p-4 mb-6 flex items-center gap-3 animate-scale-in',
          quiz.answerState === 'correct'
            ? 'bg-teal-light/40 border border-teal'
            : 'bg-destructive/10 border border-destructive'
        )}>
          {quiz.answerState === 'correct' ? (
            <>
              <CheckCircle2 className="w-6 h-6 text-teal flex-shrink-0" />
              <div>
                <p className="font-bold text-teal">Correct! 🎉</p>
                <p className="text-sm text-muted-foreground">Great job! Keep it up.</p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
              <div>
                <p className="font-bold text-destructive">Not quite right</p>
                <p className="text-sm text-muted-foreground">
                  The correct answer was:{' '}
                  <span className="font-semibold text-foreground">
                    {currentQuestion.answers[Number(currentQuestion.correctIndex)]}
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
          size="lg"
          onClick={quiz.nextQuestion}
          className="w-full gradient-amber text-white font-bold text-base py-6 rounded-2xl shadow-glow hover:scale-[1.02] transition-all duration-200 border-0 h-auto animate-fade-in"
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
