import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";

const NAV_ITEMS = [
  { name: "홈", path: "/" },
  { name: "회사소개", path: "/about" },
  { name: "상업공간 청소", path: "/commercial-cleaning" },
  { name: "상업공간 정기청소", path: "/regular-cleaning" },
  { name: "입주·이사청소", path: "/move-in-cleaning" },
  { name: "가전청소", path: "/appliance-cleaning" },
  { name: "포트폴리오", path: "/portfolio" },
  { name: "공지사항", path: "/notice" },
  { name: "견적문의", path: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-blue-900">
              미소클린 <span className="font-medium text-blue-500">김포점</span>
            </span>
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest leading-none mt-1">
              김포 상업공간 청소 전문
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                location.pathname === item.path ? "text-blue-600" : "text-gray-600"
              )}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="tel:1660-4336"
            className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 transition-all hover:bg-blue-100"
          >
            <Phone className="h-4 w-4" />
            1660-4336
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="rounded-lg p-2 text-gray-600 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-gray-100 bg-white lg:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="tel:1660-4336"
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white transition-all active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" />
                전화상담 바로가기
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
