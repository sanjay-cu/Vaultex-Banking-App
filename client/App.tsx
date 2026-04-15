import React, { useEffect } from 'react';
import "./global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";
import Bills from "./pages/Bills";
import Cards from "./pages/Cards";
import Requests from "./pages/Requests";
import FixedDeposit from "./pages/FixedDeposit";
import Transactions from "./pages/Transactions";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import KYC from './pages/KYC';
import NotFound from "./pages/NotFound";

import { AccountProvider, useAccount } from "./context/AccountContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

const AppContent = () => {
  const { user, isLoading } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && user) {
      const needsInitialKYC = user.kycStatus === 'not_started' || !user.kycStatus;
      
      let needsRefreshKYC = false;
      if (user.kycStatus === 'completed' && user.kycLastCompletedAt) {
        const lastDate = new Date(user.kycLastCompletedAt);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays >= 30) {
          needsRefreshKYC = true;
        }
      }

      if (needsInitialKYC || needsRefreshKYC) {
        if (location.pathname !== '/kyc' && location.pathname !== '/login' && location.pathname !== '/' && location.pathname !== '/register') {
          navigate('/kyc');
        }
      }
    }
  }, [user, isLoading, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/kyc" element={<KYC />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/bills" element={<Bills />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/fixed-deposit" element={<FixedDeposit />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/support" element={<Support />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <AccountProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AccountProvider>
    </LanguageProvider>
  </ThemeProvider>
);

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
