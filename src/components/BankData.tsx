import { useState } from 'react';
import { Student, StudentRecord } from '../types';
import { Database, Search, Filter, Pencil, Trash2, AlertTriangle, Users, Calendar } from 'lucide-react';

interface BankDataProps {
  students: Student[];
  records: StudentRecord[];
  setRecords: (records: StudentRecord[]) => void;
  onNavigate: (view: string) => void;
}

export default function BankData({ students, records, setRecords, onNavigate }: BankDataProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Pelanggaran' | 'Bimbingan'>('All');
  const [tingkatFilter, setTingkatFilter] = useState<'All' | 'X' | 'XI' | 'XII' | 'XIII'>('All');

  const handleDelete = (id: string) => {
    if (confirm('Hapus data ini dari bank data?')) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  const handleEdit = (record: StudentRecord) => {
    // Navigate to respective menu with edit intent
    // For now, simple navigation works since the components already handle edit state if we pass it
    // But since we can't easily pass state between components via simple onNavigate('view')
    // and we don't have a global state for "recordBeingEdited"
    // I will suggest just using the Edit button in the original menus
    // OR we could implement a quick view/edit modal here
    alert(`Silakan gunakan menu ${record.category} untuk melakukan pengeditan detail. Bank data digunakan untuk tinjauan dan penghapusan cepat.`);
  };

  const filteredRecords = records.filter(r => {
    const matchesSearch = 
      r.studentNama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studentNomor.includes(searchTerm) ||
      r.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || r.category === categoryFilter;
    const matchesTingkat = tingkatFilter === 'All' || r.studentTingkat === tingkatFilter;

    return matchesSearch && matchesCategory && matchesTingkat;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center">
              <Database className="mr-3 text-blue-600" size={28} />
              Bank Data Riwayat
            </h2>
            <p className="text-slate-500 text-sm mt-1">Pusat kontrol seluruh catatan pelanggaran dan bimbingan siswa.</p>
          </div>
          <button
            onClick={() => onNavigate('welcome')}
            className="px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Tutup
          </button>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama, nomor, atau catatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="All">Semua Kategori</option>
            <option value="Pelanggaran">Pelanggaran</option>
            <option value="Bimbingan">Bimbingan</option>
          </select>

          <select
            value={tingkatFilter}
            onChange={(e) => setTingkatFilter(e.target.value as any)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="All">Semua Kelas</option>
            <option value="X">Kelas X</option>
            <option value="XI">Kelas XI</option>
            <option value="XII">Kelas XII</option>
            <option value="XIII">Kelas XIII</option>
          </select>
        </div>

        {filteredRecords.length > 0 ? (
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div 
                key={record.id} 
                className={`
                  p-6 rounded-2xl border transition-all flex flex-col md:flex-row gap-4 items-start
                  ${record.category === 'Pelanggaran' ? 'border-amber-100 hover:border-amber-300 bg-amber-50/30' : 'border-emerald-100 hover:border-emerald-300 bg-emerald-50/30'}
                `}
              >
                <div className={`p-3 rounded-xl ${record.category === 'Pelanggaran' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {record.category === 'Pelanggaran' ? <AlertTriangle size={24} /> : <Users size={24} />}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-bold text-slate-900 text-lg">{record.studentNama}</span>
                    <span className="text-xs font-bold px-2 py-1 bg-white border border-slate-200 rounded-lg text-slate-500">
                      {record.studentNomor}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${record.category === 'Pelanggaran' ? 'bg-amber-500 text-white border-amber-500' : 'bg-emerald-500 text-white border-emerald-500'}`}>
                      {record.category} - {record.subCategory}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-slate-500 text-xs mb-3 space-x-3">
                    <span className="flex items-center"><Calendar size={14} className="mr-1" /> {new Date(record.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span className="font-bold text-blue-600">KELAS {record.studentTingkat} • {record.studentJurusan}</span>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap bg-white/50 p-4 rounded-xl border border-slate-100 italic">
                    "{record.notes}"
                  </p>
                </div>

                <div className="flex md:flex-col gap-2 w-full md:w-auto">
                  <button 
                    onClick={() => handleEdit(record)}
                    className="flex-1 md:flex-none p-3 text-blue-600 bg-white border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    title="Edit via Menu Terkait"
                  >
                    <Pencil size={20} className="mx-auto" />
                  </button>
                  <button 
                    onClick={() => handleDelete(record.id)}
                    className="flex-1 md:flex-none p-3 text-red-600 bg-white border border-red-100 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    title="Hapus Permanen"
                  >
                    <Trash2 size={20} className="mx-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <Database size={64} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">Bank Data Masih Kosong</h3>
            <p className="text-slate-500 mt-2 max-w-xs mx-auto text-sm">Belum ada catatan pelanggaran atau bimbingan yang tersimpan. Mulailah menginput data pada menu terkait.</p>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-blue-900 rounded-2xl p-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold mb-1">Penyimpanan Terintegrasi</h4>
            <p className="text-blue-100 text-sm opacity-80">Seluruh data disimpan secara otomatis di memori lokal peramban Anda.</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black">{records.length}</div>
            <div className="text-[10px] font-bold uppercase tracking-tighter">Total Catatan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
