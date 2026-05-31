"use client";

import { Box, Paper, Typography, Divider, Chip } from "@mui/material";

import ContextUpload from "../ContextUpload/ContextUpload";
import AgentViewer from "../AgentViewer/AgentViewer";
import { useContextStore } from "../../store/contextStore";

import Button from "@mui/material/Button";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { useChatStore } from "../../store/chatStore";

export default function ContextPanel() {
  const fileName = useContextStore((state) => state.fileName);

  const clearContext = useContextStore((state) => state.clearContext);

   const clearChat = useChatStore(
  (state) => state.clearChat
);

 const handleClearContext = () => {
  sessionStorage.removeItem(
    "context-file-name"
  );

  sessionStorage.removeItem(
    "context-content"
  );

  clearContext();

  clearChat();
};

 

  return (
    <Paper
      sx={{
        height: "100vh",
        p: 2,
        borderRadius: 0,
        overflowY: "auto",
      }}
    >
      <Typography variant="h5">Context Engine</Typography>

      <Divider sx={{ my: 2 }} />

      {/* Active Context */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
        }}
      >
        Active Context
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        {fileName ? "Replace Context" : "Upload Context"}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <ContextUpload />
      </Box>

      <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteOutlineOutlined />}
          fullWidth
          disabled={!fileName}
          onClick={handleClearContext}
          sx={{textTransform:"capitalize"}}
        >
          Clear Context
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Status */}
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Status
      </Typography>

      <Box sx={{ mt: 1 }}>
        <Chip
          size="small"
          color={fileName ? "success" : "default"}
          label={fileName ? "Ready" : "Waiting for Context"}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* AI Pipeline */}
      <AgentViewer />

      <Divider sx={{ my: 3 }} />

      {/* Context Insights */}
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Context Insights
      </Typography>

      {fileName ? (
        <Box sx={{ mt: 2 }}>
          <Typography>Document Loaded</Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {fileName}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography>Processing Mode</Typography>

            <Typography color="text.secondary">Context-Aware Q&A</Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography>Grounding</Typography>

            <Typography color="text.secondary">Enabled</Typography>
          </Box>
        </Box>
      ) : (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          Upload a TXT file to begin contextual conversations.
        </Typography>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Supported Files */}
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Supported Files
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Chip label=".txt" color="primary" size="small" sx={{ mr: 1, mb: 1, background:"#dedede", color:"#000" }} />

        <Chip label=".md" color="primary" size="small" sx={{ mb: 1, background:"#dedede", color:"#000" }} />
      </Box>

      <Typography sx={{ mt: 2 }} color="text.secondary" variant="body2">
        PDF and DOCX support coming soon.
      </Typography>
    </Paper>
  );
}
