import { SafeAreaView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { useGetQuestions } from "~/hooks/useQuery/useQuestions";
import { useState } from "react";
import { LevelUpDialog } from "~/components/shared/LevelUpDialog";
import ProgressLoadingTest from "~/components/shared/AnimatedProgressBar";
const Test = () => {
  const [showLevelProgress, setShowLevelProgress] = useState(false);

  const mockProgressData = {
    previousXP: 0,
    newXP: 1500,
    previousLevel: 7,
    newLevel: 8,
    xpRequiredForNextLevel: 1200,
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-primary/20 to-primary/5">
      <View className="border border-red-500 border-solid flex-1">
        <Button
          className="flex-1 bg-red-500"
          onPress={() => setShowLevelProgress(true)}
        >
          <Text>Fetch</Text>
        </Button>
        <LevelUpDialog
          isOpen={showLevelProgress}
          onClose={() => setShowLevelProgress(false)}
          {...mockProgressData}
        />
      </View>
    </SafeAreaView>
  );
};

export default Test;
