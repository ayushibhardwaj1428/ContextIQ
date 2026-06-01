"use client";

import { Box, Paper, Typography } from "@mui/material";
import { useChatStore } from "../../store/chatStore";
import ChatInput from "../ChatInput/ChatInput";
import { useContextStore } from "../../store/contextStore";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";
import ContextUpload from "../ContextUpload/ContextUpload";

export default function ChatWindow() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const messages = useChatStore((state) => state.messages);

  const fileName = useContextStore((state) => state.fileName);
  const agents = useChatStore((state) => state.agents);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, agents]);

  return (
    <Paper
      sx={{
        height: "100vh",
        p: 2,
        borderRadius: 0,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Context-Aware Chat
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{mb:1.5}}>
        {fileName ? `Chatting with: ${fileName}` : "No context selected"}
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {messages.length === 0 && (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "text.secondary",
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {fileName
                ? "Context document uploaded successfully!"
                : "Upload a document and start chatting"}
            </Typography>
            {fileName ? null : (
              <Box sx={{ maxWidth: "300px", my: 1 }}>
                <ContextUpload uploadBtnName="Upload Document" />
              </Box>
            )}

            <Typography sx={{ mt: 1 }}>Example questions:</Typography>

            <Typography>• Summarize this document</Typography>

            <Typography>• What skills are mentioned?</Typography>

            <Typography>• What technologies are used?</Typography>
          </Box>
        )}
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: "flex",
              justifyContent:
                message.role === "user" ? "flex-end" : "flex-start",
              mb: 2,
            }}
          >
            <Box
              sx={{
                bgcolor: message.role === "user" ? "#1976d2" : "#f5f5f5",
                color: message.role === "user" ? "white" : "black",

                p: 2,
                borderRadius: 2,
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                maxWidth: {
                  xs: "90%",
                  md: "70%",
                },

                lineHeight: 1.7,
              }}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </Box>
          </Box>
        ))}
        <div ref={bottomRef} />
      </Box>

      <ChatInput />
    </Paper>
  );
}
