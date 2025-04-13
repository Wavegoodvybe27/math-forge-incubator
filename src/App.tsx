
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import EquationEditorPage from "./pages/EquationEditorPage";
import FunctionPlotterPage from "./pages/FunctionPlotterPage";
import NotesPage from "./pages/NotesPage";
import CalculatorPage from "./pages/CalculatorPage";
import DocumentationPage from "./pages/DocumentationPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/equation-editor" element={<MainLayout><EquationEditorPage /></MainLayout>} />
          <Route path="/function-plotter" element={<MainLayout><FunctionPlotterPage /></MainLayout>} />
          <Route path="/notes" element={<MainLayout><NotesPage /></MainLayout>} />
          <Route path="/calculator" element={<MainLayout><CalculatorPage /></MainLayout>} />
          <Route path="/documentation" element={<MainLayout><DocumentationPage /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><SettingsPage /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
