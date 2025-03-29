import { View, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { QuizQuestion } from "~/interfaces/quiz-question.interface";
import QuizButtons from "./QuizButtons";
import React from "react";
import { AspectRatio } from "~/components/ui/aspect-ratio";

interface QuizViewerProps {
  question: QuizQuestion;
  selectedAnswerIndex: number | null;
  handleAnswer?: () => void;
  setSelectedAnswerIndex?: (index: number | null) => void;
  isReadOnly?: boolean;
}

export default function QuizViewer({
  question,
  selectedAnswerIndex,
  handleAnswer,
  setSelectedAnswerIndex,
  isReadOnly = false,
}: QuizViewerProps) {
  return (
    <Animated.View entering={FadeInDown.delay(200)} className="flex-1">
      <Card>
        {question?.imageUrl && (
          <AspectRatio ratio={1.4}>
            <Image
              source={{ uri: question.imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </AspectRatio>
        )}
        <CardContent className="p-4">
          <Text className="font-medium">{question?.text}</Text>
        </CardContent>
      </Card>

      <View className="mt-4 flex-1">
        {question && (
          <QuizButtons
            isReadOnly={isReadOnly}
            question={question}
            selectedAnswerIndex={selectedAnswerIndex}
            setSelectedAnswerIndex={setSelectedAnswerIndex}
            onSubmit={handleAnswer}
          />
        )}
      </View>
    </Animated.View>
  );
}
