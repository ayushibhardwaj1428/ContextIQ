"use client";

import { Button } from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useContextStore } from "../../store/contextStore";
import { useChatStore } from "../../store/chatStore";

interface IContextUploadProps {
  uploadBtnName?: string;
}

export default function ContextUpload({ uploadBtnName }: IContextUploadProps) {
  const setContext = useContextStore((state) => state.setContext);

  const setSummary = useChatStore((state) => state.setSummary);

  const clearChat = useChatStore((state) => state.clearChat);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const text = await file.text();

    sessionStorage.setItem("context-file-name", file.name);

    sessionStorage.setItem("context-content", text);
    clearChat();
    setContext(file.name, text);
    const response =
  await fetch(
    "/api/summary",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        context: text,
      }),
    }
  );

const data =
  await response.json();

setSummary(
  data.summary
);
  };

  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<UploadFileIcon />}
      fullWidth
      sx={{ background: "#000", textTransform: "capitalize" }}
    >
      {uploadBtnName ? uploadBtnName : "Upload Context"}
      <input hidden type="file" accept=".txt,.md" onChange={handleUpload} />
    </Button>
  );
}
