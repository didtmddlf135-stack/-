import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Hospital, GraduationCap, Store, Home, Wind } from "lucide-react";
import { motion } from "motion/react";

const SERVICES = [
  {
    title: "상업공간 청소",
    path: "/commercial-cleaning",
    description: "사무실, 병원, 학원 등 고객이 머무는 공간을 쾌적하게.",
    icon: Building2,
    sub: ["사무실 정밀청소", "병원 위생청소", "학원 먼지케어", "상가 대청소"]
  },
  {
    title: "상업공간 정기청소",
    path: "/regular-cleaning",
    description: "꾸준한 관리가 공간의 품격을 유지합니다. 주1회부터 매일.",
    icon: Store,
    sub: ["주기적 관리", "쓰레기 분리수거", "바닥 광택 유지", "화장실 정기케어"]
  },
  {
    title: "입주·이사청소",
    path: "/move-in-cleaning",
    description: "새로운 공간의 시작, 공사 먼지부터 오염물질까지 완벽 제거.",
    icon: Home,
    sub: ["공사 잔해 제거", "살균 소독 서비스", "창틀/주방 디테일", "바닥 왁스코팅"]
  },
  {
    title: "가전(에어컨)청소",
    path: "/appliance-cleaning",
    description: "보이지 않는 곳의 먼지와 곰팡이, 정밀 분해 세척으로 해결.",
    icon: Wind,
    sub: ["시스템 에어컨", "벽걸이/스탠드", "세탁기 분해청소", "냉장고 살균세척"]
  }
];

export function ServiceSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">Our Expertise</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 sm:text-5xl">
            전문화된 청소 서비스
          </h3>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            청소가 필요한 곳이라면 어디든, 미소클린만의 맞춤형 프로토콜로 <br />
            보이지 않는 곳까지 완벽하게 케어합니다.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex overflow-hidden rounded-3xl bg-white p-2 shadow-sm transition-all hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div className="flex w-full flex-col p-8 sm:p-10">
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-blue-50 p-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <service.icon className="h-8 w-8" />
                  </div>
                  <Link to={service.path} className="text-gray-400 hover:text-blue-600 transition-colors">
                    <ArrowRight className="h-6 w-6" />
                  </Link>
                </div>
                
                <h4 className="mt-8 text-2xl font-bold text-slate-900" translate="no">{service.title}</h4>
                <p className="mt-4 text-slate-500 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {service.sub.map(s => (
                    <div key={s} className="flex items-center gap-2 text-sm text-slate-600" translate="no">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {s}
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Link to={service.path}>
                    <button className="text-sm font-bold text-blue-600 inline-flex items-center gap-2 group/btn">
                      자세히 보기
                      <div className="h-0.5 w-4 bg-blue-200 transition-all group-hover/btn:w-8 group-hover/btn:bg-blue-600" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
