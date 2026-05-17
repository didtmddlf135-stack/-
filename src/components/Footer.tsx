import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-100 py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white">
                미소클린 <span className="font-medium text-blue-400">김포점</span>
              </span>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                김포 사무실, 병원, 학원, 상가 전문 청소 서비스.
                공간의 이미지를 바꾸는 깨끗한 솔루션을 제공합니다.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold">서비스안내</h3>
            <ul className="space-y-3 text-sm text-slate-400" translate="no">
              <li><Link to="/commercial-cleaning" className="hover:text-blue-400 transition-colors">상업공간 청소</Link></li>
              <li><Link to="/regular-cleaning" className="hover:text-blue-400 transition-colors">상업공간 정기청소</Link></li>
              <li><Link to="/move-in-cleaning" className="hover:text-blue-400 transition-colors">입주·이사청소</Link></li>
              <li><Link to="/appliance-cleaning" className="hover:text-blue-400 transition-colors">가전(에어컨)청소</Link></li>
              <li><Link to="/portfolio" className="hover:text-blue-400 transition-colors">포트폴리오</Link></li>
            </ul>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <h3 className="text-lg font-bold">사업자 정보</h3>
            <div className="grid gap-4 text-sm text-slate-400 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 shrink-0" />
                <span>경기도 김포시 (상세 주소 문의)</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400 shrink-0" />
                <span>대표전화: 1660-4336</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400 shrink-0" />
                <span>이메일: contact@misoclean-kimpo.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-400 shrink-0" />
                <span>평일 09:00 ~ 20:00 (주말/공휴일 휴무)</span>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-800 text-xs text-slate-500">
              <p>대표: 양승일 | 사업자번호: 639-07-03099</p>
              <p className="mt-2 text-slate-600">© 2026 미소클린 김포점. All rights reserved.</p>
              <Link to="/admin" className="mt-4 inline-block text-[10px] text-slate-800 hover:text-slate-700">Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
