import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import { CalendarDays, BookOpen, Clock, AlertCircle, ArrowUpRight, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyLectures();
  }, []);

  const fetchMyLectures = async () => {
    try {
      const res = await API.get(`/lectures/instructor/${user.id}`);
      setLectures(res.data);
    } catch (error) {
      console.error("Failed to fetch lectures:", error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingLectures = lectures.filter((l) => new Date(l.date) >= new Date());
  const completedLectures = lectures.filter((l) => new Date(l.date) < new Date());

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Welcome back, {user?.name || "Instructor"}!
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Here is your lecture schedule and overview for today.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-xl text-xs font-semibold text-indigo-700 w-fit self-start sm:self-center">
            <TrendingUp size={14} />
            <span>Active Term Schedule</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200/60 p-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 animate-pulse"></div>
                  <div className="h-4 w-24 bg-slate-100 rounded animate-pulse"></div>
                </div>
                <div className="h-8 w-16 bg-slate-100 rounded animate-pulse mt-2"></div>
              </div>
            ))
          ) : (
            <>
              {/* Total Lectures */}
              <div className="group bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shadow-sm">
                    <CalendarDays size={20} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider">Total Lectures</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-800 leading-none">{lectures.length}</span>
                  <span className="text-xs font-medium text-slate-400">assigned</span>
                </div>
              </div>

              {/* Upcoming */}
              <div className="group bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shadow-sm">
                    <BookOpen size={20} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider">Upcoming</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-800 leading-none">{upcomingLectures.length}</span>
                  <span className="text-xs font-medium text-slate-400">scheduled</span>
                </div>
              </div>

              {/* Completed */}
              <div className="group bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl shadow-sm">
                    <Clock size={20} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider">Completed</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-800 leading-none">{completedLectures.length}</span>
                  <span className="text-xs font-medium text-slate-400">delivered</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Lectures List Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Lecture List & Schedule</h3>
          <span className="text-xs font-medium text-slate-400">{lectures.length} total entries</span>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 flex gap-4">
              <div className="h-4 w-1/4 bg-slate-100 rounded animate-pulse"></div>
              <div className="h-4 w-1/4 bg-slate-100 rounded animate-pulse"></div>
              <div className="h-4 w-1/4 bg-slate-100 rounded animate-pulse"></div>
              <div className="h-4 w-1/4 bg-slate-100 rounded animate-pulse"></div>
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-6 border-b border-slate-100 flex gap-4 last:border-b-0">
                <div className="h-5 w-1/3 bg-slate-100/70 rounded animate-pulse"></div>
                <div className="h-5 w-1/4 bg-slate-100/70 rounded animate-pulse"></div>
                <div className="h-5 w-1/6 bg-slate-100/70 rounded animate-pulse"></div>
                <div className="h-5 w-1/12 bg-slate-100/70 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : lectures.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center shadow-sm flex flex-col items-center justify-center gap-4 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
              <AlertCircle size={28} className="text-slate-400" />
            </div>
            <div>
              <p className="text-slate-800 font-bold text-base">No lectures assigned yet</p>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                Once administrator schedules or assigns lectures to your profile, they will appear here dynamically.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Lecture</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Batch</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lectures.map((lecture) => {
                    const isPast = new Date(lecture.date) < new Date();
                    return (
                      <tr key={lecture._id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors block">
                            {lecture.title}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-600">
                            {lecture.course?.name || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-500 font-medium">
                            {new Date(lecture.date).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-500 font-medium bg-slate-100/60 px-2.5 py-1 rounded-lg">
                            {lecture.time || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 font-semibold">
                            {lecture.batch}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                            isPast 
                              ? "bg-slate-100 text-slate-500" 
                              : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              isPast ? "bg-slate-400" : "bg-emerald-500"
                            }`}></span>
                            {isPast ? "Completed" : "Upcoming"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
