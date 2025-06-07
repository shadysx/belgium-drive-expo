import { View } from "react-native";
import { Text } from "~/components/ui/text";

interface QuizErrorStateProps {
  error: Error | null;
}

export default function QuizErrorState({ error }: QuizErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-destructive text-center">
        {error instanceof Error ? error.message : "Something went wrong"}
      </Text>
    </View>
  );
}
