import "expo-dev-client";

import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.BANNER : "Your_add_Id";

// Create a rewarded ad instance
const rewardedAdUnitId = __DEV__ ? TestIds.REWARDED : "Your_rewarded_ad_id";
const rewarded = RewardedAd.createForAdRequest(rewardedAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export function RewardedAdButton({ onReward, title = "Watch Ad for Reward" }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
        onReward?.(reward);
      }
    );

    // Start loading the rewarded ad
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, [onReward]);

  return (
    <Button
      title={title}
      disabled={!loaded}
      onPress={() => {
        if (loaded) {
          rewarded.show();
          setLoaded(false); // Reset loaded state after showing
        }
      }}
    />
  );
}

export function BannerAdComponent() {
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}
