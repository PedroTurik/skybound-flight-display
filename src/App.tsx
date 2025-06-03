
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FIDS from "./pages/FIDS";
import FlightDetails from "./pages/FlightDetails";
import CustomerRegistration from "./pages/CustomerRegistration";
import OperatorRegistration from "./pages/OperatorRegistration";
import BoardingPass from "./pages/BoardingPass";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fids" element={<FIDS />} />
          <Route path="/flight/:flightCode" element={<FlightDetails />} />
          <Route path="/register" element={<CustomerRegistration />} />
          <Route path="/operator/register" element={<OperatorRegistration />} />
          <Route path="/boarding/:flightCode" element={<BoardingPass />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
