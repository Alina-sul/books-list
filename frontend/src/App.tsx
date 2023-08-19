import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// Pages
import Dashboard from "./pages/Dashboard";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Dashboard />
      </div>
    </QueryClientProvider>
  );
}

export default App;
