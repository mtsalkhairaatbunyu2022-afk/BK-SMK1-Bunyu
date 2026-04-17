import { ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4">
      <div className="relative overflow-hidden bg-white rounded-3xl shadow-2xl border border-slate-100">
        {/* Decor background elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        
        <div className="relative p-8 md:p-20 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-8">
              <BookOpen size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Sistem Administrasi BK</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-tight mb-12">
              BK SMKN 1 <span className="text-blue-600 italic">BUNYU</span>
            </h1>
            
            <button
              onClick={() => onNavigate('data-siswa')}
              className="group relative inline-flex items-center px-16 py-6 bg-blue-600 text-white font-black text-2xl rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">MULAI MASUK</span>
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform relative z-10" size={28} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
