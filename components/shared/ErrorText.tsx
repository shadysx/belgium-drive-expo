import { Text } from "~/components/ui/text";

interface ErrorTextProps {
  errorMessage: string;
}

export default function ErrorText({ errorMessage }: ErrorTextProps) {
  return <Text className="text-sm text-destructive mt-1">{errorMessage}</Text>;
}
