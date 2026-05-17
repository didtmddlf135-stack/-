import React from "react";
import { motion } from "motion/react";
import { Send, Phone, MessageCircle, Info } from "lucide-react";
import { Button, Input, Select, Textarea } from "../ui/Forms";
import { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } from "@/src/lib/firebase";

const SUCCESS_MESSAGE = "견적 문의가 정상적으로 접수되었습니다. 담당자가 확인 후 곧 연락드리겠습니다.";

export function ContactSection() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      contact: formData.get("contact") as string,
      serviceType: formData.get("serviceType") as string,
      address: formData.get("address") as string,
      areaSize: formData.get("areaSize") as string,
      details: formData.get("details") as string,
      status: "pending",
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "inquiries"), data);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError("죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.");
      handleFirestoreError(err, OperationType.CREATE, "inquiries");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 skew-x-12 translate-x-1/2 -z-0" />
      
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">Get a Quote</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 sm:text-5xl">
              지금 바로 <br />
              <span className="text-blue-600">무료 견적</span>을 받으세요
            </h3>
            <p className="mt-8 text-lg text-slate-600 leading-relaxed">
              김포 지역 사업장이라면 방문 견적은 100% 무료입니다. <br />
              1분만 투자해서 문의를 남겨주시면 가장 정확한 비용을 안내해 드립니다.
            </p>

            <div className="mt-12 space-y-6">
              <a href="tel:1660-4336" className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-lg">
                <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">빠른 전화 상담</p>
                  <p className="text-xl font-bold text-slate-900 leading-none">1660-4336</p>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-amber-200 hover:shadow-lg">
                <div className="rounded-full bg-amber-50 p-3 text-amber-600">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">카카오톡 실시간 상담</p>
                  <p className="text-xl font-bold text-slate-900 leading-none">@미소클린김포</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-start gap-3 rounded-xl bg-slate-50 p-6 text-sm text-slate-500 leading-relaxed">
              <Info className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
              <p>
                입력하신 개인정보는 견적 상담 및 서비스 제공을 위해서만 사용되며, 
                상담 종료 시 안전하게 파기됩니다.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white p-8 sm:p-12 shadow-2xl shadow-blue-900/10 border border-gray-50"
          >
            {success ? (
              <div className="text-center py-12">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
                  <Send className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">접수 완료!</h4>
                <p className="text-slate-600 leading-relaxed">
                  {SUCCESS_MESSAGE}
                </p>
                <Button 
                  onClick={() => setSuccess(false)}
                  variant="outline" 
                  className="mt-8"
                >
                  새로 문의하기
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">성함 / 상호명</label>
                    <Input name="name" placeholder="홍길동 / 미소컴퍼니" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">연락처</label>
                    <Input name="contact" placeholder="010-0000-0000" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">청소 종류</label>
                  <Select name="serviceType" required>
                    <option value="">청소 종류를 선택하세요</option>
                    <option value="office">사무실 청소</option>
                    <option value="hospital">병원 청소</option>
                    <option value="academy">학원 청소</option>
                    <option value="store">상가/매장 청소</option>
                    <option value="movein">입주/이사 청소</option>
                    <option value="construction">준공 청소</option>
                    <option value="aircon">에어컨 청소</option>
                  </Select>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">지역 (김포 구/동)</label>
                    <Input name="address" placeholder="김포시 풍무동" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">평수 (선택)</label>
                    <Input name="areaSize" placeholder="예: 30평" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">상세 요청사항</label>
                  <Textarea name="details" placeholder="희망 일정이나 특별히 신경 써주길 바라는 점을 적어주세요." />
                </div>

                {error && <p className="text-sm font-medium text-red-600">{error}</p>}

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-14 text-base"
                >
                  {loading ? "접수 중..." : "1분 견적 신청하기"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
