import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Upload, Trash2, Building, PenTool, Users } from 'lucide-react';

interface SchoolProfileProps {
  onNavigate: (view: string) => void;
}

export default function SchoolProfile({ onNavigate }: SchoolProfileProps) {
  const [logo, setLogo] = useState<string | null>(localStorage.getItem('school_logo'));
  const [signature, setSignature] = useState<string | null>(localStorage.getItem('principal_signature'));
  const [principalName, setPrincipalName] = useState(localStorage.getItem('principal_name') || 'NAMA KEPALA SEKOLAH');
  const [principalNip, setPrincipalNip] = useState(localStorage.getItem('principal_nip') || 'NIP. .........................');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogo(base64String);
        localStorage.setItem('school_logo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSignature(base64String);
        localStorage.setItem('principal_signature', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePrincipalInfo = () => {
    localStorage.setItem('principal_name', principalName);
    localStorage.setItem('principal_nip', principalNip);
    alert('Informasi kepala sekolah disimpan!');
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

    if (confirm('PERINGATAN: Mengimpor data akan MENGHAPUS data yang ada sekarang di perangkat ini. Lanjutkan?')) {
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
          
          alert('Data berhasil diimpor! Aplikasi akan memuat ulang.');
          window.location.reload();
        } catch (err) {
          alert('Gagal mengimpor data. Pastikan file benar.');
        }
      };
      reader.readAsText(file);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    localStorage.removeItem('school_logo');
  };

  const removeSignature = () => {
    setSignature(null);
    localStorage.removeItem('principal_signature');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6 pb-20"
    >
      <div className="bg-blue-900 px-6 py-4 flex items-center justify-between text-white rounded-t-2xl shadow-lg">
        <div className="flex items-center space-x-3">
          <Building size={24} className="text-blue-300" />
          <h2 className="text-xl font-bold uppercase tracking-wider">Profil & Pengaturan Sekolah</h2>
        </div>
        <button 
          onClick={() => onNavigate('welcome')}
          className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-sm font-bold border border-white/20"
        >
          <ArrowLeft size={18} />
          <span>TUTUP</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
          <div className="flex items-center space-x-2 mb-4 text-blue-900 border-b pb-2">
            <Upload size={20} />
            <h3 className="font-black">UPLOAD LOGO SEKOLAH</h3>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="w-48 h-48 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center bg-slate-50 overflow-hidden group relative">
              {logo ? (
                <>
                  <img src={logo} alt="Logo Sekolah" className="w-full h-full object-contain p-4" />
                  <button 
                    onClick={removeLogo}
                    className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold"
                  >
                    <Trash2 size={24} className="mr-2" /> HAPUS
                  </button>
                </>
              ) : (
                <div className="text-center text-slate-400 p-4">
                  <Building size={48} className="mx-auto mb-2 opacity-20" />
                  <p className="text-xs">Klik tombol di bawah untuk unggah logo (PNG/JPG)</p>
                </div>
              )}
            </div>
            
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-lg active:scale-95">
              <Upload size={18} />
              <span>PILIH GAMBAR LOGO</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
            </label>
          </div>
        </div>

        {/* Signature & Stamp Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
          <div className="flex items-center space-x-2 mb-4 text-blue-900 border-b pb-2">
            <PenTool size={20} />
            <h3 className="font-black">UPLOAD TANDA TANGAN & STEMPEL</h3>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full h-48 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center bg-slate-50 overflow-hidden group relative">
              {signature ? (
                <>
                  <img src={signature} alt="Tanda Tangan & Stempel" className="w-full h-full object-contain p-2" />
                  <button 
                    onClick={removeSignature}
                    className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold"
                  >
                    <Trash2 size={24} className="mr-2" /> HAPUS
                  </button>
                </>
              ) : (
                <div className="text-center text-slate-400 p-4">
                  <PenTool size={48} className="mx-auto mb-2 opacity-20" />
                  <p className="text-xs">Unggah gambar Tanda Tangan + Stempel (Format PNG/JPG)</p>
                </div>
              )}
            </div>
            
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-lg active:scale-95">
              <Upload size={18} />
              <span>UPLOAD TTD & STEMPEL</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleSignatureUpload} />
            </label>
          </div>
        </div>
      </div>

      {/* Principal Info Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
        <div className="flex items-center space-x-2 mb-6 text-blue-900 border-b pb-2">
          <Users size={20} />
          <h3 className="font-black uppercase">Data Kepala Sekolah</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap Kepala Sekolah</label>
            <input 
              type="text" 
              value={principalName}
              onChange={(e) => setPrincipalName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-bold"
              placeholder="Contoh: Budi Santoso, S.Pd."
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">NIP Kepala Sekolah</label>
            <input 
              type="text" 
              value={principalNip}
              onChange={(e) => setPrincipalNip(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-bold"
              placeholder="Contoh: 19800101 200501 1 001"
            />
          </div>
        </div>
        
        <button 
          onClick={handleSavePrincipalInfo}
          className="mt-6 w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-xl font-black text-lg transition-all shadow-xl active:scale-95"
        >
          SIMPAN DATA KEPALA SEKOLAH
        </button>
      </div>

      {/* Backup & Restore Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
        <div className="flex items-center space-x-2 mb-6 text-blue-900 border-b pb-2">
          <Download size={20} />
          <h3 className="font-black uppercase">Pindahkan Data (Laptop ↔ HP)</h3>
        </div>
        
        <p className="text-sm text-slate-600 mb-6">
          Gunakan fitur ini untuk memindahkan semua data (Daftar Siswa, Catatan, Logo, TTD) antar perangkat.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={exportAllData}
            className="flex items-center justify-center space-x-3 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-xl font-bold transition-all shadow-lg active:scale-95"
          >
            <Download size={20} />
            <span>DOWNLOAD BACKUP DATA</span>
          </button>
          
          <label className="cursor-pointer flex items-center justify-center space-x-3 bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-xl font-bold transition-all shadow-lg active:scale-95">
            <Upload size={20} />
            <span>PULIHKAN / IMPORT DATA</span>
            <input type="file" className="hidden" accept=".json" onChange={importAllData} />
          </label>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-700 font-medium">
              Data gambar disimpan di browser ini. Jika Anda menghapus data browser, logo dan tanda tangan harus diunggah kembali.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
