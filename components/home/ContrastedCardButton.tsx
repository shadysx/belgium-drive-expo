import { Card, CardContent } from "~/components/ui/card";
import { Pressable } from "react-native";
import { Car } from "lucide-react-native";
import { Text } from "~/components/ui/text";

interface ContrastedCardButtonProps {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
}

export default function ContrastedCardButton(props: ContrastedCardButtonProps) {
  const { icon, text, onPress } = props;
  return (
    <Pressable className="flex-1" onPress={onPress}>
      <Card className="flex-1 bg-primary">
        <CardContent className="p-4 items-center">
          {icon}
          <Text
            className="text-primary-foreground mt-2 font-medium"
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {text}
          </Text>
        </CardContent>
      </Card>
    </Pressable>
  );
}
