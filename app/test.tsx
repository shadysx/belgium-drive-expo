import { SafeAreaView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { useGetQuestions } from "~/hooks/useQuery/useQuestions";
import { useState } from "react";
import { LevelUpDialog } from "~/components/shared/LevelUpDialog";
import ProgressLoadingTest from "~/components/shared/LevelProgressBar";
const Test = () => {
  const [showLevelProgress, setShowLevelProgress] = useState(false);

  const mockProgressData = {
    previousXP: 0,
    newXP: 2000,
    previousLevel: 7,
    newLevel: 8,
  };
  const levelMap = {
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
    6: 600,
    7: 700,
    8: 800,
    9: 900,
    10: 1000,
    11: 1100,
    12: 1200,
    13: 1300,
    14: 1400,
    15: 1500,
    16: 1600,
    17: 1700,
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
          levelMap={levelMap}
        />
      </View>
    </SafeAreaView>
  );
};

export default Test;
