import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import KanbanBoard from "./KanbanBoard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <KanbanBoard />
    </QueryClientProvider>
  );
};

export default App;
