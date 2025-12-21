import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CreditProvider } from "@/contexts/CreditContext";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { usePageTracking } from "@/hooks/usePageTracking";
import { CreditGuard } from "@/components/guards/CreditGuard";
import Index from "./pages/Index";
import Grants from "./pages/Grants";
import GrantDetail from "./pages/GrantDetail";
import Opportunities from "./pages/Opportunities";
import OpportunityDetail from "./pages/OpportunityDetail";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Unlock from "./pages/Unlock";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  usePageTracking();
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/unlock" element={<Unlock />} />
      
      {/* Protected routes - require credits */}
      <Route path="/grants" element={<CreditGuard><Grants /></CreditGuard>} />
      <Route path="/grants/:id" element={<CreditGuard><GrantDetail /></CreditGuard>} />
      <Route path="/opportunities" element={<CreditGuard><Opportunities /></CreditGuard>} />
      <Route path="/opportunities/:id" element={<CreditGuard><OpportunityDetail /></CreditGuard>} />
      <Route path="/dashboard" element={<CreditGuard><Dashboard /></CreditGuard>} />
      <Route path="/onboarding" element={<CreditGuard><Onboarding /></CreditGuard>} />
      <Route path="/profile" element={<CreditGuard><Profile /></CreditGuard>} />
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletProvider>
      <AuthProvider>
        <CreditProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </CreditProvider>
      </AuthProvider>
    </WalletProvider>
  </QueryClientProvider>
);

export default App;
