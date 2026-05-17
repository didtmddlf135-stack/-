import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Hero } from "./components/sections/Hero";
import { WhySection } from "./components/sections/WhySection";
import { ServiceSection } from "./components/sections/ServiceSection";
import { ContactSection } from "./components/sections/ContactSection";
import { motion, AnimatePresence } from "motion/react";

import AdminPage from "./pages/Admin";

// Page Components
const Home = () => (
  <main>
    <Hero />
    <WhySection />
    <ServiceSection />
    <ContactSection />
  </main>
);

const CommercialCleaning = () => (
   <div className="py-24 container mx-auto px-4 min-h-[60vh]">
    <h1 className="text-4xl font-bold mb-8">상업공간 청소</h1>
    <p className="text-lg text-gray-600">준비 중인 서비스 페이지입니다.</p>
    <ContactSection />
  </div>
);

const RegularCleaning = () => (
  <div className="py-24 container mx-auto px-4 min-h-[60vh]">
    <h1 className="text-4xl font-bold mb-8">상업공간 정기청소</h1>
    <p className="text-lg text-gray-600">준비 중인 서비스 페이지입니다.</p>
    <ContactSection />
  </div>
);

const MoveInCleaning = () => (
  <div className="py-24 container mx-auto px-4 min-h-[60vh]">
    <h1 className="text-4xl font-bold mb-8">입주·이사청소</h1>
    <p className="text-lg text-gray-600">준비 중인 서비스 페이지입니다.</p>
    <ContactSection />
  </div>
);

const ApplianceCleaning = () => (
  <div className="py-24 container mx-auto px-4 min-h-[60vh]">
    <h1 className="text-4xl font-bold mb-8">가전(에어컨)청소</h1>
    <p className="text-lg text-gray-600">준비 중인 서비스 페이지입니다.</p>
    <ContactSection />
  </div>
);

const Portfolio = () => (
  <div className="py-24 container mx-auto px-4 min-h-[60vh]">
    <h1 className="text-4xl font-bold mb-8">포트폴리오</h1>
    <p className="text-lg text-gray-600">준비 중인 서비스 페이지입니다.</p>
  </div>
);

const About = () => (
  <div className="py-24 container mx-auto px-4 min-h-[60vh]">
    <h1 className="text-4xl font-bold mb-8">회사소개</h1>
    <p className="text-lg text-gray-600">김포 최고의 청소 전문업체, 미소클린 김포점입니다.</p>
  </div>
);

function PageLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <Header />
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageLayout><Home /></PageLayout>} />
              <Route path="/about" element={<PageLayout><About /></PageLayout>} />
              <Route path="/commercial-cleaning" element={<PageLayout><CommercialCleaning /></PageLayout>} />
              <Route path="/regular-cleaning" element={<PageLayout><RegularCleaning /></PageLayout>} />
              <Route path="/move-in-cleaning" element={<PageLayout><MoveInCleaning /></PageLayout>} />
              <Route path="/appliance-cleaning" element={<PageLayout><ApplianceCleaning /></PageLayout>} />
              <Route path="/portfolio" element={<PageLayout><Portfolio /></PageLayout>} />
              <Route path="/notice" element={<PageLayout><Portfolio /></PageLayout>} />
              <Route path="/contact" element={<PageLayout><div className="py-20"><ContactSection /></div></PageLayout>} />
              <Route path="/admin" element={<PageLayout><AdminPage /></PageLayout>} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
