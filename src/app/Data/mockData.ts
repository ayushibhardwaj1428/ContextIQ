import { Message } from "../types/chat";

export const mockMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "I am 26 years old",
  },
  {
    id: "2",
    role: "assistant",
    content: "Got it. I'll remember that.",
  },
  {
    id: "3",
    role: "user",
    content: "Recommend health insurance",
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Based on your age and family coverage preference, Policy A would be a suitable option.",
  },
];