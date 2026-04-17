import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Upload, FileSpreadsheet, Trash2, Pencil, Check, X as CloseIcon } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Student } from '../types';

interface DataSiswaProps {
  students: Student[];
  setStudents: (students: Student[]) => void;
  onNavigate: (view: string) => void;
  activeTingkat?: string;
}

export default function DataSiswa({ students, setStudents, onNavigate, activeTingkat }: DataSiswaProps) {
  const [error, setError] = useState<string | null>(null);
  const [selectedTingkat, setSelectedTingkat] = useState<string>(activeTingkat || 'X');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Student>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update selectedTingkat if prop changes (sidebar navigation)
  useEffect(() => {
    if (activeTingkat) setSelectedTingkat(activeTingkat);
  }, [activeTingkat]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!selectedTingkat) {
      setError('Silakan pilih Tingkat Kelas terlebih dahulu.');
      return;
    }

    setError(null);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        
        // Convert to JSON
        const data = XLSX.utils.sheet_to_json(ws) as any[];
        
        // Validate and map data
        const mappedStudents: Student[] = data.map((row, index) => {
          // Try to find columns regardless of case
          const nomorKey = Object.keys(row).find(k => k.toLowerCase().includes('nomor') || k.toLowerCase() === 'no');
          const namaKey = Object.keys(row).find(k => k.toLowerCase().includes('nama'));
          const jurusanKey = Object.keys(row).find(k => k.toLowerCase().includes('jurusan'));

          if (!nomorKey || !namaKey || !jurusanKey) {
            throw new Error(`Format tidak sesuai pada baris ${index + 2}. Pastikan ada kolom NOMOR, NAMA LENGKAP, dan JURUSAN.`);
          }

          return {
            id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
            nomor: String(row[nomorKey]),
            nama: String(row[namaKey]),
            jurusan: String(row[jurusanKey]),
            tingkat: selectedTingkat
          };
        });

        setStudents([...students, ...mappedStudents]);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (err: any) {
        setError(err.message || 'Gagal membaca file Excel. Pastikan formatnya benar.');
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm('Hapus data siswa ini?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const startEditing = (student: Student) => {
    setEditingId(student.id);
    setEditForm({ ...student });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (!editForm.id) return;
    setStudents(students.map(s => s.id === editForm.id ? (editForm as Student) : s));
    setEditingId(null);
    setEditForm({});
  };

  const filteredStudents = students.filter(s => s.tingkat === selectedTingkat);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-800">Import Data Siswa</h3>
            <p className="text-sm text-slate-500">Pilih tingkat kelas lalu upload file Excel (.xlsx, .xls)</p>
            
            <div className="mt-4 flex items-center space-x-4">
              <label className="text-sm font-medium text-slate-700">Tingkat Kelas:</label>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                {['X', 'XI', 'XII', 'XIII'].map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedTingkat(t)}
                    className={`
                      px-4 py-1.5 text-sm font-bold rounded-md transition-all
                      ${selectedTingkat === t 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-slate-800'}
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3 items-end">
            <button
              onClick={() => onNavigate('welcome')}
              className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
            >
              Tutup
            </button>
            <input
              type="file"
              accept=".xlsx, .xls"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Upload size={18} className="mr-2" />
              Upload Excel {selectedTingkat}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
            {error}
          </div>
        )}

        {filteredStudents.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-blue-600">
                Data Kelas {selectedTingkat} ({filteredStudents.length} Siswa)
              </span>
              <button
                onClick={() => {
                  if (confirm(`Apakah Anda yakin ingin menghapus semua data siswa kelas ${selectedTingkat}?`)) {
                    setStudents(students.filter(s => s.tingkat !== selectedTingkat));
                  }
                }}
                className="text-xs text-red-600 hover:text-red-700 flex items-center bg-red-50 px-3 py-1.5 rounded-lg border border-red-100"
              >
                <Trash2 size={14} className="mr-1" />
                Hapus Kelas {selectedTingkat}
              </button>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nomor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama Lengkap</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Jurusan</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {editingId === student.id ? (
                          <input 
                            className="border rounded px-2 py-1 w-24"
                            value={editForm.nomor}
                            onChange={e => setEditForm({...editForm, nomor: e.target.value})}
                          />
                        ) : student.nomor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {editingId === student.id ? (
                          <input 
                            className="border rounded px-2 py-1 w-full"
                            value={editForm.nama}
                            onChange={e => setEditForm({...editForm, nama: e.target.value})}
                          />
                        ) : student.nama}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {editingId === student.id ? (
                          <input 
                            className="border rounded px-2 py-1 w-full"
                            value={editForm.jurusan}
                            onChange={e => setEditForm({...editForm, jurusan: e.target.value})}
                          />
                        ) : student.jurusan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingId === student.id ? (
                          <div className="flex justify-end space-x-2">
                            <button onClick={saveEdit} className="text-emerald-600 hover:text-emerald-700">
                              <Check size={18} />
                            </button>
                            <button onClick={cancelEditing} className="text-slate-400 hover:text-slate-500">
                              <CloseIcon size={18} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end space-x-2">
                            <button onClick={() => startEditing(student)} className="text-blue-600 hover:text-blue-800">
                              <Pencil size={18} />
                            </button>
                            <button onClick={() => handleDeleteStudent(student.id)} className="text-red-600 hover:text-red-800">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
            <FileSpreadsheet size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">Belum ada data siswa untuk Kelas {selectedTingkat}.</p>
            <p className="text-sm text-slate-400 mt-1">Silakan upload file Excel atau pilih tingkat lain.</p>
          </div>
        )}
      </div>
    </div>
  );
}
