import { useCallback, useState } from "react";
import { useGetRandomMotivation } from "./useQueries";

export function useMotivation() {
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const { mutateAsync, isPending, isError } = useGetRandomMotivation();

  const fetchNew = useCallback(async () => {
    try {
      let attempts = 0;
      let message: string;

      // Try to get a different message (up to 3 attempts)
      do {
        message = await mutateAsync();
        attempts++;
      } while (message === lastMessage && attempts < 3);

      setLastMessage(message);
      setCurrentMessage(message);
    } catch {
      // Error handled by isError state
    }
  }, [mutateAsync, lastMessage]);

  return {
    message: currentMessage,
    isLoading: isPending,
    isError,
    fetchNew,
    hasFetched: currentMessage !== null,
  };
}
