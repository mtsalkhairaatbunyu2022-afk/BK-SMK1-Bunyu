import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Download, Upload, Database, RefreshCw, AlertTriangle } from 'lucide-react';

interface BackupRestoreProps {
  onNavigate: (view: string) => void;
}

export default function BackupRestore({ onNavigate }: BackupRestoreProps) {
  
  const handleResetApp = () => {
    if (confirm('PERINGATAN KRITIS: Ini akan MENGHAPUS SEMUA DATA di aplikasi ini secara permanen (Daftar Siswa, Catatan, Logo, TTD). Pastikan Anda sudah mendownload Backup jika ingin menyimpan data. Lanjutkan?')) {
      localStorage.clear();
      alert('Seluruh data aplikasi telah dihapus. Halaman akan dimuat ulang.');
      window.location.reload();
    }
  };

  const exportAllData = () => {
    const data = {
      students: localStorage.getItem('bk_students'),
      records: localStorage.getItem('bk_records'),
      school_logo: localStorage.getItem('school_logo'),
      principal_signature: localStorage.getItem('principal_signature'),
      principal_name: localStorage.getItem('principal_name'),
      principal_nip: localStorage.getItem('principal_nip')
    };
    
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_bk_konselor_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importAllData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (confirm('PERINGATAN: Mengimpor data akan MENGGANTI data yang ada sekarang di perangkat ini dengan data dari file backup. Lanjutkan?')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (data.students) localStorage.setItem('bk_students', data.students);
          if (data.records) localStorage.setItem('bk_records', data.records);
          if (data.school_logo) localStorage.setItem('school_logo', data.school_logo);
          if (data.principal_signature) localStorage.setItem('principal_signature', data.principal_signature);
          if (data.principal_name) localStorage.setItem('principal_name', data.principal_name);
          if (data.principal_nip) localStorage.setItem('principal_nip', data.principal_nip);
          
          alert('Data berhasil dipulihkan! Aplikasi akan memuat ulang untuk menerapkan perubahan.');
          window.location.reload();
        } catch (err) {
          alert('Gagal mendeteksi data yang valid. Pastikan file yang Anda unggah adalah file backup .json yang benar.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto space-y-6 pb-20"
    >
      <div className="bg-blue-900 px-6 py-5 flex items-center justify-between text-white rounded-t-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <Database size={24} className="text-blue-300" />
          <h2 className="text-xl font-black uppercase tracking-tighter">Manajemen & Backup Data</h2>
        </div>
        <button 
          onClick={() => onNavigate('welcome')}
          className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors border border-white/20"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backup Card */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
            <Download size={32} />
          </div>
          <h3 className="font-black text-slate-800 text-lg mb-2">DOWNLOAD BACKUP</h3>
          <p className="text-sm text-slate-500 mb-6">Simpan seluruh data aplikasi ke dalam satu file. Gunakan ini untuk memindahkan data ke HP/Laptop lain atau sebagai cadangan.</p>
          <button 
            onClick={exportAllData}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2"
          >
            <Download size={20} />
            <span>SIMPAN KE PERANGKAT</span>
          </button>
        </div>

        {/* Restore Card */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
            <Upload size={32} />
          </div>
          <h3 className="font-black text-slate-800 text-lg mb-2">PULIHKAN DATA</h3>
          <p className="text-sm text-slate-500 mb-6">Unggah file backup (.json) yang sudah Anda simpan sebelumnya untuk memulihkan seluruh data di perangkat ini.</p>
          <label className="w-full cursor-pointer bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2">
            <Upload size={20} />
            <span>UNGGAH FILE BACKUP</span>
            <input type="file" className="hidden" accept=".json" onChange={importAllData} />
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-red-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
        <div className="flex items-center space-x-3 mb-4 text-red-700">
          <AlertTriangle size={24} />
          <h3 className="font-black uppercase tracking-tighter">Zona Bahaya (Danger Zone)</h3>
        </div>
        
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl mb-6">
          <p className="text-sm text-red-800 leading-relaxed font-medium">
            Fitur reset akan menghapus seluruh database lokal di browser ini, termasuk Daftar Siswa, Catatan Pelanggaran, Bimbingan, serta logo dan tanda tangan sekolah. Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>
        
        <button 
          onClick={handleResetApp}
          className="flex items-center justify-center space-x-2 w-full border-2 border-red-200 text-red-600 py-4 rounded-xl font-bold hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm"
        >
          <RefreshCw size={20} />
          <span>HAPUS / BERSIHKAN SELURUH DATA APLIKASI</span>
        </button>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl">
        <h4 className="font-bold text-blue-900 mb-2">Petunjuk Pemindahan Data:</h4>
        <ol className="list-decimal list-inside text-sm text-blue-800 space-y-2">
          <li>Klik <strong>"SIMPAN KE PERANGKAT"</strong> di Laptop untuk mendapatkan file database.</li>
          <li>Kirim file <strong>.json</strong> hasil download tersebut ke HP Anda (via WA/Email).</li>
          <li>Buka aplikasi di HP, masuk ke menu ini, lalu klik <strong>"UNGGAH FILE BACKUP"</strong>.</li>
          <li>Data Anda sekarang akan sinkron antara Laptop dan HP.</li>
        </ol>
      </div>
    </motion.div>
  );
}
