import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";

interface StatsCardProps {
  text: string;
  value: string;
  icon: React.ReactNode;
}

export default function StatsCard(props: StatsCardProps) {
  const { text, value, icon } = props;

  return (
    <Card className="flex-1">
      <CardContent className="p-4">
        {icon}
        <Text className="text-2xl font-bold mt-2">{value}</Text>
        <Text
          className="text-muted-foreground text-sm"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {text}
        </Text>
      </CardContent>
    </Card>
  );
}
