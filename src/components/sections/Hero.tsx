import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Phone, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "../ui/Forms";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-slate-900">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
          alt="Cleaning Service Background"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-xs font-bold text-blue-400 uppercase tracking-widest mb-8"
          >
            Premium Cleaning Service
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]"
          >
            청소가 바뀌면 <br />
            <span className="text-blue-500">공간의 이미지</span>가 <br />
            달라집니다.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-lg text-slate-300 leading-relaxed max-w-xl"
            translate="no"
          >
            김포 사무실청소 · 병원청소 · 학원청소 · 상가청소 전문 <br />
            정기관리부터 입주청소까지 믿고 맡기는 미소클린 김포점
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/contact">
              <Button size="lg" className="h-16 px-10 gap-2">
                무료 견적받기
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="tel:1660-4336">
              <Button size="lg" variant="outline" className="h-16 px-10 gap-3 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40">
                <Phone className="h-5 w-5 text-blue-400" />
                상담전화 바로가기
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8"
          >
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>상업공간 청소 전문가</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>방문 견적 서비스</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>친절한 사후관리</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
