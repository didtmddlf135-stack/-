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
  handleFirestoreError,
  OperationType
} from "@/src/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { Button } from "../components/ui/Forms";
import { LogIn, LogOut, Trash2, CheckCircle2, Clock, Filter } from "lucide-react";
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

export default function AdminPage() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [inquiries, setInquiries] = React.useState<Inquiry[]>([]);
  const [filter, setFilter] = React.useState<string>('all');

  const isAdmin = user?.email === 'didtmddlf135@gmail.com';

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Inquiry[];
      setInquiries(data);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, "inquiries");
    });

    return unsubscribe;
  }, [isAdmin]);

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
            등록된 구글 계정으로 로그인해 주세요.
          </p>
          <Button onClick={signIn} className="w-full h-14">구글 계정으로 로그인</Button>
        </div>
      </div>
    );
  }

  const filteredInquiries = filter === 'all' 
    ? inquiries 
    : inquiries.filter(i => i.status === filter);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">문의 관리 시스템</h1>
            <p className="mt-1 text-slate-500">실시간으로 접수된 견적 문의를 확인하고 관리하세요.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">{user.email}</span>
            <Button variant="outline" size="sm" onClick={logOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              로그아웃
            </Button>
          </div>
        </div>

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
          {filteredInquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-slate-400">접수된 문의가 없습니다.</p>
            </div>
          ) : (
            filteredInquiries.map(inquiry => (
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
                      <button 
                        onClick={() => updateStatus(inquiry.id, 'pending')}
                        className={cn("p-2 rounded-lg transition-all", inquiry.status === 'pending' && "bg-white shadow-sm")}
                      >
                        <Clock className="h-4 w-4 text-amber-500" />
                      </button>
                      <button 
                         onClick={() => updateStatus(inquiry.id, 'in-progress')}
                         className={cn("p-2 rounded-lg transition-all", inquiry.status === 'in-progress' && "bg-white shadow-sm")}
                      >
                        <Filter className="h-4 w-4 text-blue-500" />
                      </button>
                      <button 
                         onClick={() => updateStatus(inquiry.id, 'completed')}
                         className={cn("p-2 rounded-lg transition-all", inquiry.status === 'completed' && "bg-white shadow-sm")}
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteInquiry(inquiry.id)}
                      className="text-red-500 hover:bg-red-50 hover:border-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
