import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { View } from "react-native";

interface AnswerButtonProps {
  index: number;
  text: string;
  isSelected: boolean;
  setSelectedAnswerIndex?: (index: number) => void;
  isReadOnly?: boolean;
}

const AnswerButton = ({
  index,
  text,
  isSelected,
  setSelectedAnswerIndex,
  isReadOnly,
}: AnswerButtonProps) => {
  // Correct answer is always the first answer in read mode
  const isGreen = isReadOnly && index === 0;
  const isRed = isReadOnly && isSelected && index !== 0;
  return (
    <View className="flex-1">
      <Button
        onPress={() => {
          setSelectedAnswerIndex?.(index);
        }}
        className={`
          justify-center flex-1
          ${
            isSelected
              ? "bg-primary border-primary"
              : "bg-primary/5 border-primary/20"
          }
          ${isGreen ? "bg-green-500" : isRed ? "bg-red-500" : ""}
        `}
      >
        <Text
          numberOfLines={2}
          className={`
            font-medium text-center
            ${
              isSelected || isGreen || isRed ? "" : "text-black dark:text-white"
            }
          `}
        >
          {text}
        </Text>
      </Button>
    </View>
  );
};

export default AnswerButton;
