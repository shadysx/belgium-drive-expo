import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { View } from "react-native";

interface AnswerButtonProps {
  index: number;
  text: string;
  isSelected: boolean;
  setSelectedAnswer: (index: number) => void;
}

const AnswerButton = ({
  index,
  text,
  isSelected,
  setSelectedAnswer,
}: AnswerButtonProps) => {
  return (
    <View className="px-1 flex-1">
      <Button
        onPress={() => setSelectedAnswer(index)}
        className={`
          justify-center flex-1
          ${
            isSelected
              ? "bg-primary border-primary text-white"
              : "bg-primary/5 border-primary/20"
          }
        `}
      >
        <Text
          className={`
            text-base font-medium text-center
            ${isSelected ? "text-white" : "text-primary"}
          `}
        >
          {text}
        </Text>
      </Button>
    </View>
  );
};

export default AnswerButton;
