import React from "react";
import { ShieldCheck, Target, Users, Clock, Camera, HeartHandshake } from "lucide-react";
import { motion } from "motion/react";

const BENEFITS = [
  {
    title: "상업공간 전문 노하우",
    description: "사무실, 병원, 학원의 특성을 이해하는 전문 팀이 투입됩니다.",
    icon: Target,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: "맞춤형 장비 & 인력",
    description: "공간 규모와 오염도에 최적화된 최신 장비를 운영합니다.",
    icon: ShieldCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    title: "정기관리 시스템",
    description: "주 1회부터 매일 관리까지 철저한 시스템으로 관리합니다.",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    title: "빠른 방문견적",
    description: "김포 전 지역 어디든 빠르게 달려가 무료로 견적을 냅니다.",
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    title: "현장 전/후 사진 제공",
    description: "작업 완료 후 상세한 리포트와 사진으로 결과를 보여드립니다.",
    icon: Camera,
    color: "text-rose-600",
    bg: "bg-rose-50"
  },
  {
    title: "책임감 있는 AS",
    description: "청소 완료 후 불만족 시 끝까지 케어하는 책임 사후관리.",
    icon: HeartHandshake,
    color: "text-cyan-600",
    bg: "bg-cyan-50"
  }
];

export function WhySection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">Trust & Quality</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
            왜 미소클린 김포점을 <br />
            선택해야 할까요?
          </h3>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            김포 지역의 수많은 사무실과 사업장이 이미 미소클린의 정기 관리를 받고 있습니다.
            단순히 쓸고 닦는 것을 넘어, 공간의 쾌적함과 가치를 높입니다.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col items-start rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div className={`rounded-xl p-3 mb-6 ${benefit.bg} ${benefit.color} transition-transform group-hover:scale-110`}>
                <benefit.icon className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h4>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
