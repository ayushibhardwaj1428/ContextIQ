"use client";

import { Button } from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useContextStore } from "../../store/contextStore";
import { useChatStore } from "../../store/chatStore";

export default function ContextUpload() {
  const setContext = useContextStore((state) => state.setContext);

  const clearChat = useChatStore((state) => state.clearChat);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const text = await file.text();

    sessionStorage.setItem("context-file-name", file.name);

    sessionStorage.setItem("context-content", text);
    clearChat();
    setContext(file.name, text);
  };

  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<UploadFileIcon />}
      fullWidth
      sx={{background:"#000" , textTransform:"capitalize"}}
    >
      Upload Context
      <input hidden type="file" accept=".txt,.md" onChange={handleUpload} />
    </Button>
  );
}
