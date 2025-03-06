export const URGENCY = {
  NON_URGENT: 1,
  LESS_URGENT: 2,
  URGENT: 3,
  EMERGENCY: 4,
};

export const URGENCY_STATUS: { [key: number]: string } = {
  [URGENCY.NON_URGENT]: "😊 Non Urgent",
  [URGENCY.LESS_URGENT]: "🔨 Less Urgent",
  [URGENCY.URGENT]: "⚡ Urgent",
  [URGENCY.EMERGENCY]: "🔥 Emergency",
};
