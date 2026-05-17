import React from "react";
import { 
  auth, 
  signIn, 
  logOut, 
  db, 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  updateDoc, 
  doc, 
  deleteDoc,
  addDoc,
  serverTimestamp,
  handleFirestoreError,
  OperationType
} from "@/src/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { Button, Input, Select, Textarea } from "../components/ui/Forms";
import { LogIn, LogOut, Trash2, CheckCircle2, Clock, Filter, Plus, LayoutDashboard, Image as ImageIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Inquiry {
  id: string;
  name: string;
  contact: string;
  serviceType: string;
  address: string;
  areaSize: string;
  details: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: any;
}

interface Portfolio {
  id: string;
  title: string;
  description: string;
  beforeImageUrl?: string;
  afterImageUrl: string;
  category: string;
  region: string;
  createdAt: any;
}

export default function AdminPage() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<'inquiries' | 'portfolio'>('inquiries');
  
  // Inquiries State
  const [inquiries, setInquiries] = React.useState<Inquiry[]>([]);
  const [filter, setFilter] = React.useState<string>('all');
  
  // Portfolio State
  const [portfolios, setPortfolios] = React.useState<Portfolio[]>([]);
  const [showAddPortfolio, setShowAddPortfolio] = React.useState(false);
  const [portfolioLoading, setPortfolioLoading] = React.useState(false);

  const isAdmin = user?.email === 'didtmddlf135@gmail.com';

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Sync Inquiries
  React.useEffect(() => {
    if (!isAdmin || activeTab !== 'inquiries') return;

    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Inquiry[];
      setInquiries(data);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, "inquiries");
    });

    return unsubscribe;
  }, [isAdmin, activeTab]);

  // Sync Portfolios
  React.useEffect(() => {
    if (!isAdmin || activeTab !== 'portfolio') return;

    const q = query(collection(db, "portfolios"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Portfolio[];
      setPortfolios(data);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, "portfolios");
    });

    return unsubscribe;
  }, [isAdmin, activeTab]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "inquiries", id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, "inquiries");
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteDoc(doc(db, "inquiries", id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, "inquiries");
    }
  };

  const handleAddPortfolio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPortfolioLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      beforeImageUrl: formData.get("beforeImageUrl") as string,
      afterImageUrl: formData.get("afterImageUrl") as string,
      category: formData.get("category") as string,
      region: formData.get("region") as string,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "portfolios"), data);
      setShowAddPortfolio(false);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "portfolios");
    } finally {
      setPortfolioLoading(false);
    }
  };

  const deletePortfolio = async (id: string) => {
    if (!window.confirm("포트폴리오를 삭제하시겠습니까?")) return;
    try {
      await deleteDoc(doc(db, "portfolios", id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, "portfolios");
    }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-12 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6">
            <LogIn className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold mb-4">관리자 로그인</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            이 페이지는 김포점 관리자 전용입니다. <br />
            등록된 구글 계정을 사용하여 CMS에 접속하세요.
          </p>
          <Button onClick={signIn} className="w-full h-14">구글 계정으로 로그인</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">미소클린 통합 관리</h1>
            <p className="mt-1 text-slate-500">문의 내역과 포트폴리오를 실시간으로 관리합니다.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">{user.displayName || '관리자'}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={logOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              로그아웃
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={cn(
              "flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2",
              activeTab === 'inquiries' 
                ? "border-blue-600 text-blue-600" 
                : "border-transparent text-slate-400 hover:text-slate-600"
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            견적 문의 관리
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={cn(
              "flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2",
              activeTab === 'portfolio' 
                ? "border-blue-600 text-blue-600" 
                : "border-transparent text-slate-400 hover:text-slate-600"
            )}
          >
            <ImageIcon className="h-4 w-4" />
            포트폴리오 관리
          </button>
        </div>

        {/* Content Section */}
        {activeTab === 'inquiries' ? (
          <>
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              <Filter className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
              {[
                { id: 'all', label: '전체' },
                { id: 'pending', label: '대기중' },
                { id: 'in-progress', label: '진행중' },
                { id: 'completed', label: '완료' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all",
                    filter === f.id ? "bg-blue-600 text-white" : "bg-white text-slate-600 hover:bg-gray-100"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="grid gap-6">
              {(filter === 'all' ? inquiries : inquiries.filter(i => i.status === filter)).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                  <p className="text-slate-400">데이터가 없습니다.</p>
                </div>
              ) : (
                (filter === 'all' ? inquiries : inquiries.filter(i => i.status === filter)).map(inquiry => (
                  <div key={inquiry.id} className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-4 flex-grow">
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
                            inquiry.status === 'pending' ? "bg-amber-100 text-amber-700" :
                            inquiry.status === 'in-progress' ? "bg-blue-100 text-blue-700" :
                            "bg-green-100 text-green-700"
                          )}>
                            {inquiry.status}
                          </span>
                          <span className="text-xs text-slate-400">
                            {inquiry.createdAt?.toDate?.()?.toLocaleString() || '접수중...'}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{inquiry.name}</h3>
                          <p className="text-lg font-medium text-blue-600 mt-1">{inquiry.contact}</p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 bg-slate-50 p-4 rounded-2xl">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">청소 종류</p>
                            <p className="text-sm font-medium">{inquiry.serviceType}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">지역 / 평수</p>
                            <p className="text-sm font-medium">{inquiry.address} / {inquiry.areaSize || '-'}</p>
                          </div>
                          <div className="sm:col-span-2 lg:col-span-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">요청사항</p>
                            <p className="text-sm text-slate-600 leading-relaxed">{inquiry.details || '없음'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 pt-6 lg:pt-0 border-t lg:border-none border-gray-100">
                        <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-xl">
                          <button onClick={() => updateStatus(inquiry.id, 'pending')} className={cn("p-2 rounded-lg transition-all", inquiry.status === 'pending' && "bg-white shadow-sm")}><Clock className="h-4 w-4 text-amber-500" /></button>
                          <button onClick={() => updateStatus(inquiry.id, 'in-progress')} className={cn("p-2 rounded-lg transition-all", inquiry.status === 'in-progress' && "bg-white shadow-sm")}><Filter className="h-4 w-4 text-blue-500" /></button>
                          <button onClick={() => updateStatus(inquiry.id, 'completed')} className={cn("p-2 rounded-lg transition-all", inquiry.status === 'completed' && "bg-white shadow-sm")}><CheckCircle2 className="h-4 w-4 text-green-500" /></button>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => deleteInquiry(inquiry.id)} className="text-red-500 hover:bg-red-50 hover:border-red-100"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">시공 사례 목록 ({portfolios.length})</h2>
              <Button onClick={() => setShowAddPortfolio(!showAddPortfolio)} className="gap-2">
                <Plus className="h-4 w-4" />
                현장 등록하기
              </Button>
            </div>

            {showAddPortfolio && (
              <div className="rounded-3xl bg-white p-8 shadow-xl border border-blue-100">
                <h3 className="text-lg font-bold mb-6">새로운 시공 사례 등록</h3>
                <form onSubmit={handleAddPortfolio} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">공사 제목</label>
                      <Input name="title" placeholder="예: 구래동 지식산업센터 사무실 청소" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">카테고리</label>
                      <Input name="category" placeholder="사무실, 병원, 학원 등" required />
                    </div>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Before 사진 URL (선택)</label>
                      <Input name="beforeImageUrl" placeholder="https://..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">After 사진 URL</label>
                      <Input name="afterImageUrl" placeholder="https://..." required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">지역</label>
                    <Input name="region" placeholder="예: 김포시 장기동" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">상세 설명</label>
                    <Textarea name="description" placeholder="작업 내용 및 특이사항을 입력해 주세요." required />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" disabled={portfolioLoading} className="flex-grow">
                      {portfolioLoading ? "등록 중..." : "현장 등록 완료"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowAddPortfolio(false)}>취소</Button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {portfolios.map(item => (
                <div key={item.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
                  <div className="aspect-video w-full overflow-hidden bg-gray-100">
                    <img src={item.afterImageUrl} alt={item.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{item.category}</span>
                      <span className="text-[10px] font-medium text-slate-400">{item.region}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2 truncate">{item.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4">{item.description}</p>
                    <div className="flex justify-end pt-4 border-t border-gray-50">
                      <button onClick={() => deletePortfolio(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
