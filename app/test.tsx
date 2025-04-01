import { SafeAreaView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { useGetQuestions } from "~/hooks/useQuery/useQuestions";
import { useState } from "react";
import { ProgressDialog } from "~/components/shared/ProgressDialog";
import ProgressLoadingTest from "~/components/shared/LevelProgressBar";
const Test = () => {
  const [showLevelProgress, setShowLevelProgress] = useState(false);

  const mockProgressData = {
    previousXP: 0,
    xpGained: 2000,
    previousLevel: 7,
    newLevel: 8,
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-primary/20 to-primary/5">
      <View className="flex-1">
        <Button
          className="flex-1 bg-background"
          onPress={() => setShowLevelProgress(true)}
        >
          <Text>Fetch</Text>
        </Button>
        {/* <ProgressDialog
          isOpen={showLevelProgress}
          onClose={() => setShowLevelProgress(false)}
          {...mockProgressData}
          // levelMap={levelMap}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default Test;
