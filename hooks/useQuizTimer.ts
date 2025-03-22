import React, { useState, useEffect } from "react";

export const useQuizTimer = (initialTime: number, onTimeUp: () => void) => {
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
