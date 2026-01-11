import React from 'react';
import Lottie from 'lottie-react';
import underConstructionAnimation from '../../../assets/animations/under-maintenance.json'; // Adjust path as needed

const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-white px-4 py-50 text-center rounded-md shadow">
      <div className="w-full max-w-sm">
        <Lottie animationData={underConstructionAnimation} loop={true} />
      </div>
      <h1 className="text-xl font-bold text-gray-700 mt-4">Page Under Construction</h1>
      <p className="text-gray-500 mt-2">We’re working hard to bring this page to life. Please check back soon!</p>
    </div>
  );
};

export default UnderConstruction;
