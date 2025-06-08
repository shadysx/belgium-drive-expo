import Animated, { FadeInDown } from "react-native-reanimated";
import CardButton from "./CardButton";
import React from "react";
import { HomeCard, homeCards } from "~/lib/data/home-cards";

export default function CardButtonGrid() {
  const cardRows: HomeCard[][] = [];
  for (let i = 0; i < homeCards.length; i += 2) {
    cardRows.push(homeCards.slice(i, i + 2));
  }

  return (
    <>
      {cardRows.map((row, rowIndex) => (
        <Animated.View
          key={rowIndex}
          entering={FadeInDown.delay(350 + rowIndex * 50)}
          className="flex-row gap-4"
        >
          {row.map((card, cardIndex) => (
            <CardButton
              key={`${rowIndex}-${cardIndex}`}
              cn={card.cn}
              icon={card.icon}
              text={card.text}
              onPress={card.onPress}
            />
          ))}
        </Animated.View>
      ))}
    </>
  );
}
