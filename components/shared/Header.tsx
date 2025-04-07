import { router } from "expo-router";
import { ChevronLeft } from "~/lib/icons";
import { Pressable, View } from "react-native";
import { Text } from "../ui/text";

interface HeaderProps {
  title: string;
  button?: React.ReactNode;
}

export const Header = (props: HeaderProps) => {
  const { title, button } = props;

  return (
    <View className="px-4 py-4 flex-row items-center justify-between">
      <Pressable
        onPress={() => router.back()}
        className="w-10 h-10 items-center justify-center rounded-full active:opacity-70"
      >
        <ChevronLeft size={24} className="text-primary" />
      </Pressable>
      <View className="flex-1 items-center">
        <Text className="text-xl font-semibold">{title}</Text>
      </View>
      <View className="w-10 h-10">{button}</View>
    </View>
  );
};
