import React, { useState, useEffect } from 'react';
import { Plus, BookOpen, Search, MoreVertical } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import api from '../services/api';

interface Subject {
  _id: string;
  name: string;
  code: string;
  branch: string;
  semester: number;
}

const Subjects: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', code: '', branch: '', semester: 1, description: '' });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const { data } = await api.get('/subjects');
      setSubjects(data);
    } catch (error) {
      console.error('Failed to fetch subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/subjects', formData);
      setShowModal(false);
      fetchSubjects();
      setFormData({ name: '', code: '', branch: '', semester: 1, description: '' });
    } catch (error) {
      alert('Failed to create subject. Make sure the code is unique.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Subjects</h2>
          <p className="text-gray-400">Manage learning branches and curriculum subjects.</p>
        </div>
        {user?.role === 'admin' && (
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            <span>Add Subject</span>
          </button>
        )}
      </div>

      <div className="bg-dark-card border border-gray-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-800 flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search subjects..." 
              className="w-full bg-dark-bg border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-bg text-gray-400 text-sm border-b border-gray-800">
                <th className="p-4 font-medium">Subject Name</th>
                <th className="p-4 font-medium">Code</th>
                <th className="p-4 font-medium">Branch</th>
                <th className="p-4 font-medium">Semester</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading subjects...</td></tr>
              ) : subjects.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No subjects found. Create one!</td></tr>
              ) : (
                subjects.map((subject) => (
                  <tr key={subject._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors text-white">
                    <td className="p-4 flex items-center space-x-3">
                      <div className="bg-blue-500/10 p-2 rounded-lg"><BookOpen className="text-blue-500" size={16} /></div>
                      <span className="font-medium">{subject.name}</span>
                    </td>
                    <td className="p-4"><span className="bg-gray-800 px-2 py-1 rounded text-xs font-mono">{subject.code}</span></td>
                    <td className="p-4">{subject.branch}</td>
                    <td className="p-4">Sem {subject.semester}</td>
                    <td className="p-4"><button className="text-gray-400 hover:text-white"><MoreVertical size={18} /></button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-dark-card border border-gray-800 rounded-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-white mb-4">Create New Subject</h3>
            <form onSubmit={handleCreateSubject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Subject Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Subject Code</label>
                  <input type="text" required value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Semester</label>
                  <input type="number" min="1" max="8" required value={formData.semester} onChange={(e) => setFormData({...formData, semester: Number(e.target.value)})} className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Branch</label>
                <select value={formData.branch} onChange={(e) => setFormData({...formData, branch: e.target.value})} className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none">
                  <option value="">Select Branch</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Save Subject</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;
