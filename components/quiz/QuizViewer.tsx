import { View, Image, Pressable, Modal, ScrollView } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { QuizQuestion } from "~/interfaces/quiz-question.interface";
import QuizButtons from "./QuizButtons";
import React, { useState } from "react";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import { Info, X } from "lucide-react-native";
import { Header } from "~/components/shared/Header";
import { formatImageUrl } from "~/lib/utils";

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
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <Animated.View entering={FadeInDown.delay(200)} className="flex-1">
      {isReadOnly && (
        <Header
          title="Corrigé de la question"
          button={
            <Pressable
              onPress={() => setShowExplanation(true)}
              className="h-10 w-10 items-center justify-center rounded-full bg-primary/10"
            >
              <Info size={24} className="text-primary" />
            </Pressable>
          }
        />
      )}

      <Card>
        {question?.imageUrl && (
          <AspectRatio ratio={1.4}>
            <Image
              source={{ uri: formatImageUrl(question.imageUrl) }}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={showExplanation}
        onRequestClose={() => setShowExplanation(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-card rounded-t-xl p-4 h-1/3">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-card-foreground">
                Explication
              </Text>
              <Pressable
                onPress={() => setShowExplanation(false)}
                className="p-2"
              >
                <X size={24} className="text-muted-foreground" />
              </Pressable>
            </View>

            <ScrollView className="flex-1">
              <Text className="text-card-foreground">
                {question?.explanation.length > 0
                  ? question?.explanation
                  : "Aucune explication disponible pour cette question."}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}
