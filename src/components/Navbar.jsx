import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, GraduationCap } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
            <GraduationCap size={22} strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-sm tracking-tight leading-none">IdeaMagix</span>
            <span className="text-[10px] text-slate-400 font-semibold mt-1 uppercase tracking-wider">Instructor Portal</span>
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
              {user?.name?.charAt(0).toUpperCase() || "I"}
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[13px] font-semibold text-slate-800 leading-none">
                {user?.name || "Instructor"}
              </span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                {user?.email || "instructor@ideamagix.com"}
              </span>
            </div>
          </div>
          
          <div className="w-[1px] h-6 bg-slate-200"></div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
