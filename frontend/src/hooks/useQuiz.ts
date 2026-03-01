import { useState, useCallback } from 'react';
import type { Question } from '../backend';

export type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export interface QuizState {
  currentIndex: number;
  selectedAnswer: number | null;
  answerState: AnswerState;
  score: number;
  answers: Array<{ questionIndex: number; selectedIndex: number; correct: boolean }>;
  isFinished: boolean;
}

const initialState: QuizState = {
  currentIndex: 0,
  selectedAnswer: null,
  answerState: 'unanswered',
  score: 0,
  answers: [],
  isFinished: false,
};

export function useQuiz(questions: Question[]) {
  const [state, setState] = useState<QuizState>(initialState);

  const selectAnswer = useCallback(
    (answerIndex: number) => {
      if (state.answerState !== 'unanswered') return; // already answered
      if (questions.length === 0) return;

      const currentQuestion = questions[state.currentIndex];
      const isCorrect = BigInt(answerIndex) === currentQuestion.correctIndex;

      setState((prev) => ({
        ...prev,
        selectedAnswer: answerIndex,
        answerState: isCorrect ? 'correct' : 'incorrect',
        score: isCorrect ? prev.score + 1 : prev.score,
        answers: [
          ...prev.answers,
          {
            questionIndex: prev.currentIndex,
            selectedIndex: answerIndex,
            correct: isCorrect,
          },
        ],
      }));
    },
    [state.answerState, state.currentIndex, questions]
  );

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1;
      if (nextIndex >= questions.length) {
        return { ...prev, isFinished: true };
      }
      return {
        ...prev,
        currentIndex: nextIndex,
        selectedAnswer: null,
        answerState: 'unanswered',
      };
    });
  }, [questions.length]);

  const restart = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    selectAnswer,
    nextQuestion,
    restart,
    totalQuestions: questions.length,
  };
}
