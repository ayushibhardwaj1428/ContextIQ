"use client";

import { useState } from "react";

import { Box, TextField, IconButton } from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import { useChatStore } from "../../store/chatStore";
import CircularProgress from "@mui/material/CircularProgress";

export default function ChatInput() {
  const [value, setValue] = useState("");

  const sendMessage = useChatStore((state) => state.sendMessage);

  const isLoading = useChatStore((state) => state.isLoading);

  const handleSend = async () => {
    if (!value.trim()) return;

    await sendMessage(value);

    setValue("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        mt: 2,
      }}
    >
      <TextField
        fullWidth
        disabled={isLoading}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={isLoading ? "AI is processing..." : "Ask something..."}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isLoading) {
            handleSend();
          }
        }}
      />

      <IconButton color="primary" onClick={handleSend} disabled={isLoading}>
        {isLoading ? <CircularProgress size={20} /> : <SendIcon />}
      </IconButton>
    </Box>
  );
}
