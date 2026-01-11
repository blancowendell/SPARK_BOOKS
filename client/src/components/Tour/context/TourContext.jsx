import React, { createContext, useContext } from "react";
import { useTourGuide } from "../hooks/useTourGuide.jsx";

const TourContext = createContext();

export const TourProvider = ({ children }) => {
  const { startTour, TourGuide } = useTourGuide();

  return (
    <TourContext.Provider value={{ startTour }}>
      {children}
      <TourGuide />
    </TourContext.Provider>
  );
};

export const useGlobalTour = () => useContext(TourContext);
