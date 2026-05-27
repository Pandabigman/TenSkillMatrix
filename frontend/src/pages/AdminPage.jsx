// pages/AdminPage.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Replace with your actual API fetch logic and include your Bearer token
        const token = localStorage.getItem('access_token');
        const response = await fetch('/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch users');
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-red-500 font-semibold bg-red-50 p-4 rounded-lg border border-red-200">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 py-10"
    >
      <div className="max-w-6xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage system access, roles, and consultant profiles.</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            + Invite User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="p-4 rounded-tl-lg">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4 text-sm text-gray-600">#{user.id}</td>
                  <td className="p-4 text-sm font-medium text-gray-900">{user.full_name}</td>
                  <td className="p-4 text-sm text-gray-500">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-md ${
                      user.is_admin ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}>
                      {user.is_admin ? 'Admin' : 'Consultant'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-md flex items-center gap-1.5 w-fit ${
                      user.is_active ? 'text-emerald-700' : 'text-red-700'
                    }`}>
                      <span className={`h-2 w-2 rounded-full ${user.is_active ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-emerald-600 hover:text-emerald-900 text-sm font-medium mr-3 transition-colors">
                      Edit
                    </button>
                    {/* Add delete logic mapped to your DELETE /users/{user_id} endpoint */}
                    <button className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors">
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {users.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No users found.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminPage;