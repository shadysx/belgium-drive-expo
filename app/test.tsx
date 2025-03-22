import { SafeAreaView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { useGetQuestions } from "~/hooks/useQuery/useQuestions";
const Test = () => {
  const { data, isLoading, isError } = useGetQuestions();
  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-primary/20 to-primary/5">
      <View className="border border-red-500 border-solid flex-1">
        <View className="border border-blue-500 border-solid flex-1">
          <Text>Bonjour</Text>
        </View>
        <View className="border border-green-500 border-solid flex-1 gap-2">
          <Button className="flex-1 bg-blue-500">
            <Text>Bonjour</Text>
          </Button>
          <Button className="flex-1 bg-red-500" onPress={async () => {}}>
            <Text>Fetch</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Test;
