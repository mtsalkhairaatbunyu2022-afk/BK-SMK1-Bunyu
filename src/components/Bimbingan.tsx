import { useState } from 'react';
import { Student, StudentRecord } from '../types';
import { Plus, Save, Download, FileText, Trash2, Pencil, Check, Printer, X as CloseIcon } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import ReportView from './ReportView';

interface BimbinganProps {
  students: Student[];
  records: StudentRecord[];
  setRecords: (records: StudentRecord[]) => void;
  onNavigate: (view: string) => void;
}

export default function Bimbingan({ students, records, setRecords, onNavigate }: BimbinganProps) {
  const [activeTab, setActiveTab] = useState<'Terpadu' | 'Kelompok'>('Terpadu');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [handlingMethod, setHandlingMethod] = useState('');
  const [date, setDate] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);

  const tabs = ['Terpadu', 'Kelompok'] as const;

  const filteredRecords = records.filter(
    r => r.category === 'Bimbingan' && r.subCategory === activeTab
  );

  const uniqueClasses = Array.from(new Set(students.map(s => `${s.tingkat} ${s.jurusan}`))).sort(
    (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  );

  const filteredStudentOptions = students.filter(
    s => selectedClassFilter === '' || `${s.tingkat} ${s.jurusan}` === selectedClassFilter
  );

  const handleSave = () => {
    if (!selectedStudent || !notes || !date) {
      alert('Mohon pilih siswa, isi catatan, dan tentukan tanggal.');
      return;
    }

    const student = students.find(s => s.id === selectedStudent);
    if (!student) return;

    if (editingId) {
      setRecords(records.map(r => r.id === editingId ? {
        ...r,
        studentNomor: student.nomor,
        studentNama: student.nama,
        studentJurusan: student.jurusan,
        studentTingkat: student.tingkat,
        date,
        notes,
        handlingMethod
      } : r));
      setEditingId(null);
      alert('Data berhasil diperbarui!');
    } else {
      const newRecord: StudentRecord = {
        id: Date.now().toString(),
        studentNomor: student.nomor,
        studentNama: student.nama,
        studentJurusan: student.jurusan,
        studentTingkat: student.tingkat,
        category: 'Bimbingan',
        subCategory: activeTab,
        date,
        notes,
        handlingMethod
      };
      setRecords([...records, newRecord]);
      alert('Data berhasil disimpan ke Bank Data!');
    }

    setNotes('');
    setHandlingMethod('');
    setSelectedStudent('');
    setDate('');
  };

  const handleEdit = (record: StudentRecord) => {
    setEditingId(record.id);
    const matchingStudent = students.find(s => 
      s.nomor === record.studentNomor && 
      s.tingkat === record.studentTingkat && 
      s.jurusan === record.studentJurusan
    );
    if (matchingStudent) {
      setSelectedClassFilter(`${matchingStudent.tingkat} ${matchingStudent.jurusan}`);
      setSelectedStudent(matchingStudent.id);
    } else {
      setSelectedStudent('');
    }
    setNotes(record.notes);
    setHandlingMethod(record.handlingMethod || '');
    setDate(record.date);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus catatan ini?')) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSelectedStudent('');
    setSelectedClassFilter('');
    setNotes('');
    setHandlingMethod('');
    setDate('');
  };

  const exportToExcel = () => {
    const dataToExport = filteredRecords.map(r => ({
      'Tanggal': r.date,
      'Tingkat': r.studentTingkat,
      'Nomor': r.studentNomor,
      'Nama Siswa': r.studentNama,
      'Jurusan': r.studentJurusan,
      'Jenis Bimbingan': r.subCategory,
      'Catatan Bimbingan': r.notes,
      'Metode Penanganan': r.handlingMethod || '-'
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Bimbingan ${activeTab}`);
    XLSX.writeFile(wb, `Data_Bimbingan_${activeTab}.xlsx`);
  };

  const exportToWord = async () => {
    const tableRows = [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Tanggal", bold: true })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Kelas", bold: true })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Nama Siswa", bold: true })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Jurusan", bold: true })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Catatan", bold: true })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Penanganan", bold: true })] })] }),
        ],
      }),
      ...filteredRecords.map(r => new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(r.date)] }),
          new TableCell({ children: [new Paragraph(r.studentTingkat)] }),
          new TableCell({ children: [new Paragraph(r.studentNama)] }),
          new TableCell({ children: [new Paragraph(r.studentJurusan)] }),
          new TableCell({ children: [new Paragraph(r.notes)] }),
          new TableCell({ children: [new Paragraph(r.handlingMethod || '-')] }),
        ]
      }))
    ];

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: `Laporan Bimbingan ${activeTab}`, bold: true, size: 32 })
            ],
            spacing: { after: 400 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: tableRows
          })
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Laporan_Bimbingan_${activeTab}.docx`);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-6 py-3 text-sm font-medium border-b-2 transition-colors
              ${activeTab === tab 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
            `}
          >
            Bimbingan {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form Input */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            {editingId ? <Pencil size={20} className="mr-2 text-blue-600" /> : <Plus size={20} className="mr-2 text-blue-600" />}
            {editingId ? 'Edit Bimbingan' : 'Input Bimbingan'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border-slate-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pilih Kelas</label>
                <select 
                  value={selectedClassFilter}
                  onChange={(e) => {
                    setSelectedClassFilter(e.target.value);
                    setSelectedStudent('');
                  }}
                  className="w-full rounded-lg border-slate-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">-- Pilih Kelas --</option>
                  {uniqueClasses.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pilih Siswa</label>
                <select 
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full rounded-lg border-slate-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
                  disabled={!selectedClassFilter && uniqueClasses.length > 0}
                >
                  <option value="">-- Pilih Siswa --</option>
                  {filteredStudentOptions.sort((a,b) => a.nama.localeCompare(b.nama)).map(s => (
                    <option key={s.id} value={s.id}>{s.nama} (No: {s.nomor})</option>
                  ))}
                </select>
              </div>
            </div>
            {students.length === 0 && (
              <p className="text-xs text-amber-600 mt-1">Data siswa kosong. Silakan import di menu Data Siswa.</p>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Catatan Bimbingan</label>
              <textarea 
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tulis detail bimbingan..."
                className="w-full rounded-lg border-slate-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Metode Penanganan / Pelaksanaan</label>
              <select
                value={handlingMethod}
                onChange={(e) => setHandlingMethod(e.target.value)}
                className="w-full rounded-lg border-slate-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-1"
              >
                <option value="">-- Pilih Metode Pelaksanaan --</option>
                <option value="Ruang BK / Konseling Individu">Ruang BK / Konseling Individu</option>
                <option value="Klasikal / Konseling Kelompok">Klasikal / Konseling Kelompok</option>
                <option value="Secara Kekeluargaan">Secara Kekeluargaan</option>
                <option value="Pemanggilan Orang Tua / Wali">Pemanggilan Orang Tua / Wali</option>
                <option value="Kunjungan ke Rumah (Home Visit)">Kunjungan ke Rumah (Home Visit)</option>
                <option value="Lainnya">Lainnya...</option>
              </select>
              {handlingMethod === "Lainnya" && (
                <input
                  type="text"
                  placeholder="Ketik metode pelaksanaan lainnya..."
                  onChange={(e) => setHandlingMethod(e.target.value)}
                  className="w-full rounded-lg border-slate-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mt-2"
                />
              )}
            </div>

            <div className={`flex space-x-3 pt-2 ${!editingId && 'hidden'}`}>
              <button
                onClick={cancelEdit}
                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={!selectedStudent || !notes || !date}
                className="flex-1 flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <Check size={18} className="mr-2" />
                Update
              </button>
            </div>

            {!editingId && (
              <div className="pt-2">
                <button
                  onClick={handleSave}
                  disabled={!selectedStudent || !notes || !date}
                  className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  <Save size={18} className="mr-2" />
                  Simpan ke Bank Data
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Data List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold text-slate-800">
              Riwayat Bimbingan {activeTab}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowReport(true)}
                disabled={filteredRecords.length === 0}
                className="inline-flex items-center px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                <Printer size={16} className="mr-1.5" />
                Cetak
              </button>
              <button
                onClick={exportToExcel}
                disabled={filteredRecords.length === 0}
                className="inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50"
              >
                <Download size={16} className="mr-1.5" />
                Excel
              </button>
              <button
                onClick={exportToWord}
                disabled={filteredRecords.length === 0}
                className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
              >
                <FileText size={16} className="mr-1.5" />
                Word
              </button>
            </div>
          </div>

          {filteredRecords.length > 0 ? (
            <div className="space-y-4">
              {filteredRecords.map(record => (
                <div key={record.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-300 transition-colors group text-left">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-800">{record.studentNama}</h4>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Kelas {record.studentTingkat} • {record.studentJurusan} • {record.studentNomor}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex bg-white rounded-lg border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(record)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-l-lg"
                        >
                          <Pencil size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(record.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-r-lg border-l border-slate-200"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <span className="text-xs font-bold px-3 py-1 bg-white border border-slate-200 rounded-full text-blue-600 shadow-sm">
                        {new Date(record.date).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mt-2 whitespace-pre-wrap leading-relaxed">{record.notes}</p>
                  {record.handlingMethod && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <span className="text-xs font-bold text-slate-500 uppercase">PELAKSANAAN:</span>
                      <p className="text-sm text-slate-800 font-medium">{record.handlingMethod}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
              <p className="text-slate-500">Belum ada catatan bimbingan {activeTab.toLowerCase()}.</p>
            </div>
          )}
        </div>
      </div>

      {showReport && (
        <ReportView 
          records={filteredRecords} 
          onClose={() => setShowReport(false)} 
        />
      )}
    </div>
  );
}
