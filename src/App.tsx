import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Hero } from "./components/sections/Hero";
import { WhySection } from "./components/sections/WhySection";
import { ServiceSection } from "./components/sections/ServiceSection";
import { ContactSection } from "./components/sections/ContactSection";
import { motion, AnimatePresence } from "motion/react";
import { 
  db, 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  handleFirestoreError, 
  OperationType 
} from "./lib/firebase";

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
    <h1 className="text-4xl font-bold mb-8" translate="no">상업공간 청소</h1>
    <p className="text-lg text-gray-600">준비 중인 서비스 페이지입니다.</p>
    <ContactSection />
  </div>
);

const RegularCleaning = () => (
  <div className="py-24 container mx-auto px-4 min-h-[60vh]">
    <h1 className="text-4xl font-bold mb-8" translate="no">상업공간 정기청소</h1>
    <p className="text-lg text-gray-600">준비 중인 서비스 페이지입니다.</p>
    <ContactSection />
  </div>
);

const MoveInCleaning = () => (
  <div className="py-24 container mx-auto px-4 min-h-[60vh]">
    <h1 className="text-4xl font-bold mb-8" translate="no">입주·이사청소</h1>
    <p className="text-lg text-gray-600">준비 중인 서비스 페이지입니다.</p>
    <ContactSection />
  </div>
);

const ApplianceCleaning = () => (
  <div className="py-24 container mx-auto px-4 min-h-[60vh]">
    <h1 className="text-4xl font-bold mb-8" translate="no">가전(에어컨)청소</h1>
    <p className="text-lg text-gray-600">준비 중인 서비스 페이지입니다.</p>
    <ContactSection />
  </div>
);

const Portfolio = () => {
  const [portfolios, setPortfolios] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const q = query(collection(db, "portfolios"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPortfolios(data);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, "portfolios");
    });
    return unsubscribe;
  }, []);

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">Portfolio</h2>
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl" translate="no">포트폴리오</h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl">
            미소클린 김포점이 직접 시공한 현장들의 모습입니다. <br />
            보이지 않는 디테일의 차이를 확인해 보세요.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-slate-400">불로오고 있습니다...</div>
        ) : portfolios.length === 0 ? (
          <div className="flex justify-center py-20 text-slate-400">등록된 시공 사례가 아직 없습니다.</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:shadow-xl"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <img src={item.afterImageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-xs font-medium text-slate-400 mb-2">{item.region}</p>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const About = () => (
  <div className="py-24 container mx-auto px-4 min-h-[60vh]">
    <h1 className="text-4xl font-bold mb-8" translate="no">회사소개</h1>
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
