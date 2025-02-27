"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/userpanel/sidebar";

function Account() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve the saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem("appData"));
    
    if (savedData?.user?.formProgress?.formData) {
      setUserData(savedData.user.formProgress.formData);
    }
  }, []);

  return (
    <div className="bg-[#000000] flex w-full min-h-screen">
      <div className="sm:w-3/4 w-full flex flex-col lg:flex-row lg:space-x-3 lg:space-x-reverse px-1 space-y-3 lg:space-y-0">
        <div className="lg:w-1/5">
          <Sidebar />
        </div>
        <div className="lg:w-4/5 flex items-center justify-center pr-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Account Details</h2>
            
            {userData ? (
              <div className="text-gray-700">
                <p><strong>Name:</strong> {userData.name || "Not provided"}</p>
                <p><strong>Gender:</strong> {userData.gender || "Not selected"}</p>
                <p><strong>Preference:</strong> {userData.preference || "Not selected"}</p>
              </div>
            ) : (
              <p className="text-gray-500">No details found. Please complete the form.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
