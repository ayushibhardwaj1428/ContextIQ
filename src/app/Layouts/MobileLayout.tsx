"use client";

import { useState } from "react";

import {
  Drawer,
  Box,
  Fab,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DescriptionIcon from "@mui/icons-material/Description";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import ConversationSidebar from "../components/ConversationSidebar/ConversationSidebar";
import ContextPanel from "../components/ContextPanel/ContextPanel";



export default function MobileLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [contextOpen, setContextOpen] =
    useState(false);

  return (
    <>
      <ChatWindow />

      <Fab
        sx={{
          position: "fixed",
          bottom: 80,
          left: 16,
        }}
        onClick={() =>
          setSidebarOpen(true)
        }
      >
        <MenuIcon />
      </Fab>

      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 80,
          right: 16,
        }}
        onClick={() =>
          setContextOpen(true)
        }
      >
        <DescriptionIcon />
      </Fab>

      <Drawer
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      >
        <Box sx={{width: 280}}>
          <ConversationSidebar />
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={contextOpen}
        onClose={() =>
          setContextOpen(false)
        }
      >
        <Box sx={{width: 320}}>
          <ContextPanel />
        </Box>
      </Drawer>
    </>
  );
}