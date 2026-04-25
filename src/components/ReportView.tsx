import { StudentRecord } from '../types';
import { Printer, X, Download } from 'lucide-react';
import { motion } from 'motion/react';

interface ReportViewProps {
  records: StudentRecord[];
  onClose: () => void;
}

export default function ReportView({ records, onClose }: ReportViewProps) {
  const logo = localStorage.getItem('school_logo');
  const signature = localStorage.getItem('principal_signature');
  const principalName = localStorage.getItem('principal_name') || '...............................';
  const principalNip = localStorage.getItem('principal_nip') || 'NIP. .........................';
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white w-full max-w-4xl min-h-screen my-8 rounded-none shadow-2xl flex flex-col print:shadow-none print:my-0">
        {/* Controls - Hidden during print */}
        <div className="bg-slate-800 p-4 flex items-center justify-between text-white print:hidden">
          <div className="flex items-center space-x-2">
            <Printer size={20} />
            <span className="font-bold">PRATINJAU LAPORAN</span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold flex items-center space-x-2 transition-all shadow-lg active:scale-95"
            >
              <Printer size={18} />
              <span>CETAK SEKARANG</span>
            </button>
            <button 
              onClick={onClose}
              className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg font-bold flex items-center space-x-2 transition-all"
            >
              <X size={18} />
              <span>TUTUP</span>
            </button>
          </div>
        </div>

        {/* Paper Container */}
        <div className="flex-1 p-8 md:p-12 bg-white print:p-0" id="printable-area">
          {/* Letterhead */}
          <div className="flex items-center border-b-4 border-double border-slate-900 pb-4 mb-8">
            {logo && (
              <img src={logo} alt="Logo" className="w-24 h-24 object-contain mr-6" />
            )}
            <div className="flex-1 text-center pr-12">
              <h1 className="text-xl font-bold uppercase tracking-tight">Dinas Pendidikan dan Kebudayaan Provinsi Kalimantan Utara</h1>
              <h2 className="text-2xl font-black uppercase text-blue-900">SMK NEGERI 1 BUNYU</h2>
              <p className="text-xs mt-1 italic">Jl. Tanjung Handasa Desa Bunyu Timur Kecamatan Bunyu • Email: smkn1bunyu@gmail.com</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl font-bold underline uppercase">LAPORAN PEMBINAAN & KONSELING SISWA</h3>
            <p className="text-sm font-semibold">Periode: {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
          </div>

          {/* Data Table */}
          <table className="w-full border-collapse border border-slate-400 text-xs">
            <thead>
              <tr className="bg-slate-100 uppercase font-black">
                <th className="border border-slate-400 p-2 text-center w-10">No</th>
                <th className="border border-slate-400 p-2 text-left">Nama Siswa / NIS</th>
                <th className="border border-slate-400 p-2 text-center">Kelas / Jurusan</th>
                <th className="border border-slate-400 p-2 text-center">Tanggal</th>
                <th className="border border-slate-400 p-2 text-left">Kategori - Uraian</th>
                <th className="border border-slate-400 p-2 text-left">Catatan / Tindak Lanjut</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={r.id}>
                  <td className="border border-slate-400 p-2 text-center">{i + 1}</td>
                  <td className="border border-slate-400 p-2 font-bold uppercase">
                    {r.studentNama} <br/>
                    <span className="text-[10px] font-normal text-slate-500">{r.studentNomor}</span>
                  </td>
                  <td className="border border-slate-400 p-2 text-center">{r.studentTingkat} {r.studentJurusan}</td>
                  <td className="border border-slate-400 p-2 text-center whitespace-nowrap">
                    {new Date(r.date).toLocaleDateString('id-ID')}
                  </td>
                  <td className="border border-slate-400 p-2 font-semibold">
                    [{r.category}] <br/>
                    <span className="text-[10px] uppercase">{r.subCategory}</span>
                  </td>
                  <td className="border border-slate-400 p-2 italic leading-relaxed text-[11px]">
                    "{r.notes}"
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan={6} className="border border-slate-400 p-8 text-center text-slate-400 italic">Tidak ada data untuk dicetak</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Footer - Signatures */}
          <div className="mt-16 flex justify-end">
            <div className="w-64 text-center">
              <p className="text-sm">Bunyu, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="text-sm font-bold mb-4 uppercase">Kepala Sekolah</p>
              
              <div className="h-32 flex items-center justify-center relative">
                {signature && (
                  <img src={signature} alt="Tanda Tangan & Stempel" className="max-h-full max-w-full object-contain" />
                )}
                {/* Visual line for physical sign if no image exists */}
                {!signature && <div className="w-full border-b border-dotted border-slate-400 absolute bottom-4"></div>}
              </div>
              
              <p className="font-bold border-b border-black text-sm mt-2">{principalName}</p>
              <p className="text-sm font-semibold">{principalNip}</p>
            </div>
          </div>
          
          <div className="mt-12 text-[10px] text-slate-400 border-t pt-2 flex justify-between">
            <span>Dicetak secara mandiri melalui Aplikasi Konselor SMKN 1 Bunyu</span>
            <span>Halaman 1 dari 1</span>
          </div>
        </div>
      </div>
      
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-area, #printable-area * {
            visibility: visible;
          }
          #printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            size: A4 portrait;
            margin: 1cm;
          }
        }
      `}</style>
    </motion.div>
  );
}
