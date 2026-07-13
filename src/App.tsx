import { Toolbar } from "./components/Toolbar";
import { Sidebar } from "./components/Sidebar";
import { Viewport } from "./components/Viewport";
import { MetricsPanel } from "./components/MetricsPanel";

export default function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Viewport />
      </div>
      <MetricsPanel />
    </div>
  );
}
