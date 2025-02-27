"use client";
import { useState, useEffect } from "react";

const steps = [
  { id: 1, title: "Step 1: Personal Info", component: PersonalInfo },
  { id: 2, title: "Step 2: Preferences", component: Preferences },
  { id: 3, title: "Step 3: Summary", component: Summary },
];

export default function ProgressiveForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", gender: "", preference: "" });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("appData"));
    if (savedData) {
      // Get the last user ID and increment it
      const newUserId = savedData.userCount + 1;
      setUserId(newUserId);
      
      // Restore form data if available
      if (savedData.user?.formProgress) {
        setStep(savedData.user.formProgress.step);
        setFormData(savedData.user.formProgress.formData);
      }
    } else {
      // Initialize with user ID 1 if no previous data exists
      setUserId(1);
    }
  }, []);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("appData")) || {};
    
    // If no userCount exists, initialize it
    const userCount = existingData.userCount || 0;
    
    const updatedData = {
      ...existingData,
      userCount: userCount + 1, // Increment user count
      user: {
        ...existingData.user,
        [userId]: {
          formProgress: {
            step,
            formData
          }
        }
      }
    };
    
    localStorage.setItem("appData", JSON.stringify(updatedData));
  }, [formData, step, userId]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const CurrentStepComponent = steps.find((s) => s.id === step)?.component || null;
  const progressPercentage = ((step - 1) / (steps.length - 1)) * 100;
  
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{steps[step - 1]?.title}</h2>

      {CurrentStepComponent && (
        <CurrentStepComponent formData={formData} setFormData={setFormData} />
      )}

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={prevStep}>
            Back
          </button>
        )}
        {step < steps.length ? (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={nextStep}>
            Next
          </button>
        ) : (
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

function PersonalInfo({ formData, setFormData }) {
  return (
    <div>
      <label className="block text-gray-700">Name:</label>
      <input
        type="text"
        className="w-full border rounded p-2 mt-2"
        value={formData.name}
        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} 
      />

      <label className="block text-gray-700 mt-4">Gender:</label>
      <div className="flex gap-2 mt-2">
        <button
          className={`px-4 py-2 rounded ${
            formData.gender === "Male" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFormData((prev) => ({ ...prev, gender: "Male" }))}>
          Male
        </button>
        <button
          className={`px-4 py-2 rounded ${
            formData.gender === "Female" ? "bg-pink-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFormData((prev) => ({ ...prev, gender: "Female" }))}>
          Female
        </button>
      </div>
    </div>
  );
}

function Preferences({ formData, setFormData }) {
  return (
    <div>
      <label className="block text-gray-700">Preference:</label>
      <div className="flex gap-2 mt-2">
        <button
          className={`px-4 py-2 rounded ${
            formData.preference === "Fitness" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFormData((prev) => ({ ...prev, preference: "Fitness" }))}>
          Fitness
        </button>
        <button
          className={`px-4 py-2 rounded ${
            formData.preference === "Technology" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFormData((prev) => ({ ...prev, preference: "Technology" }))}>
          Technology
        </button>
      </div>
    </div>
  );
}

function Summary({ formData }) {
  return (
    <div>
      <h3 className="text-lg font-semibold">Review Your Info</h3>
      <p className="mt-2">Name: {formData.name || "Not provided"}</p>
      <p>Gender: {formData.gender || "Not selected"}</p>
      <p>Preference: {formData.preference || "Not selected"}</p>
    </div>
  );
}
