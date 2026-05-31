export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface ChatStore {
  messages: Message[];
  agents: Agent[];
  isLoading: boolean;
  sendMessage: (
    content: string
  ) => Promise<void>;
  clearChat: () => void;
}

export type AgentStatus =
  | "idle"
  | "running"
  | "completed";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface Agent {
  name: string;
  status: AgentStatus;
}