import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import { CalendarDays, BookOpen, Clock } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">My Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">Your assigned lectures</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <CalendarDays size={20} className="text-indigo-600" />
              </div>
              <p className="text-sm text-gray-500">Total Lectures</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{lectures.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-50 rounded-lg">
                <BookOpen size={20} className="text-green-600" />
              </div>
              <p className="text-sm text-gray-500">Upcoming</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {lectures.filter((l) => new Date(l.date) >= new Date()).length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Clock size={20} className="text-orange-600" />
              </div>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {lectures.filter((l) => new Date(l.date) < new Date()).length}
            </p>
          </div>
        </div>

        {/* Lectures List */}
        {loading ? (
          <p className="text-gray-400">Loading your lectures...</p>
        ) : lectures.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <CalendarDays size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No lectures assigned yet</p>
            <p className="text-sm text-gray-400">Your assigned lectures will appear here</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Lecture</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Course</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Batch</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lectures.map((lecture) => {
                  const isPast = new Date(lecture.date) < new Date();
                  return (
                    <tr key={lecture._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{lecture.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{lecture.course?.name || "N/A"}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{new Date(lecture.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{lecture.time || "-"}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{lecture.batch}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${isPast ? "bg-gray-100 text-gray-500" : "bg-green-50 text-green-600"}`}>
                          {isPast ? "Completed" : "Upcoming"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
