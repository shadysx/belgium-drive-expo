import { Platform } from "react-native";

export const NAV_THEME = {
  light: {
    background: "hsl(0 0% 100%)", // background
    border: "hsl(240 5.9% 90%)", // border
    card: "hsl(0 0% 100%)", // card
    notification: "hsl(0 84.2% 60.2%)", // destructive
    primary: "hsl(240 5.9% 10%)", // primary
    text: "hsl(240 10% 3.9%)", // foreground
  },
  dark: {
    background: "hsl(240 10% 3.9%)", // background
    border: "hsl(240 3.7% 15.9%)", // border
    card: "hsl(240 10% 3.9%)", // card
    notification: "hsl(0 72% 51%)", // destructive
    primary: "hsl(0 0% 98%)", // primary
    text: "hsl(0 0% 98%)", // foreground
  },
};

export const SERVER_BASE_URL = Platform.select({
  ios: "http://localhost:3001", // Dev
  // ios: "http://192.168.0.100:80", // Test
  // ios: "http://213.213.230.92:80", // Prod
  // ios: "https://belgiumdrive.com", // Prod
  // android: "http://10.0.2.2:3000",
  // android: "http://192.168.0.100:80",
  // android: "http://belgiumdrive.com",
});

export const NOTIFICATION_DELAY = 5000;

export const QUESTION_COUNTS_OPTIONS = [
  { label: "10 questions", value: "10" },
  { label: "20 questions", value: "20" },
  { label: "30 questions", value: "30" },
  { label: "40 questions", value: "40" },
  { label: "50 questions", value: "50" },
  { label: "60 questions", value: "60" },
  { label: "70 questions", value: "70" },
  { label: "80 questions", value: "80" },
];
