import { Card, CardContent } from "~/components/ui/card";
import { Pressable } from "react-native";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

interface CardButtonProps {
  icon: React.ReactNode;
  text: string;
  cn?: string;
  onPress: () => void;
}

export default function CardButton(props: CardButtonProps) {
  const { icon, text, cn, onPress } = props;
  return (
    <Pressable className="flex-1" onPress={onPress}>
      <Card className={`flex-1 ${cn}`}>
        <CardContent className="p-4 items-center">
          {icon}
          <Text
            className={`mt-2 font-medium ${cn}`}
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
