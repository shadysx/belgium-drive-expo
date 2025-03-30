export const getRankStyles = (rank: number) => {
  switch (rank) {
    case 1:
      return {
        numberBg: "bg-slate-700 border-yellow-400/50",
        nameBg: "border-yellow-400/50",
        textColor: "text-yellow-400",
      };
    case 2:
      return {
        numberBg: "bg-slate-700 border-blue-400/30",
        nameBg: "border-blue-400/30",
        textColor: "text-blue-400",
      };
    case 3:
      return {
        numberBg: "bg-slate-700 border-orange-400/30",
        nameBg: "border-orange-400/30",
        textColor: "text-orange-400",
      };
    default:
      return {
        numberBg: "bg-slate-700 border-slate-600",
        nameBg: "border-slate-600",
        textColor: "text-slate-700 dark:text-white",
      };
  }
};
