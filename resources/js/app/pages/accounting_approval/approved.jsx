import React from "react";
import { CheckCircle } from "lucide-react";

export default function ApprovedPage({ message }) {
  const handleClose = () => {
    window.close();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-2xl font-bold text-gray-800">Approved</h1>
        <p className="mt-2 text-gray-600">{message}</p>

        <button
          onClick={handleClose}
          className="mt-6 inline-flex items-center px-6 py-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
