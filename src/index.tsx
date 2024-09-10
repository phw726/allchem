/** @jsxImportSource @emotion/react */

import React from "react";
import ReactDOM from "react-dom/client";
import { Global } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import globalStyles from "@/styles/globalStyles";

// react-query 설정
const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
