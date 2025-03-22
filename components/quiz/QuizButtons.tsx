import { useState } from "react";
import { View, Animated } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import AnswerButton from "./AnswerButton";
import { QuizQuestion } from "~/interfaces/quiz-question.interface";
interface QuizButtonsProps {
  currentQuestion: QuizQuestion;
  selectedAnswerIndex: number | null;
  setSelectedAnswerIndex: (index: number | null) => void;
  onSubmit: (index: number | null) => void;
}
const QuizButtons = ({
  currentQuestion,
  onSubmit,
  selectedAnswerIndex,
  setSelectedAnswerIndex,
}: QuizButtonsProps) => {
  const handleSubmit = () => {
    onSubmit(selectedAnswerIndex);
    setSelectedAnswerIndex(null);
  };

  return (
    <View className="flex-1 flex-col gap-3">
      {currentQuestion?.answers?.map((answer, index) => (
        <AnswerButton
          key={index}
          index={index}
          text={answer}
          isSelected={selectedAnswerIndex === index}
          setSelectedAnswer={setSelectedAnswerIndex}
        />
      ))}

      <View className="mt-2">
        <Button onPress={handleSubmit}>
          <Text>Valider ma réponse </Text>
        </Button>
      </View>
    </View>
  );
};

export default QuizButtons;
