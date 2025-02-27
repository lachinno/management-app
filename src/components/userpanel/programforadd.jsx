'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Programformadd() {
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    age: '',
    height: '',
    weight: '',
    sessionCount: '',
  });
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Track the progress of the form completion
  useEffect(() => {
    setIsMounted(true);
  }, []); // This only runs once when the component is mounted

  useEffect(() => {
    // Calculate progress whenever formData changes
    const filledInputs = Object.values(formData).filter(value => value).length;
    setProgress((filledInputs / Object.keys(formData).length) * 100);
  }, [formData]); // Only runs when formData changes

  const handleSubmit = async () => {
    const LocalStorageformData = JSON.stringify(formData);
    localStorage.setItem('LocalStorageformData', LocalStorageformData);
     console.log('program submitted')
    // Redirect user to the program build page
    router.push('/userpanel/program');
  };

  if (!isMounted) return null; // Prevent rendering until the component is mounted

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="p-4 rounded-md shadow-md w-full max-w-5xl">
        <div className="flex flex-col items-center">
          <span className="text-[#E60000] text-lg pb-3">Build new program</span>
          <div className="w-[30%] bg-transparent bg-gray-600 border rounded-full h-4 mb-4">
            <div className="bg-red-700 h-4 rounded-xl" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-white">{Math.round(progress)}%</span>
        </div>
        <p className="mb-9 text-lg font-medium text-white mt-7">Please complete below details</p>
        <div className="flex flex-col md:flex-row md:justify-between gap-10 text-white">
          <div className="w-full md:w-2/5 flex flex-col">
            <label className="pb-2">Phone Number</label>
            <input
              name="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="mb-10 bg-transparent border border-[#E60000] py-1"
            />
          </div>
          <div className="w-full md:w-1/5 lg:px-8 flex flex-col">
            <label className="pb-2">Age</label>
            <input
              name="age"
              type="text"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="mb-10 bg-transparent border border-[#E60000] py-1"
            />
            <label className="pb-2">Height (cm)</label>
            <input
              name="height"
              type="text"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              className="mb-10 bg-transparent border border-[#E60000] py-1"
            />
            <label className="pb-2">Weight (kg)</label>
            <input
              name="weight"
              type="text"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="mb-10 bg-transparent border border-[#E60000] py-1"
            />
          </div>
          <div className="w-full md:w-1/5 flex flex-col">
            <label className="pb-2">Session Count</label>
            <input
              name="sessionCount"
              type="text"
              value={formData.sessionCount}
              onChange={(e) => setFormData({ ...formData, sessionCount: e.target.value })}
              className="mb-10 bg-transparent border border-[#E60000] py-1"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#E60000] text-white font-bold py-2 px-4 rounded-full flex items-center gap-2"
        >
          Submit Program
        </button>
      </div>
    </div>
  );
}

export default Programformadd;
