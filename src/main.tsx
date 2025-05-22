import { createRoot } from "react-dom/client";
import TanstackProvider from "./providers/Tanstack.provider.tsx";
import App from "./App.tsx";
import './css/main.css'


createRoot(document.getElementById("root")!).render(
  <TanstackProvider>
    <App />
  </TanstackProvider>
);
