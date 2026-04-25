import { motion } from 'motion/react';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface TataTertibProps {
  onNavigate: (view: string) => void;
}

export default function TataTertib({ onNavigate }: TataTertibProps) {
  const logo = localStorage.getItem('school_logo');
  const signature = localStorage.getItem('principal_signature');
  const principalName = localStorage.getItem('principal_name') || '...............................';
  const principalNip = localStorage.getItem('principal_nip') || 'NIP. .........................';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
    >
      <div className="bg-blue-900 px-6 py-4 flex items-center justify-between text-white sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <BookOpen size={24} className="text-blue-300" />
          <h2 className="text-xl font-bold uppercase tracking-wider">Tata Tertib Siswa</h2>
        </div>
        <button 
          onClick={() => onNavigate('welcome')}
          className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-sm font-bold border border-white/20"
        >
          <ArrowLeft size={18} />
          <span>TUTUP</span>
        </button>
      </div>

      <div className="p-8 max-h-[80vh] overflow-y-auto prose prose-slate max-w-none">
        {/* Letterhead */}
        <div className="flex items-center border-b-4 border-double border-slate-900 pb-4 mb-8">
          {logo && (
            <img src={logo} alt="Logo Sekolah" className="w-24 h-24 object-contain mr-6" />
          )}
          <div className="flex-1 text-center pr-12">
            <h1 className="text-xl font-bold uppercase tracking-tight m-0">Dinas Pendidikan dan Kebudayaan Provinsi Kalimantan Utara</h1>
            <h2 className="text-2xl font-black uppercase text-blue-900 m-0 leading-tight">SMK NEGERI 1 BUNYU</h2>
            <p className="text-xs mt-1 italic m-0">Jl. Tanjung Handasa Desa Bunyu Timur Kecamatan Bunyu • Email: smkn1bunyu@gmail.com</p>
          </div>
        </div>

        <div className="text-center mb-10">
          <h3 className="text-xl font-bold underline uppercase m-0">TATA TERTIB SISWA</h3>
          <p className="text-sm font-semibold m-1">SMK NEGERI 1 BUNYU</p>
        </div>

        <section className="space-y-6">
          <div>
            <h3 className="font-bold text-center mb-2">BAB I PENGERTIAN</h3>
            <p className="text-center font-semibold mb-4">Pasal 1</p>
            <p>
              Semua peraturan dan ketentuan yang dibuat dalam menjaga ketertiban sekolah. Ketertiban berarti kondisi dinamis yang menimbulkan keserasian, keselarasan dan keseimbang dalam tata hidup bersama sebagai makhluk Tuhan. Dalam kehidupan sekolah, kondisi mencerminkan keteraturan dalam pergaulan, dalam penggunaan dan pemeliharaan sarana prasarana , penggunaan waktu, pengelolaan administrasi serta dalam mengatur hubungan dengan masyarakat dan lingkungannya.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-center mb-2">BAB II KETENTUAN UMUM</h3>
            <p className="text-center font-semibold mb-4">Pasal 2</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Setiap siswa adalah keluarga besar SMK Negeri 1 Bunyu yang harus menjaga nama baik almamater sekolah baik di dalam maupun di luar sekolah.</li>
              <li>Untuk menciptakan suasana proses belajar mengajar yang baik, tertib, lancar, terkendali serta pembinaan di sekolah diperlukan suatu aturan bagi seluruh siswa yang selanjutnya disebut tata tertib siswa.</li>
              <li>Tata tertib siswa dibuat untuk mengatur segala proses pendidikan di sekolah.</li>
              <li>Lingkungan pendidikan dan pembinaan sekolah merupakan bagian yang tidak terpisahkan yang kemudian disebut Sekolah.</li>
              <li>Setiap siswa wajib mentaati dan mematuhi ketentuan yang ada dalam tata tertib siswa di sekolah.</li>
              <li>Setiap siswa wajib menjaga dan mempertahankan aturan yang ada demi kelangsungan dan ketahanan sekolah.</li>
              <li>Setiap siswa yang tidak mematuhi aturan tata tertib yang berlaku akan diberikan sanksi sesuai ketentuan yang berlaku.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-bold text-center mb-2">BAB III DASAR, FUNGSI DAN TUJUAN</h3>
            <div className="mb-6">
              <p className="text-center font-semibold mb-2">Pasal 3</p>
              <p className="text-center font-bold mb-4">Dasar</p>
              <p>Sebagai dasar dalam pelaksanaan tata tertib sekolah adalah :</p>
              <ol className="list-decimal pl-6 space-y-2 mt-2">
                <li>Pancasila.</li>
                <li>Undang Undang Dasar 1945.</li>
                <li>Undang Undang Sistem Pendidikan Nasional Nomor. 20 Tahun 2003.</li>
                <li>Peraturan pemerintah No. 19 tahun 2005 tentang Standar Nasional Pendidikan.</li>
                <li>Peraturan pemerintah No. 39 tahun 2008 tentang Pembinaan Kesiswaan.</li>
              </ol>
            </div>

            <div className="mb-6">
              <p className="text-center font-semibold mb-2">Pasal 4</p>
              <p className="text-center font-bold mb-4">Fungsi</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Mampu mengarahkan siswa untuk mendukung tercapainya visi misi sekolah.</li>
                <li>Membentuk siswa yang mampu menjaga nama baik sekolah.</li>
                <li>Menjaga dan menghindarkan siswa dari perbuatan yang menyimpang dan penggunaan obat obat terlarang.</li>
                <li>Membentuk siswa yang berkarakter, mengerti dan menghormati peraturan.</li>
              </ol>
            </div>

            <div className="mb-6">
              <p className="text-center font-semibold mb-2">Pasal 5</p>
              <p className="text-center font-bold mb-4">Tujuan</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Membentuk siswa yang handal baik secara iptek maupun imtak.</li>
                <li>Menjaga keutuhan dan kebersamaan keluarga besar SMK Negeri 1 Bunyu.</li>
                <li>Menjaga nama baik almamater akademika SMK Negeri 1 Bunyu.</li>
                <li>Untuk memberikan rambu-rambu yang jelas tentang norma, etika dan disiplin yang harus dipatuhi oleh peserta didik.</li>
                <li>Menumbuh kembangkan budaya karakter bangsa pada diri siswa.</li>
                <li>Menjadikan sekolah sebagai pusat kebudayaan dan pengembangan segala ilmu yang dikembangkan dalam mata pelajaran.</li>
                <li>Untuk mengantispasi munculnya penyimpangan perilaku peserta didik sejalan dengan perkembangan zaman.</li>
                <li>Menciptakan suasana belajar siswa yang kondusif, tertib, disiplin dalam meraih cita-cita demi masa depan.</li>
                <li>Menciptakan suasana belajar yang harmonis, aman penuh dengan suasana kekeluargaan yang akrab dan tenteram.</li>
              </ol>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-center mb-2">BAB IV HAK DAN KEWAJIBAN SISWA</h3>
            <div className="mb-6">
              <p className="text-center font-semibold mb-4">Pasal 6</p>
              <p className="font-bold mb-4 text-center">Hak siswa</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Setiap siswa SMK Negeri 1 Bunyu memiliki hak:</li>
                <li>Mendapatkan pendidikan dan pengajaran disekolah baik jam pagi maupun jam tambahan sore.</li>
                <li>Mendapatkan pelayanan dan perlakuan sama sesuai ketentuan yang berlaku.</li>
                <li>Mendapatkan nomor induk siswa dan nomor induk siswa nasional.</li>
                <li>Menjadi anggota dan mengikuti kegiatan OSIS.</li>
                <li>Memperoleh pendidikan agama sesuai dengan agama yang dianutnya.</li>
                <li>Memilih program jurusan dan atau peminatan sesuai minat bakat dan kemampuannya.</li>
                <li>Memilih kegiatan ekstrakurikuler yang diminati sesuai program sekolah.</li>
                <li>Mendapatkan layanan konsultasi yang sama sesuai ketentuan.</li>
                <li>Mengikuti ulangan harian, ulangan tengah semester, ulangan akhir semester, ulangan kenaikan kelas, ujian sekolah bertaraf nasional, uji kompetensi keahlian dan ujian nasional sesuai ketentuan yang berlaku.</li>
                <li>Memberikan saran dan masukan yang bersifat konstruktif terhadap sekolah.</li>
                <li>Memakai fasilitas sekolah sesuai ketentuan yang berlaku.</li>
                <li>Mendapatkan layanan informasi dalam pengembangan studi lanjut dan karir.</li>
                <li>Menerima buku laporan hasil belajar siswa setiap akhir semester.</li>
                <li>Mendapatkan ijazah apabila telah dinyatakan lulus dalam ujian akhir.</li>
                <li>Mengembangkan kreativitasnya sesuai ketentuan yang berlaku di sekolah.</li>
                <li>Meminjam buku di perpustakaan sesuai ketentuan yang berlaku di sekolah.</li>
              </ol>
            </div>

            <div className="mb-6">
              <p className="text-center font-semibold mb-4">Pasal 7</p>
              <p className="font-bold mb-4 text-center">Kewajiban Siswa</p>
              <p>Setiap siswa SMK Negeri 1 Bunyu memiliki kewajiban:</p>
              <ol className="list-decimal pl-6 space-y-2 mt-2">
                <li>Mentaati dan mematuhi tata tertib yang berlaku di sekolah.</li>
                <li>Menciptakan suasana belajar siswa menjadi kondusif, tertib, disiplin dalam meraih Ilmu pengetahuan dan keterampilan.</li>
                <li>Hormat dan sopan, dan santun kepada semua warga atau keluarga besar SMK Negeri 1 Bunyu, termasuk tamu sekolah.</li>
                <li>Menjaga nama baik diri sendiri, keluarga dan sekolah, dimanapun dan kapanpun berada.</li>
                <li>Mengikuti kegiatan belajar mengajar dengan sungguh sungguh sesuai dengan jadwal yang berlaku.</li>
                <li>Mengikuti kegiatan kegiatan yang diselenggarakan oleh sekolah baik di dalam maupun di luar sekolah.</li>
                <li>Mengikuti kegiatan intrakurikuler maupun ekstrakurikuler.</li>
                <li>Memiliki kartu pelajar sebagai kartu identitas siswa.</li>
                <li>Mengikuti kegiatan yang dilakukan oleh OSIS.</li>
                <li>Menjaga tata krama pergaulan dengan seluruh civitas akademika SMK Negeri 1 Bunyu.</li>
                <li>Berpakaian seragam sesuai ketentuan yang berlaku.</li>
                <li>Mengikuti ketentuan khusus yang berlaku dalam sekolah (ketentuan bengkel, laboratorium, perpustakaan, dan lain lain).</li>
                <li>Mengikuti semua kegiatan belajar mengajar sejak jam pertama hingga jam terakhir, serta pulang secara bersama-sama setelah tanda bel pelajaran terakhir dibunyikan.</li>
                <li>Mengikuti upacara yang diselenggarakan di sekolah maupun di luar sekolah.</li>
                <li>Mengikuti kegiatan prakerin/magang sesuai ketentuan yang ada.</li>
                <li>Menjaga kebersihan, keindahan, ketertiban, kekeluargaan, keamanan, kerindangan di lingkungan sekolah</li>
                <li>Menghormati kepala sekolah, guru, karyawan, teman yang lain dan seluruh civitas akademika SMK Negeri 1 Bunyu.</li>
                <li>Berpenampilan rapi, berkepribadian yang terpuji dengan bersikap sopan dan santun baik terhadap kepala sekolah, guru, karyawan maupun seluruh civitas akademika SMK Negeri 1 Bunyu.</li>
                <li>Melaporkan kepada kepala sekolah atau aparat sekolah yang ditunjuk apabila terjadi gejala yang mengarah kepada gangguan stabilitas sekolah.</li>
              </ol>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-center mb-2">BAB V KEGIATAN BELAJAR MENGAJAR</h3>
            <p className="text-center font-semibold mb-4">Pasal 8</p>
            <p className="font-bold mb-4 text-center">Kehadiran siswa</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Setiap siswa wajib hadir setiap hari efektif sesuai kalender pendidikan yang berlaku.</li>
              <li>Setiap siswa wajib mengikuti kegiatan belajar pagi maupun sore hari.</li>
              <li>Siswa hadir di sekolah sepuluh menit sebelum jam pelajaran pertama dimulai dan mengikuti apel pagi.</li>
              <li>Kegiatan belajar mengajar diatur lebih lanjut oleh waka kurikulum yang diketahui oleh kepala sekolah yang kemudian disebut jadwal pelajaran.</li>
              <li>Siswa setiap hari Kamis dan Jum’at diwajibkan buku bacaan dan membawa kitab suci masing-masing untuk dibaca, hari Rabu PBB.</li>
              <li>Kegiatan OSIS, nonakademik, ekstrakurikuler, dan pembinaan kegiatan kesiswaan diatur lebih lanjut oleh waka kesiswaan yang diketahui oleh kepala sekolah yang kemudian disebut jadwal kegiatan kesiswaan.</li>
              <li>Kegiatan pembinaan lomba LKS, O2SN, FLS2N, akademik dan nonakademik harus seijin dan sepengetahuan waka kurikulum, waka kesiswaan, dan koordinator lomba akademik dan nonakademik.</li>
              <li>Sebelum jam pelajaran pertama dimulai dan setelah jam pelajaran terakhir selesai, siswa dan guru berdoa bersama dipimpin oleh ketua kelas atau pengurus kelas.</li>
              <li>Siswa yang tidak hadir di sekolah karena suatu alasan tertentu, orang tua harus menyampaikan pemberitahuan tertulis atau lisan melalui handpone kepada sekolah.</li>
              <li>Kehadiran siswa dalam mengikuti proses kegiatan belajar mengajar minimal 90% dari jumlah tatap muka dalam satu semester, apabila tidak terpenuhi maka dinyatakan tidak memenuhi syarat untuk mengikuti ulangan akhir semester.</li>
              <li>Kehadiran siswa setiap hari dimonitor oleh ketua kelas, wali kelas dan guru mata pelajaran.</li>
              <li>Siswa yang memiliki kemampuan akademik belum memenuhi standar menurut guru bidang studi harus mengikuti matrikulasi bidang studi.</li>
              <li>Siswa yang tidak ikut matrikulasi akan dilakukan pemanggilan dan akan diinformasiikan dengan orangtua.</li>
              <li>Selama dalam proses pembelajaran siswa tidak diperbolehkan menerima tamu, tanpa seizin dari dari guru mata pelajaran yang bersangkutan.</li>
              <li>Setiap siswa yang izin karena alasan tugas atau mewakili sekolah dihitung tetap hadir di sekolah yang kemudian disebut dispensasi.</li>
              <li>Selama dalam proses pembelajaran siswa tidak diperbolehkan minum dan atau makan di dalam ruang kelas.</li>
              <li>Selama mengikuti belajar siswa tidak dibenarkan memakai jaket, kecuali kondisi tertentu seijin guru mata pelajaran.</li>
            </ol>
          </div>

          <div>
            <p className="text-center font-semibold mb-4">Pasal 9</p>
            <p className="font-bold mb-4 text-center">Ketidakhadiran Siswa</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Siswa yang meninggalkan kegiatan belajar mengajar karena alasan tertentu, orang tua siswa/wali murid harus membuat surat permohonan izin yang ditujukan kepada guru wali kelas.</li>
              <li>Setiap siswa yang tidak hadir kegiatan belajar mengajar di kelas pada hari efektif tanpa ada pemberitahuan kepada sekolah dianggap sebagai alpa.</li>
              <li>Siswa yang tidak hadir di sekolah lebih dari 2 hari berturut turut karena alasan tertentu, orang tua siswa membuat surat permohonan izin tertulis kepada guru wali kelas.</li>
              <li>Siswa yang tidak hadir di sekolah lebih dari 2 hari berturut turut karena alasan sakit harus membuat surat permohonan izin kepada guru wali kelas dan menyampaikan surat keterangan sakit dari dokter atau petugas medis.</li>
              <li>Siswa tidak hadir di sekolah 2 hari berturut-turut tanpa ada pemberitahuan akan diberikan teguran.</li>
              <li>Siswa tidak hadir di sekolah 4 hari berturut-turut tanpa ada pemberitahuan akan diberikan surat peringatan I dalam jangka waktu 3 bulan.</li>
              <li>Siswa tidak hadir di sekolah 6 hari berturut-turut tanpa ada pemberitahuan akan diberikan surat peringatan ke II dalam jangka waktu 6 bulan</li>
              <li>Siswa tidak hadir di sekolah 10 hari berturut-turut tanpa ada pemberitahuan akan diberikan surat peringatan ke III dan dikembalikan kepada orang tua</li>
            </ol>
          </div>

          <div>
            <p className="text-center font-semibold mb-4">Pasal 10</p>
            <p className="font-bold mb-4 text-center">Siswa Terlambat</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Siswa yang terlambat mengikuti kegiatan belajar mengajar lebih dari 15 menit tidak diperbolehkan masuk dan dianggap alpa dalam tatap muka mata pelajaran, kecuali ada hal- yang darurat atau ada pemberitahuan sebelumnya dari orang tua baik berupa sms, telpon, whatsapp dan lain-lain.</li>
              <li>Siswa yang terlambat setelah tanda masuk berbunyi jam 07.15 diberikan sanksi berupa pembinaan membersihkan lingkungan sekolah setelah pulang sekolah didampingi oleh guru piket.</li>
              <li>Siswa lima (5) kali terlambat dalam jangka waktu satu bulan akan dilakukan pemanggilan terhadap orang tua.</li>
              <li>Siswa enam (6) kali terlambat dalam jangka waktu satu bulan akan diberikan surat peringatan SP1 serta pemanggilan orang tua dan kepadanya diberikan sanksi berupa tidak mengikuti pelajaran selama dua (2) hari (alfa).</li>
              <li>Siswa tujuh (7) kali terlambat dalam jangka waktu satu bulan akan diberikan surat peringatan SP2 serta pemanggilan orang tua dan kepadanya diberikan sanksi berupa tidak mengikuti pelajaran selama enam (6) hari (alfa).</li>
              <li>Siswa delapan (8) kali terlambat dalam jangka waktu satu bulan akan diberikan surat peringatan SP3 dan akan dikembalikan kepadaorangtua.</li>
            </ol>
          </div>

          <div>
            <p className="text-center font-semibold mb-4">Pasal 11</p>
            <p className="font-bold mb-4 text-center">Mekanisme Perizinan</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Setiap siswa yang meninggalkan kegiatan belajar mengajar dan atau tidak masuk sekolah, harus ada izin dari sekolah dengan berdasarkan surat permohonan tertulis dari orang tua.</li>
              <li>Apabila siswa akan meninggalkan sekolah sebelum jam belajar sekolah berakhir oleh karena sakit atau ijin keperluan lain, harus minta ijin kepada guru wali kelas.</li>
              <li>Siswa meninggalkan pembelajaran harus melapor pada guru mata pelajaran di kelas dan dilanjutkan ke guru piket (apabila guru mapel tidak dialihkan ke wali kelas) wajib menitipkan ID Card ke guru piket.</li>
              <li>Siswa izin untuk tidak masuk sekolah selama 1 hari karena alasan tertentu cukup izin wali kelas melalui orang tua.</li>
              <li>Siswa memerlukan izin meninggalkan sekolah selama 2 hari atau lebih harus mendapat izin dari wali kelas dan diketahui oleh wakil kepala sekolah atau koordinator bagian kesiswaan.</li>
              <li>Siswa yang tidak masuk 1 hari atau lebih karena mendapat tugas dari sekolah untuk mengikuti kegiatan di luar sekolah, akan mendapat surat dispensasi (dianggap hadir) dari sekolah yang mengetahui wakil kepala sekolah atau bidang kesiswaan.</li>
              <li>Siswa yang tidak masuk 1 hari ke sekolah karena sakit, orang tua/wali murid mengizinkan ke wali kelas.</li>
              <li>Siswa yang tidak masuk lebih dari satu hari karena sakit, orang tua siswa/wali murid membuat surat izin disertai surat keterangan sakit dari dokter atau rumah sakit/puskesmas yang ditujukan kepada guru wali kelas.</li>
              <li>Prosedur perizinan siswa meninggalkan belajar diatur sebagai berikut:</li>
              <ul className="list-disc pl-6 space-y-1 mt-1">
                <li>Setiap siswa yang akan minta izin harus melapor petugas piket dengan membawa surat izin dari orang tua/wali murid dan meminta lembaran surat izin.</li>
                <li>Siswa harus menuliskan keperluan dan waktu kembalinya di buku izin siswa.</li>
                <li>Petugas piket memberikan 2 rangkap surat keterangan izin keluar kepada siswa yang harus diserahkan kepada pengurus kelas dan guru wali kelas.</li>
                <li>Setiap siswa yang izin meninggalkan belajar akan diadministrasikan dalam buku oleh petugas piket.</li>
                <li>Petugas piket dapat memberikan izin karena sakit atau keperluan mendesak/darurat/kepentingan sekolah.</li>
                <li>Setiap siswa yang izin meninggalkan kegiatan belajar mengajar karena alasan kegiatan sekolah harus seizin koordinator kegiatan.</li>
                <li>Setiap siswa yang izin keluar pada jam sekolah harus melapor kepada piket pada saat kembali di sekolah</li>
              </ul>
              <li>Wakil kepala sekolah bidang kesiswaan dapat memberikan rekomendasi izin siswa pada suatu kondisi tertentu.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-bold text-center mb-2">BAB VI PAKAIAN DAN TATA RIAS</h3>
            <p className="text-center font-semibold mb-4">Pasal 12</p>
            <p className="font-bold mb-4 text-center">Seragam siswa</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Setiap siswa wajib memakai seragam sekolah sesuai ketentuan yang ada.</li>
              <li>Keseragaman pakaian meliputi corak, jenis/bahan kain, model, warna, atribut yang dipergunakan dan nama siswa.</li>
              <li>Semua jenis seragam wajib dilengkapi dengan atribut yang ditentukan (lambang sekolah, lambang jurusan,simbol OSIS, simbol lokasi sekolah, nama siswa).</li>
              <li>Baju seragam wajib dimasukkan secara rapi dalam celana/rok.</li>
              <li>Siswa yang berpakaian diluar ketentuan tidak diperkenankan masuk kelas atau dipulangkan ke rumah.</li>
              <li>Untuk celana / rok harus memakai ikat pinggang berwarna hitam polos.</li>
              <li>Selama di lingkungan sekolah, siswa tidak dibenarkan mengeluarkan baju dan menggulung lengan panjang serta membuka kancing baju bagian atas.</li>
              <li>Siswa tidak diperbolehkan memakai sandal, celana pendek atau kaos oblong pada saat berurusan di sekolah.</li>
              <li>Siswa menggunakan sepatu (terutama pada saat apel)</li>
              <li>Siswa memakai pakaian olah raga pada saat mengikuti kegiatan kesiswaan dan pelajaran olah raga.</li>
              <li>Pakaian olah raga tersebut merupakan seragam yang diatur kemudian oleh waka kesiswaan yang diketahui oleh kepala sekolah yang kemudian dinamakan ketentuan pakaian olah raga.</li>
              <li>Pada saat upacara siswa wajib memakai seragam putih abu abu, memakai jas SMK Negeri 1 Bunyu lengkap dengan topi.</li>
              <li>Petugas upacara bendera memakai seragam putih putih dan baju lengan panjang.</li>
              <li>Pemakaian seragam diatur sebagai berikut:</li>
              <ul className="list-disc pl-6 space-y-1 mt-1">
                <li>Senin : Putih Abu-abu (OSIS)</li>
                <li>Selasa : Baju Olahraga</li>
                <li>Rabu : Seragam Khusus Kompetensi Keahlian</li>
                <li>Kamis : Batik</li>
                <li>Jum’at : Pramuka</li>
              </ul>
              <li>Bentuk pakaian yang dipergunakan setiap hari:</li>
              <div className="pl-6 mt-2 space-y-4">
                <div>
                  <p className="font-semibold">Siswa laki-laki:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Kemeja lengan pendek, tidak digulung, memakai kerah dan memakai satu kantong di dada sebelah kiri.</li>
                    <li>Pada lengan kanan bagian atas di tempel simbol lokasi sekolah, lengan kanan bagian bawah lokasi di tempel logo sekolah, pada dada sebelah kanan di tempel nama siswa, dan pada kantong baju ditempel simbol OSIS.</li>
                    <li>Celana panjang sesuai dengan ukuran postur tubuh dan memakai kantong samping kiri dan kanan bagian depan dan satu kantong belakang.</li>
                    <li>Lebar celana bagian bawah 18 – 20 cm.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">Siswa perempuan:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Kemeja lengan pendek, tidak digulung memakai kerah dan memakai satu kantong di dada sebelah kiri, khusus yang berjilbab memakai lengan panjang.</li>
                    <li>Pada lengan kanan bagian atas di tempel simbol lokasi sekolah, lengan kanan bagian bawah lokasi di tempel logo sekolah, pada dada sebelah kanan di tempel nama siswa, dan pada kantong baju ditempel simbol OSIS.</li>
                    <li>Memakai rok tidak boleh ketat, dan panjang rok sampai mata kaki.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">Bagi yang berjilbab:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Warna jilbab putih polos untuk setiap hari, kecuali pada saat memakai seragam PDH boleh memakai jilbab warna hitam.</li>
                    <li>Memakai dalaman jilbab.</li>
                    <li>Panjang jilbab tidak melebihi siku tangan.</li>
                    <li>Lengan baju tidak boleh dilipat sampai siku.</li>
                  </ul>
                </div>
              </div>
              <li className="mt-4">Pemakaian sepatu sekolah:</li>
              <ul className="list-disc pl-6 space-y-1">
                 <li>Senin – Jum’at: Sepatu warna hitam polos, bertali dan kaos kaki putih polos (ukuran kaos kaki panjang 25 – 30 cm)</li>
              </ul>
              <li>Penggunaan tas siswa yang diperbolehkan adalah tas rangsel warna hitam.</li>
              <li>Pakaian seragam tidak boleh ketat.</li>
              <li>Setiap melakukan kegiatan sekolah yang dilakukan di luar lingkungan sekolah harus memakai seragam sesuai ketentuan yang ada.</li>
              <li>Siswa diperbolehkan memakai pakaian bebas pantas dan rapi untuk kegiatan sore hari di sekolah (tidak boleh memakai kaos oblong, celana pendek, sandal).</li>
            </ol>
          </div>

          <div>
            <p className="text-center font-semibold mb-4">Pasal 13</p>
            <p className="font-bold mb-4 text-center">Tata Rias</p>
            <div className="space-y-6">
              <div>
                <p className="font-semibold mb-2">1. Siswa putra harus berpenampilan sebagai berikut:</p>
                <ol className="list-[lower-alpha] pl-6 space-y-1">
                  <li>Berpakaian rapi setiap hari.</li>
                  <li>Potongan rambut pendek dan rapi, tidak boleh melebihi kerah baju (ukuran maksimal bagian atas 4 cm, bagian belakang 3 cm, dan kiri kanan 2 cm).</li>
                  <li>Tidak menyemir rambut dengan pewarna rambut.</li>
                  <li>Tidak bertato baik permanen maupun tidak permanen</li>
                  <li>Tidak mengenakan gelang atau kalung.</li>
                  <li>Telinga tidak ditindik.</li>
                </ol>
              </div>
              <div>
                <p className="font-semibold mb-2">2. Siswa putri harus berpenampilan sebagai berikut:</p>
                <ol className="list-[lower-alpha] pl-6 space-y-1">
                  <li>Berpakaian rapi setiap hari.</li>
                  <li>Potongan rambut wajar dan panjangnya menutup tengkuk.</li>
                  <li>Tidak memanjangkan rambut melebihi tengkuk (bagi yang tidak berjilbab)</li>
                  <li>Tidak menyemir rambut dengan pewarna rambut dan rambut tidak bersambung</li>
                  <li>Tidak menindik tubuh selain di telinga dan tidak lebih dari satu</li>
                  <li>Tidak menggunakan make up</li>
                  <li>Tidak mencukur alis mata.</li>
                  <li>Tidak mengenakan perhiasan.</li>
                  <li>Tidak bertato baik permanen maupun tidak permanen.</li>
                </ol>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-center mb-2">BAB VII KEGIATAN SEKOLAH</h3>
            <p className="text-center font-semibold mb-4">Pasal 14</p>
            <p className="font-bold mb-4 text-center">Kegiatan peserta didik di sekolah</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Setiap peserta didik harus mengikuti kegiatan yang diprogramkan sekolah.</li>
              <li>Setiap peserta didik yang meninggalkan kegiatan sekolah harus mendapatkan izin sebagaimana prosedur yang berlaku.</li>
              <li>Peserta didik tidak dibolehkan melakukan kegiatan atau kerjasama dengan pihak luar sekolah tanpa seijin pimpinan sekolah.</li>
              <li>Peserta didik tidak dibolehkan melakukan kegiatan mengatasnamakan sekolah di luar sekolah tanpa seijin pimpinan sekolah.</li>
              <li>Setiap peserta didik yang meninggalkan belajar karena melakukan kegiatan program sekolah, harus mendapat izin dari sekolah dan diketahui oleh wali kelas dan guru mata pelajaran.</li>
              <li>Dalam keadaan tertentu wakil kepala sekolah bagian kesiswaan dapat memberikan rekomendasi pada peserta didik yang melakukan kegiatan program sekolah.</li>
            </ol>
          </div>

          <div>
            <p className="text-center font-semibold mb-4">Pasal 15</p>
            <p className="font-bold mb-4 text-center">Upacara Bendera</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Setiap siswa harus mengikuti upacara bendera setiap hari Senin dan upacara bendera pada hari besar nasional.</li>
              <li>Setiap siswa harus sudah siap di lapangan upacara 10 menit sebelum upacara dimulai.</li>
              <li>Petugas upacara adalah siswa kelas X, XI dan XII sesuai dengan jadwal yang berlaku.</li>
              <li>Petugas upacara harus hadir sebelum peserta upacara siap di lapangan.</li>
              <li>Petugas upacara melakukan latihan dibawah bimbingan pengurus OSIS, wali kelas dan pembina OSIS</li>
              <li>Pelaksanaan upacara sesuai dengan Tata Upacara Sipil (TUS) dan Peraturan Baris Berbaris (PBB) yang telah dikoordinasikan kepada intansi terkait.</li>
              <li>Setiap selesai upacara ketua kelas membuat laporan kehadiran siswa kepada wali kelas.</li>
              <li>Setiap siswa yang tidak dapat mengikuti upacara bendera harus lapor wali kelas.</li>
              <li>Setiap kegiatan upacara ditunjuk petugas untuk menjaga dan mengawasi keamanan kelas, dan petugas ini harus melaporkan keadaan kepada bagian kesiswaan setelah upacara selesai.</li>
              <li>Setiap siswa yang sakit saat pelaksaan upacara bendera harus berada di UKS.</li>
              <li>Setiap siswa yang tidak mengikuti upacara bendera tanpa pemberitahuan, harus membuat surat pernyataan.</li>
              <li>Selama pelaksanaan upacara bendera di dampingi oleh petugas PMR.</li>
            </ol>
          </div>

          <div>
            <p className="text-center font-semibold mb-4">Pasal 16</p>
            <p className="font-bold mb-4 text-center">Kegiatan ekstrakurikuler</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Setiap siswa wajib mengikuti minimal dua kegiatan ekstrakurikuler yang berlaku di sekolah.</li>
              <li>Siswa diberikan kebebasan untuk mengikuti kegiatan ekstrakurikuler sesuai pilihan siswa.</li>
              <li>Siswa wajib mengikuti kegiatan ekstrakurikuler wajib yang ditentukan pemerintah yaitu Pramuka.</li>
              <li>Pemilihan kegiatan ekstrakurikuler dilakukan saat awal tahun pembelajaran.</li>
              <li>Siswa dibolehkan pindah pilihan ekstrakurikuler pada saat awal semester.</li>
              <li>Siswa yang pindah pilihan ekstrakurikuler harus melapor pada guru pembina dan koordinator ekstrakurikuler.</li>
              <li>Siswa kelas XII untuk semester genap diperbolehkan tidak mengikuti ekstrakurikuler.</li>
              <li>Siswa yang tidak hadir selama 4 kali berturut turut tanpa ada pemberitahuan dinyatakan keluar dari program ekstrakurikuler dan kepadanya tidak mendapatkan nilai.</li>
              <li>Nilai ekstrakurikuler diberikan oleh pembina dan berupa nilai kualitatif.</li>
              <li>Kegiatan ekstrakurikuler yang memerlukan sarana habis pakai, pengadaannya ditanggung oleh peserta ekstrakurikuler.</li>
              <li>Seragam yang diperlukan dalam kegiatan ekstrakurikuler sesuai kegiatan yang ikuti ditanggung oleh peserta.</li>
              <li>Kegiatan ekstrakurikuler dilaksanakan sesuai jadwal yang berlaku atau menyesuaikan berdasarkan kesepakatan antara pembina dengan peserta ekstrakurikuler.</li>
            </ol>
          </div>

          <div>
            <p className="text-center font-semibold mb-4">Pasal 17</p>
            <p className="font-bold mb-4 text-center">Perlombaan</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Setiap lomba yang akan diikuti oleh siswa harus sesuai dengan rekomendasi yang dikeluarkan oleh kepala sekolah.</li>
              <li>Setiap lomba yang diikuti di luar sekolah harus melalui seleksi internal terlebih dahulu.</li>
              <li>Setiap siswa yang mengikuti perlombaan diluar sekolah harus atas nama sekolah.</li>
              <li>Sekolah akan memfasilitasi siswa sesuai kemampuan sekolah.</li>
              <li>Semua hasil yang didapatkan dari lomba adalah milik sekolah (piala, piagam, sertifikat, medali, maupun berupa barang).</li>
              <li>Hasil lomba berupa uang akan diserahkan untuk sekolah sebesar 25% (untuk individu atau dua orang) dan 75% untuk siswa peserta lomba. Sementara hasil lomba berupa uang akan diserahkan untuk sekolah sebesar 15% (untuk kelompok tiga orang atau lebih) dan 85% untuk siswa peserta lomba. Uang yang diserahkan untuk sekolah 25 % dan 15% dipergunakan untuk:</li>
              <ul className="list-disc pl-6 space-y-1">
                <li>Pendaftaran kegiatan lomba.</li>
                <li>Subsidi pembiyaan keberangkatan siswa dalam mengikuti Lomba</li>
                <li>Membayar pembina profesional lomba dari luar.</li>
              </ul>
              <li>Sekolah akan memberikan piagam atau sertifikat sebagai pengganti piala yang diperoleh siswa.</li>
              <li>Siswa dapat membuat piala duplikat sendiri sesuai hasil lomba yang diperoleh</li>
              <li>Lomba yang diikuti siswa harus sepengetahuan dan dalam arahan koordinator lomba atau guru mata pelajaran yang telah ditunjuk.</li>
            </ol>
          </div>

          <div>
            <p className="text-center font-semibold mb-4">Pasal 18</p>
            <p className="font-bold mb-4 text-center">Kegiatan diluar Program Sekolah</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Setiap siswa yang melakukan kegiatan di luar sekolah adalah atas nama sekolah.</li>
              <li>Setiap siswa yang melakukan kegiatan di luar sekolah harus membuat laporan kepada sekolah.</li>
              <li>Setiap siswa yang mengikuti pertukaran pelajar harus mengajukan permohonan izin cuti belajar kepada sekolah, yang diketahui orang tua.</li>
              <li>Setiap siswa yang mengikuti pertukaran pelajar harus atas nama sekolah.</li>
              <li>Setiap siswa yang mengikuti kegiatan pertukaran pelajar harus menyelesaikan urusan administrasi selama melakukan cuti belajar.</li>
              <li>Setiap siswa yang mengikuti pertukaran pelajar dihitung kedudukan kelasnya tetap sebagaimana saat izin cuti.</li>
              <li>Setiap siswa yang mengikuti pertukaran pelajar harus membuat laporan secara lisan maupun tertulis kepada sekolah.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-bold text-center mb-2">BAB VIII SARANA PRASARANA</h3>
            <p className="text-center font-semibold mb-4">Pasal 19</p>
            <p className="font-bold mb-4 text-center">Penggunaan Sarana Prasarana</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Setiap menggunakan sarana prasarana sekolah harus melapor wakil kepala sekolah bidang sarana prasarana atau yang ditunjuk sebagai koordinator bagian sarana prasarana.</li>
              <li>Setiap akan memakai sarana untuk keperluan belajar harus sepengetahuan guru mata pelajaran dan wakil kepala sekolah bidang sarana prasarana.</li>
              <li>Selesai menggunakan sarana harus dikembalikan sesuai saat meminjam kepada wakil kepala sekolah bidang sarana prasarana.</li>
              <li>Penggunaan sarana khusus harus mengikuti ketentuan khusus yang berlaku (kunci, bengkel, GPS, Kompas dan lain-lain).</li>
              <li>Setiap siswa yang menghilangkan atau merusakkan sarana sekolah secara sengaja maupun tidak disengaja harus mengganti barang yang sama atau uang seharga barang tersebut.</li>
              <li>Setiap sarana yang dipinjam harus dikembalikan sebagaimana saat meminjam.</li>
            </ol>
          </div>

          <div>
            <p className="text-center font-semibold mb-4">Pasal 20</p>
            <p className="font-bold mb-4 text-center">Pemakaian barang pribadi</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Setiap siswa wajib menjaga keamanan barang pribadi masing masing.</li>
              <li>Setiap terjadi kehilangan barang harus segera melapor kepada sekolah (wakil kepala sekolah bidang kesiswaan).</li>
              <li>Sekolah tidak bertanggung jawab terhadap kehilangan barang siswa.</li>
              <li>Siswa tidak dibolehkan memainkan alat musik di kelas diluar jam kesenian.</li>
              <li>Siswa tidak dibolehkan mengaktifkan hand phone (HP), walk man dan atau alat elektronik lainnya selama proses pembelajaran kecuali atas izin guru mata Pelajaran.</li>
              <li>Siswa dibolehkan membawa laptop/komputer jinjing dan penggunaan laptop siswa untuk mendukung proses pembelajaran.</li>
              <li>Siswa tidak boleh membawa dan atau menggunakan barang terlarang seperti video porno, rokok, narkoba, gambar porno, minuman beralkohol, senjata tajam dan lain lain yang ke arah negatif.</li>
              <li>Siswa tidak boleh memakai jaket selama proses pembelajaran kecuali dalam kondisi tertentu.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-bold text-center mb-2">BAB IX KETERTIBAN, KEAMANAN DAN KEBERSIHAN LINGKUNGAN</h3>
            <p className="text-center font-semibold mb-4">Pasal 21</p>
            <p className="font-bold mb-4 text-center">Ketertiban dan Keamanan</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Siswa wajib menjaga ketertiban dan keamanan lingkungan sekolah.</li>
              <li>Siswa tidak dibolehkan berteriak nyaring dan atau membunyikan alat musik atau sejenisnya di lingkungan sekolah yang dapat mengganggu ketenangan lingkungan sekolah.</li>
              <li>Siswa tidak boleh merusak, mencoret-coret fasilitas sekolah sehingga mengurangi fungsinya.</li>
            </ol>
          </div>

          <div>
            <p className="text-center font-semibold mb-4">Pasal 22</p>
            <p className="font-bold mb-4 text-center">Kebersihan lingkungan sekolah</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Setiap siswa wajib menjaga kebersihan lingkungan sekolah.</li>
              <li>Setiap siswa wajib membersihkan ruang kelas sesuai dengan jadwal piket kelas yang berlaku.</li>
              <li>Siswa wajib membuang sampah pada tempat yang telah ditentukan.</li>
              <li>Siswa ketahuan membuang sampah tidak pada tempatnya/sembarangan ID card disita oleh pihak sekolah.</li>
              <li>Jika siswa tidak memiliki ID card, akan diberikan sanksi kerja sosial selama jam sekolah berlangsung.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-bold text-center mb-2">BAB X PELANGGARAN DAN SANKSI</h3>
            <p className="text-center font-semibold mb-4">Pasal 23</p>
            <p className="font-bold mb-4 text-center">Jenis Pelanggaran dan sanksi</p>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Setiap siswa yang melakukan pelanggaran tata tertib yang berlaku akan diberikan sanksi sesuai ketentuan yang ada.</li>
              <li>Setiap pelanggaran yang dilakukan siswa dibukukan dalam buku pelanggaran.</li>
              <li>Mekanisme pemberian sanksi disesuaikan dengan jenis dan bobot pelanggaran yang dilakukan.</li>
              <li>Setiap siswa yang melakukan pelanggaran akan diberikan pembinaan oleh wali kelas, guru bimbingan konseling, guru mata pelajaran maupun wakil kepala sekolah bagian kesiswaan.</li>
              <li>Kriteria pelangaran dibagi atas pelanggaran ringan, pelanggaran sedang, pelanggaran berat.</li>
              <li>Pelanggaran kategori ringan di sekolah dapat diberi sanksi langsung oleh guru, wali kelas, pembina, staff kesiswaan, membersihkan lingkungan sekitar, push-up ringan, lari ringan, dipulangkan dan di alfa serta pelanggaran lain yang dianggap relevan.</li>
              <li>Pelanggaran sedang dan berat dilanjutkan dan diproses oleh Wali Kelas dengan Staff Kesiswaan, Guru Bimbingan Konseling dan Waka Kesiswaan untuk diberikan sanksi sesuai ketentuan yang berlaku.</li>
            </ol>

            <div className="overflow-x-auto my-6 border border-slate-300 rounded-lg shadow-inner">
              <table className="w-full text-[10px] md:text-xs border-collapse min-w-[600px]">
                <thead className="bg-slate-100 font-bold uppercase sticky top-0">
                  <tr>
                    <th className="border border-slate-300 p-2 text-center w-8">NO</th>
                    <th className="border border-slate-300 p-2 text-left">JENIS PELANGGARAN</th>
                    <th className="border border-slate-300 p-2 text-left">SANKSI BERUPA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-50 font-bold">
                    <td className="border border-slate-300 p-2 text-center">A</td>
                    <td colSpan={2} className="border border-slate-300 p-2">Pelanggaran Ringan</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">1</td>
                    <td className="border border-slate-300 p-2">Tidak mengikuti kegiatan yang diprogramkan sekolah tanpa izin (upacara, kegiatan OSIS, ekstrakurikuler, kokurikuler dan kegiatan sejenisnya)</td>
                    <td className="border border-slate-300 p-2">Diberi teguran dan pembinaan secara lisan</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">2</td>
                    <td className="border border-slate-300 p-2">Tidak memakai seragam sesuai ketentuan yang berlaku (atribut, model pakaian, sepatu, jilbab dan sejenisnya)</td>
                    <td className="border border-slate-300 p-2">Teguran secara lisan 2 kali dan dicatat, selebihnya pemanggilan orang tua. Atau jika sepatu tidak sesuai akan disita 1 minggu. Jika diulang lagi sita 2 minggu dst.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">3</td>
                    <td className="border border-slate-300 p-2">Tidak peduli terhadap lingkungan (membuang sampah sembarangan, membuang sampah di laci meja belajar, tidak menjaga kebersihan lingkungan dan perbuatan sejenisnya)</td>
                    <td className="border border-slate-300 p-2">Diberi teguran lisan, membersihkan minimal lingkungan sekitar kelasnya.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">4</td>
                    <td className="border border-slate-300 p-2">Makan dan minum dalam ruang kelas (Kecuali air mineral sesuai izin guru)</td>
                    <td className="border border-slate-300 p-2">Diberi teguran lisan dan melanjutkan makan dan minum di tengah lapangan</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">5</td>
                    <td className="border border-slate-300 p-2">Berpenampilan tidak sesuai dengan ketentuan (pakaian tidak rapi, memakai aksesoris atau perhiasan, potongan rambut, dan penampilan sejenisnya)</td>
                    <td className="border border-slate-300 p-2">Rambut dicukur di tempat kemudian untuk aksesoris disita dan tidak dikembalikan</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">6</td>
                    <td className="border border-slate-300 p-2">Mengaktifkan Laptop, hand phone dan atau alat elektronik yang tidak sesuai dengan ketentuan serta digunakan untuk aktifitas negatif (diaktifkan dan digunakan saat proses pembelajaran, tanpa seijin guru)</td>
                    <td className="border border-slate-300 p-2">Diberi teguran secara lisan serta alat elektronik yang digunakan disita selama 1 minggu</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">7</td>
                    <td className="border border-slate-300 p-2">Mengotori dan mencoret coret fasilitas sekolah</td>
                    <td className="border border-slate-300 p-2">Diberi teguran secara lisan kemudian mengembalikan fasilitas sekolah seperti kondisi semula atau mengganti fasilitas dengan unit yang baru</td>
                  </tr>
                  
                  <tr className="bg-amber-50 font-bold">
                    <td className="border border-slate-300 p-2 text-center">B</td>
                    <td colSpan={2} className="border border-slate-300 p-2">Pelanggaran Sedang</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">1</td>
                    <td className="border border-slate-300 p-2">Merusakkan dan/atau menghilangkan sarana sekolah</td>
                    <td className="border border-slate-300 p-2">Mengganti sarana sekolah dengan yang baru serta mendapat SP 1 dengan durasi 3 bulan.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">2</td>
                    <td className="border border-slate-300 p-2">Merokok, bertindik, keluar masuk lingkungan sekolah tanpa melalui pintu gerbang atau lompat pagar, dan pelanggaran sejenisnya.</td>
                    <td className="border border-slate-300 p-2">Pemanggilan orang tua, pembinaan dari BK/Wali Kelas/Kesiswaan kemudian diberikan SP 1 dengan durasi 3 bulan.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">3</td>
                    <td className="border border-slate-300 p-2">Bergaul dengan lawan jenis berlebihan (berduaan di lingkungan sekolah) dan melakukan perundungan menyangkut unsur SARA</td>
                    <td className="border border-slate-300 p-2">Pemanggilan orang tua, pembinaan dari BK/Wali Kelas/Kesiswaan, diberikan SP 1 dengan durasi 3 bulan.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">4</td>
                    <td className="border border-slate-300 p-2">Mengulangi pelanggaran tingkat sedang dalam masa SP 1</td>
                    <td className="border border-slate-300 p-2">Mendapat SP 2 dengan durasi 6 bulan</td>
                  </tr>

                  <tr className="bg-red-50 font-bold">
                    <td className="border border-slate-300 p-2 text-center">C</td>
                    <td colSpan={2} className="border border-slate-300 p-2">Pelanggaran Berat</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">1</td>
                    <td className="border border-slate-300 p-2">Memalsukan dokumen resmi (tanda tangan, piagam dan sejenisnya) sehingga menyebabkan pencemaran nama baik sekolah dan/atau kerugian materil sekolah</td>
                    <td className="border border-slate-300 p-2">Pemanggilan orang tua, pembinaan oleh BK/Kesiswaan dan diberikan SP 2 selama 6 bulan</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">2</td>
                    <td className="border border-slate-300 p-2">Membawa, memakai dan atau Mengedarkan dan menyimpan file film porno, buku porno, senjata tajam atau senjata api, mencuri, memeras orang lain, berjudi, berkelahi, melakukan kekerasan fisik dan psikis dan pelanggaran sejenisnya</td>
                    <td className="border border-slate-300 p-2">Pemanggilan orang tua, pembinaan oleh BK/Kesiswaan dan diberikan SP 2 selama 6 bulan.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">3</td>
                    <td className="border border-slate-300 p-2">Menghina, mengancam, menganiaya guru, karyawan atau kepala sekolah.</td>
                    <td className="border border-slate-300 p-2">Pemanggilan orang tua, pembinaan oleh BK/Kesiswaan dan diberikan SP 2 selama 6 bulan.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">4</td>
                    <td className="border border-slate-300 p-2">Membawa, memakai dan atau Mengedarkan narkoba, melakukan pelecehan seksual, hamil, menikah dan perbuatan amoral (berciuman, berpelukan, bermesraan, berhubungan seksual dengan lawan jenis kelamin/sesame jenis).</td>
                    <td className="border border-slate-300 p-2">Mendapat SP 3 diberikan surat mutasi (pindah sekolah)/tidak naik kelas (untuk yang kelas 12 penundaan kelulusan selama 1 tahun).</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 text-center">5</td>
                    <td className="border border-slate-300 p-2">Melakukan pelanggaran tingkat sedang maupun berat dalam masa SP 2.</td>
                    <td className="border border-slate-300 p-2">Mendapat SP 3 diberikan surat mutasi (pindah sekolah)/tidak naik kelas (untuk yang kelas 12 penundaan kelulusan selama 1 tahun).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <p className="font-bold text-center mb-4">9. Pemberian SURAT PERINGATAN (SP)</p>
            <ol className="list-[lower-alpha] pl-6 space-y-2">
              <li>Melakukan pelanggaran ringan berkali-kali, kemudian atas rekomendasi wali kelas, diberikan SP 1.</li>
              <li>Melakukan pelanggaran sedang, diberikan SP 1.</li>
              <li>Status  SP  1  akan  tetap  melekat  pada  siswa  selama  3 bulan sejak SP 1 diberikan, dan apabila melakukan pelanggaran baik sedang maupun berat lagi akan diberikan SP tingkat selanjutnya.</li>
              <li>Melakukan pelanggaran berat, diberikan SP 2 dengan waktu 6 bulan sejak diberikan atau SP 3 sesuai dengan dan ketentuan yang berlaku.</li>
              <li>Tingkatan SP 1 dan SP 2 berlaku hanya selama waktu yang ditentukan yaitu 3 bulan dan 6 bulan. </li>
              <li>Siswa yang mendapat SP 3 diberikan surat mutasi (pindah sekolah)/tidak naik kelas (untuk yang kelas 12 penundaan kelulusan selama 1 tahun).</li>
            </ol>
          </div>

          <div>
            <h3 className="font-bold text-center mb-2">BAB XI MUTASI SEKOLAH</h3>
            <p className="text-center font-semibold mb-4">Pasal 24</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Setiap siswa yang hendak mutasi ke sekolah lain, maka orang tua harus membuat surat permohonan kepada sekolah.</li>
              <li>Setiap siswa yang hendak mutasi ke sekolah lain harus menyelesaikan segala urusan administrasi di sekolah.</li>
              <li>Setiap siswa yang melakukan mutasi dan atau melanjutkan pendidikan yang lebih tinggi sebelum mengikuti ujian akhir dan atau mendapatkan ijazah sebagai tanda lulus sekolah adalah termasuk kategori mutasi.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-bold text-center mb-2">BAB XII REMISI</h3>
            <p className="text-center font-semibold mb-4">Pasal 25</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Kepala sekolah memberikan remisi atas usulan Wakil Kepala Sekolah Kesiswaan selaku pembina ketertiban peserta didik.</li>
              <li>Peserta didik yang berhak mendapat remisi adalah peserta didik yang telah menunjukkan adanya perubahan sikap, perilaku dan tidak melakukan pelanggaran sama sekali.</li>
              <li>Remisi tidak berlaku bagi peserta didik yang berada pada jenjang peringatan terakhir/dikembalikan pada orang tua.</li>
              <li>Remisi diberikan diakhir tahun pembelajaran dengan ketentuan diatur oleh kepala sekolah.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-bold text-center mb-2">BAB XIII PENGHARGAAN</h3>
            <p className="text-center font-semibold mb-4">Pasal 26</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Peserta didik yang memiliki prestasi akan diberikan penghargaan oleh sekolah.</li>
              <li>Jenis-jenis prestasi yang diberikan penghargaan sebagai berikut:</li>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>Akademik peringkat 1 sampai 3 di tiap rombel yang diikutinya</li>
                <li>Peringkat 1 sampai 3 paralel pertingkat setiap kompetensi kejuruan</li>
                <li>Non akademik: Olahraga/seni minimal juara tingkat Kecamatan.</li>
                <li>Aktivis kelembagaan pelajar.</li>
                <li>Peserta didik yang berjasa bagi sekolah.</li>
                <li>Peserta didik yang berprilaku terpuji.</li>
                <li>Peserta didik yang rajin beribadah.</li>
              </ul>
              <li>Penerima penghargaan ditetapkan oleh kepala sekolah berdasarkan usulan pendidik/tenaga kependidikan</li>
              <li>Bentuk dan besarnya penghargaan akan ditentukan sesuai kebijakan kepala sekolah</li>
            </ol>
          </div>

          <div>
            <h3 className="font-bold text-center mb-2">BAB XIV KENDARAAN BERMOTOR</h3>
            <p className="text-center font-semibold mb-4">Pasal 27</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Kendaraan bermotor harus dilengkapi dengan kelengkapan utama seperti spion, lampu utama, lampu rating, dan lain-lain.</li>
              <li>Mengendarai kendaraan bermotor wajib memakai helm baik yang mengendarai maupun yang dibonceng. Baik saat di sekolah maupun di luar sekolah.</li>
              <li>Kendaraan bermotor tidak diperkenankan memakai kenalpot racing atau yang membuat bunyi bising sehingga mengganggu ketenteraman dan kenyamanan masyarakat.</li>
              <li>Parkir pada tempatnya dengan teratur, tertib dan rapih.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-bold text-center mb-2">BAB XV HANDPHONE DAN BARANG BERHARGA</h3>
            <p className="text-center font-semibold mb-4">Pasal 28</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Ketika belajar handphone tidak boleh dipergunakan, kecuali seijin dari guru mata pelajaran untuk mengakses materi atau bahan belajar.</li>
              <li>Sebelum masuk kelas di jam ke nol semua handphone atau barang berharga harus dikumpulkan dan diserahkan kepada guru piket atau wali kelas.</li>
              <li>Jika handphone atau barang berharga tidak dikumpulkan sebelum masuk kelas, maka ketika handphone atau barang berharga hilang bukan tanggung jawab sekolah.</li>
            </ol>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-300">
            <h3 className="font-bold text-center mb-2">BAB XVI PENUTUP</h3>
            <p className="text-center font-semibold mb-4">Pasal 29</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Peraturan tata tertib ini berlaku untuk semua siswa SMK Negeri 1 Bunyu.</li>
              <li>Apabila dipandang perlu tata tertib ini dapat dilakukan perbaikan sebagaimana mestinya.</li>
              <li>Peraturan ini berlaku sejak ditetapkan oleh Kepala Sekolah.</li>
            </ol>
          </div>

          {/* Validation / Signature Section */}
          <div className="mt-16 flex flex-col md:flex-row justify-between pt-8 border-t border-slate-200">
            <div className="mb-8 md:mb-0">
              <p className="text-sm font-bold uppercase mb-16">Mengetahui/Menyetujui,</p>
              <p className="text-sm border-b border-black w-fit font-bold min-w-[200px]">Komite Sekolah</p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm mb-1">Bunyu, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="text-sm font-bold uppercase mb-2">Kepala Sekolah,</p>
              
              <div className="h-32 flex items-center justify-center md:justify-end py-2">
                {signature && (
                  <img src={signature} alt="Tanda Tangan & Stempel" className="max-h-full object-contain" />
                )}
                {!signature && <div className="h-20"></div>}
              </div>
              
              <p className="text-sm font-black border-b border-black inline-block min-w-[240px]">{principalName}</p>
              <p className="text-xs font-bold mt-1 text-slate-700">{principalNip}</p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
