"use client";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import ConversationSidebar from "./components/ConversationSidebar/ConversationSidebar";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import ContextPanel from "./components/ContextPanel/ContextPanel";
import MobileLayout from "./Layouts/MobileLayout";


export default function Home() {

  const theme = useTheme();

const isMobile =
  useMediaQuery(
    theme.breakpoints.down("md")
  );
  if (!isMobile) {
  return (
    <Grid container>
      <Grid size={2.5}>
        <ConversationSidebar />
      </Grid>

      <Grid size={6}>
        <ChatWindow />
      </Grid>

      <Grid size={3.5}>
        <ContextPanel />
      </Grid>
    </Grid>
  );
}
  return <MobileLayout />;
}