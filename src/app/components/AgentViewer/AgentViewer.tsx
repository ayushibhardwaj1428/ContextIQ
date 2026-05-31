"use client";

import {
  Box,
  Chip,
  Typography,
} from "@mui/material";
import { useChatStore } from "../../store/chatStore";

export default function AgentViewer() {
  const agents = useChatStore(
    (state) => state.agents
  );

  return (
    <Box sx={{mt: 3}}>
      <Typography
        variant="subtitle1"
      
        sx={{fontWeight: 600, mb: 2}}
      >
        AI Pipeline
      </Typography>

      {agents.map((agent) => (
        <Box
          key={agent.name}
          sx={{
            mb: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            {agent.name}
          </Typography>

          <Chip
            size="small"
            label={agent.status}
            color={
              agent.status === "completed"
                ? "success"
                : agent.status === "running"
                ? "warning"
                : "default"
            }
          />
        </Box>
      ))}
    </Box>
  );
}