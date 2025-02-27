"use client";
import React, { useState, useEffect } from 'react';

function NewExerciseForm() {
  const [formData, setFormData] = useState({
    exerciseName: '',
    details: '',
  });

  useEffect(() => {
    // Fetch exercise name from localStorage
    const storedName = localStorage.getItem('name'); // Assuming the name is saved in localStorage
    if (storedName) {
      setFormData(prevState => ({
        ...prevState,
        exerciseName: storedName, // Set the exercise name fetched from localStorage
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Save the form data in localStorage
    localStorage.setItem('exerciseName', formData.exerciseName);
    localStorage.setItem('exerciseDetails', formData.details);

    console.log('Data saved to localStorage:', {
      exerciseName: formData.exerciseName,
      exerciseDetails: formData.details
    });
  };

  return (
    <div className="flex flex-col items-center mt-5 w-full">
      {/* Exercise Name Field */}
      <label className='text-white'>Exercise Name:</label>
      <input
        type="text"
        name="exerciseName"
        placeholder="Enter exercise name"
        value={formData.exerciseName}
        onChange={handleChange}
        className="mb-4 p-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border border-gray-300 rounded"
      />

      {/* Exercise Details Field */}
      <label className='text-white'>Details:</label>
      <input
        type="text"
        name="details"
        placeholder="Explain the exercise"
        value={formData.details}
        onChange={handleChange}
        className="mb-4 p-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border border-gray-300 rounded"
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="py-2 px-5 bg-red-800 text-white rounded-md"
      >
        Save
      </button>
    </div>
  );
}

export default NewExerciseForm;
