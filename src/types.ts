export interface Student {
  id: string;
  nomor: string;
  nama: string;
  jurusan: string;
  tingkat: string;
}

export interface StudentRecord {
  id: string;
  studentNomor: string;
  studentNama: string;
  studentJurusan: string;
  studentTingkat: string;
  category: 'Pelanggaran' | 'Bimbingan';
  subCategory: string;
  date: string;
  notes: string;
  handlingMethod?: string; // e.g. "Kunjungan ke rumah", "Ruang BK", "Secara kekeluargaan"
}
