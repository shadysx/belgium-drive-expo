import { View, ActivityIndicator } from "react-native";

export default function QuizLoadingState() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" className="text-primary" />
    </View>
  );
}
