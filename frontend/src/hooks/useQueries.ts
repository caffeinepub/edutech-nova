import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Question, Motivation } from '../backend';

// ─── Questions ───────────────────────────────────────────────────────────────

export function useGetAllQuestions() {
  const { actor, isFetching } = useActor();

  return useQuery<Question[]>({
    queryKey: ['questions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllQuestions();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useIsAnswerCorrect() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      questionID,
      submittedAnswerIndex,
    }: {
      questionID: bigint;
      submittedAnswerIndex: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.isAnswerCorrect(questionID, submittedAnswerIndex);
    },
  });
}

// ─── Motivations ─────────────────────────────────────────────────────────────

export function useGetAllMotivations() {
  const { actor, isFetching } = useActor();

  return useQuery<Motivation[]>({
    queryKey: ['motivations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMotivations();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetRandomMotivation() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getRandomMotivation();
    },
  });
}

export function useAddMotivation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addMotivation(message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['motivations'] });
    },
  });
}

export function useAddQuestion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      text,
      answers,
      correctIndex,
    }: {
      text: string;
      answers: string[];
      correctIndex: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addQuestion(text, answers, correctIndex);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}
