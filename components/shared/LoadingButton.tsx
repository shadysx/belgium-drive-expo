import { Loader2 } from "lucide-react-native";
import { ActivityIndicator } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function LoadingButton({
  text,
  isLoading,
  onPress,
}: {
  text: string;
  isLoading: boolean;
  onPress: () => void;
}) {
  return (
    <Button onPress={onPress} disabled={isLoading} className="w-full">
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text>{text}</Text>
      )}
    </Button>
  );
}
