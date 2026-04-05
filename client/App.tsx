import "./global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

import { AccountProvider } from "./context/AccountContext";

const App = () => (
  <AccountProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
  </BrowserRouter>
  </AccountProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
