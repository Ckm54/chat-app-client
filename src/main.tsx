import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ChatPage from "./pages/Chat.tsx";
import SocketComponent from "./components/SocketComponent.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SocketComponent>
      <RouterProvider router={router} />
    </SocketComponent>
  </React.StrictMode>
);
