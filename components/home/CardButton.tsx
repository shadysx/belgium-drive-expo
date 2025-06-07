import { Card, CardContent } from "~/components/ui/card";
import { Pressable } from "react-native";
import { Text } from "~/components/ui/text";

interface CardButtonProps {
  icon: React.ReactNode;
  text: string;
  isContrasted?: boolean;
  onPress: () => void;
}

export default function CardButton(props: CardButtonProps) {
  const { icon, text, isContrasted, onPress } = props;
  return (
    <Pressable className="flex-1" onPress={onPress}>
      <Card
        className={`flex-1 ${isContrasted ? "bg-primary" : "bg-secondary"}`}
      >
        <CardContent className="p-4 items-center">
          {icon}
          <Text
            className={`mt-2 font-medium ${
              isContrasted ? "text-primary-foreground" : "text-muted-foreground"
            }`}
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
