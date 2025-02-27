"use client";
import React, { useState, useEffect } from 'react';

function ProgramTable() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("appData"));

    if (savedData && savedData.user) {
      const usersList = Object.keys(savedData.user).map((userId) => {
        const user = savedData.user[userId];

        if (user && user.formProgress && user.formProgress.formData) {
          return {
            id: userId,
            name: user.formProgress.formData.name || 'N/A',
            phoneNumber: user.formProgress.formData.phoneNumber || 'N/A',
            gender: user.formProgress.formData.gender || 'N/A',
            preference: user.formProgress.formData.preference || 'N/A',
          };
        }
        return null;
      }).filter(Boolean);

      setUsers(usersList);
    }
  }, []);

  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id.toString().includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Program Table</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or ID"
        className="border px-4 py-2 rounded mb-6 w-full max-w-md"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredUsers.length > 0 ? (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b px-4 py-2 text-left">ID</th>
              <th className="border-b px-4 py-2 text-left">Name</th>
              <th className="border-b px-4 py-2 text-left">Phone Number</th>
              <th className="border-b px-4 py-2 text-left">Gender</th>
              <th className="border-b px-4 py-2 text-left">Preference</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="border-b px-4 py-2">{user.id}</td>
                <td className="border-b px-4 py-2">{user.name}</td>
                <td className="border-b px-4 py-2">{user.phoneNumber}</td>
                <td className="border-b px-4 py-2">{user.gender}</td>
                <td className="border-b px-4 py-2">{user.preference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No matching data found</p>
      )}
    </div>
  );
}

export default ProgramTable;
