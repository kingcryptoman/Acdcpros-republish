/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import OnlineConsulting from "./pages/OnlineConsulting";
import VideoSession from "./pages/VideoSession";
import Estimator from "./pages/Estimator";
import Shop from "./pages/Shop";
import Services from "./pages/Services";
import Pros from "./pages/Pros";
import Invest from "./pages/Invest";
import Emergency from "./pages/Emergency";
import Tutorials from "./pages/Tutorials";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-black">
          <Navigation />
          
          <main>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/online-consulting" element={<OnlineConsulting />} />
                <Route path="/video-session" element={<VideoSession />} />
                <Route path="/estimator" element={<Estimator />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/services" element={<Services />} />
                <Route path="/pros" element={<Pros />} />
                <Route path="/invest" element={<Invest />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/admin" element={<AdminDashboard />} />
                {/* Fallback to Home for now for other routes */}
                <Route path="*" element={<Home />} />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
