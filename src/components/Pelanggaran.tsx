import { useState } from 'react';
import { Student, StudentRecord } from '../types';
import { Plus, Save, Download, FileText, Trash2, Pencil, Check, X as CloseIcon } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';

interface PelanggaranProps {
  students: Student[];
  records: StudentRecord[];
  setRecords: (records: StudentRecord[]) => void;
  onNavigate: (view: string) => void;
}

export default function Pelanggaran({ students, records, setRecords, onNavigate }: PelanggaranProps) {
  const [activeTab, setActiveTab] = useState<'Ringan' | 'Sedang' | 'Berat'>('Ringan');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const tabs = ['Ringan', 'Sedang', 'Berat'] as const;

  const filteredRecords = records.filter(
    r => r.category === 'Pelanggaran' && r.subCategory === activeTab
  );

  const handleSave = () => {
    if (!selectedStudent || !notes || !date) {
      alert('Mohon pilih siswa, isi catatan, dan tentukan tanggal.');
      return;
    }

    const student = students.find(s => s.nomor === selectedStudent);
    if (!student) return;

    if (editingId) {
      setRecords(records.map(r => r.id === editingId ? {
        ...r,
        studentNomor: student.nomor,
        studentNama: student.nama,
        studentJurusan: student.jurusan,
        studentTingkat: student.tingkat,
        date,
        notes
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
        category: 'Pelanggaran',
        subCategory: activeTab,
        date,
        notes
      };
      setRecords([...records, newRecord]);
      alert('Data berhasil disimpan ke Bank Data!');
    }

    setNotes('');
    setSelectedStudent('');
    setDate('');
  };

  const handleEdit = (record: StudentRecord) => {
    setEditingId(record.id);
    setSelectedStudent(record.studentNomor);
    setNotes(record.notes);
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
    setNotes('');
    setDate('');
  };

  const exportToExcel = () => {
    const dataToExport = filteredRecords.map(r => ({
      'Tanggal': r.date,
      'Tingkat': r.studentTingkat,
      'Nomor': r.studentNomor,
      'Nama Siswa': r.studentNama,
      'Jurusan': r.studentJurusan,
      'Kategori': r.subCategory,
      'Catatan Pelanggaran': r.notes
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Pelanggaran ${activeTab}`);
    XLSX.writeFile(wb, `Data_Pelanggaran_${activeTab}.xlsx`);
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
        ],
      }),
      ...filteredRecords.map(r => new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(r.date)] }),
          new TableCell({ children: [new Paragraph(r.studentTingkat)] }),
          new TableCell({ children: [new Paragraph(r.studentNama)] }),
          new TableCell({ children: [new Paragraph(r.studentJurusan)] }),
          new TableCell({ children: [new Paragraph(r.notes)] }),
        ]
      }))
    ];

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: `Laporan Pelanggaran ${activeTab}`, bold: true, size: 32 })
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
    saveAs(blob, `Laporan_Pelanggaran_${activeTab}.docx`);
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
            Pelanggaran {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form Input */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            {editingId ? <Pencil size={20} className="mr-2 text-blue-600" /> : <Plus size={20} className="mr-2 text-blue-600" />}
            {editingId ? 'Edit Pelanggaran' : 'Input Pelanggaran'}
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pilih Siswa</label>
              <select 
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full rounded-lg border-slate-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">-- Pilih Siswa --</option>
                {students.sort((a,b) => a.tingkat.localeCompare(b.tingkat)).map(s => (
                  <option key={s.nomor} value={s.nomor}>[{s.tingkat}] {s.nama} ({s.jurusan})</option>
                ))}
              </select>
              {students.length === 0 && (
                <p className="text-xs text-amber-600 mt-1">Data siswa kosong. Silakan import di menu Data Siswa.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Catatan Pelanggaran</label>
              <textarea 
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tulis detail pelanggaran..."
                className="w-full rounded-lg border-slate-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={editingId ? cancelEdit : () => onNavigate('welcome')}
                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
              >
                {editingId ? 'Batal' : 'Tutup'}
              </button>
              <button
                onClick={handleSave}
                disabled={!selectedStudent || !notes || !date}
                className="flex-1 flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {editingId ? <Check size={18} className="mr-2" /> : <Save size={18} className="mr-2" />}
                {editingId ? 'Update' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>

        {/* Data List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold text-slate-800">
              Riwayat Pelanggaran {activeTab}
            </h3>
            <div className="flex space-x-2">
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
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
              <p className="text-slate-500">Belum ada catatan pelanggaran {activeTab.toLowerCase()}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
