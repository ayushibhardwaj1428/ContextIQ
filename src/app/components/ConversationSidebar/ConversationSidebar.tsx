"use client";

import { Box, Typography, Paper, Divider, Chip } from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useContextStore } from "../../store/contextStore";

export default function ConversationSidebar() {
  const fileName = useContextStore((state) => state.fileName);

  return (
    <Paper
      sx={{
        height: "100vh",
        p: 2,
        borderRadius: 0,
      }}
    >
      <Typography variant="h5" gutterBottom>
        ContextIQ
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Context-Aware AI Assistant
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        Current Workspace
      </Typography>

      <Box
        sx={{
          mt: 2,
          p: 2,
          borderRadius: 2,
          bgcolor: "#f5f5f5",
        }}
      >
        <DescriptionIcon fontSize="small" sx={{ mb: 1 }} />

        <Typography>{fileName ?? "No Context Loaded"}</Typography>

        <Typography variant="body2" color="text.secondary">
          {fileName ? "Ready for Q&A" : "Upload a TXT file"}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        Features
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Chip
          icon={<AutoAwesomeIcon sx={{ color: "#000" }} />}
          label="Context Chat"
          sx={{
            mb: 1,
            "& .MuiChip-icon": {
              color: "#DFB722", 
            },
            background: "#fff",
            border: "1px solid #877f7fff",

          }}
        />
      </Box>

      <Box>
        <Chip
          icon={<AutoAwesomeIcon />}
          label="Grounded Responses"
          sx={{
            mb: 1,
            "& .MuiChip-icon": {
              color: "#DFB722", 
            },
            background: "#fff",
            border: "1px solid #877f7fff",

          }}
        />
      </Box>

      <Box>
        <Chip icon={<AutoAwesomeIcon />} label="AI Pipeline"  sx={{
            mb: 1,
            "& .MuiChip-icon": {
              color: "#DFB722", 
            },
            background: "#fff",
            border: "1px solid #877f7fff",

          }} />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        Demo Flow
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        1. Upload TXT
      </Typography>

      <Typography variant="body2" color="text.secondary">
        2. Ask Questions
      </Typography>

      <Typography variant="body2" color="text.secondary">
        3. AI Retrieves Context
      </Typography>

      <Typography variant="body2" color="text.secondary">
        4. Get Your Answer!
      </Typography>
    </Paper>
  );
}
