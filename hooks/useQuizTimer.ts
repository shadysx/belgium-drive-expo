import React, { useState, useEffect } from "react";

interface UseQuizTimerProps {
  initialTime: number;
  onTimeUp: () => void;
}

export const useQuizTimer = (props: UseQuizTimerProps) => {
  const { initialTime, onTimeUp } = props;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      onTimeUp();
    }
  }, [timeLeft]);

  const resetTimer = () => setTimeLeft(initialTime);

  return { timeLeft, resetTimer };
};
