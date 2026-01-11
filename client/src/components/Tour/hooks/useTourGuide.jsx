import { useState } from "react";
import { Tour } from "antd";

export const useTourGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [steps, setSteps] = useState([]);

  const startTour = (newSteps) => {
    setSteps(newSteps);
    setIsOpen(true);
  };

  const TourGuide = () => (
    <Tour
      open={isOpen}
      onClose={() => setIsOpen(false)}
      steps={steps}
      maskClosable={false}
      arrow
    />
  );

  return { startTour, TourGuide };
};
