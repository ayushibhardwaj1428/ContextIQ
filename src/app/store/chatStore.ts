import { create } from "zustand";
import { AgentStatus, ChatStore } from "../types/chat";

export const useChatStore = create<ChatStore>((set) => {
  const updateAgentStatus = (index: number, status: AgentStatus) => {
    set((state) => ({
      agents: state.agents.map((agent, i) =>
        i === index
          ? {
              ...agent,
              status,
            }
          : agent,
      ),
    }));
  };

  const runAgent = async (index: number) => {
    updateAgentStatus(index, "running");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    updateAgentStatus(index, "completed");
  };

  return {
    isLoading: false,

    messages: [],

    agents: [
      {
        name: "Intent Agent",
        status: "idle",
      },
      {
        name: "Memory Agent",
        status: "idle",
      },
      {
        name: "Retrieval Agent",
        status: "idle",
      },
      {
        name: "Response Agent",
        status: "idle",
      },
    ],
    summary: "",

    sendMessage: async (content: string) => {
      const userMessageId = crypto.randomUUID();

      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: userMessageId,
            role: "user",
            content,
          },
        ],

        agents: state.agents.map((agent) => ({
          ...agent,
          status: "idle",
        })),

        isLoading: true,
      }));

      try {
        await runAgent(0);
        await runAgent(1);
        await runAgent(2);

        updateAgentStatus(3, "running");

        const context = sessionStorage.getItem("context-content") ?? "";

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: content,
            context,
          }),
        });

        const data = await response.json();

        updateAgentStatus(3, "completed");

        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content: data.answer ?? "No response generated.",
            },
          ],

          isLoading: false,
        }));
      } catch (error) {
        console.error(error);

        updateAgentStatus(3, "completed");

        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content: "Failed to generate response.",
            },
          ],

          isLoading: false,
        }));
      }
    },
    clearChat: () =>
      set((state) => ({
        messages: [],

        agents: state.agents.map((agent) => ({
          ...agent,
          status: "idle",
        })),
        summary: "",
      })),

    setSummary: (summary) =>
      set({
        summary,
      }),
  };
});
