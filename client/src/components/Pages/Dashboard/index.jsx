import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { FaPlus } from "react-icons/fa";
import dashboardCover from '../../../assets/images/dashboard_cover.png';
import { useAuth } from "../../../api/public/auth/parts/authContext";
import { showSuccessToast } from "../../../components/ActionsCenter/Alerts/Toast";
import DashboardBoxes from '../../../components/DasboardBoxes';
import DashboardSetup from './parts/DashboardSetup';
import DashboardLayout from './parts/DashboardLayout';

const Dashboard = () => {
  const { session } = useAuth();
  const location = useLocation();
  const fullname = session?.fullname || "Guest";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [widgetType, setWidgetType] = useState('card');
  const [position, setPosition] = useState('top-left');
  const [widgets, setWidgets] = useState([]);
  const [guidelines, setGuidelines] = useState({ x: null, y: null });

  const [reloadTrigger, setReloadTrigger] = useState(Date.now());

  const fetchLayout = () => {
    setReloadTrigger(Date.now());
  };

  useEffect(() => {
    if (location.state?.justLoggedIn) {
      showSuccessToast("Login successful!");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const addWidget = (type, title) => {
    const defaultSize = { width: 300, height: 200 };
    const defaultPosition = { x: 10, y: 10 };
    const newWidget = {
      id: Date.now(),
      type,
      title,
      content: '',
      apiUrl: '',
      ...defaultSize,
      ...defaultPosition,
    };
    setWidgets(prev => [...prev, newWidget]);
  };

  const duplicateWidget = (id) => {
    const widget = widgets.find(w => w.id === id);
    if (widget) {
      const titleRegex = /(.*?)(\s(\d+))?$/;
      const match = widget.title.match(titleRegex);
      let baseName = match ? match[1].trim() : widget.title;
      const sameBaseWidgets = widgets.filter(w => w.title.startsWith(baseName));
      const numbers = sameBaseWidgets.map(w => {
        const m = w.title.match(titleRegex);
        return m && m[3] ? parseInt(m[3], 10) : 0;
      });
      const maxNumber = numbers.length ? Math.max(...numbers) : 0;
      const newNumber = maxNumber + 1;
      const newTitle = `${baseName} ${newNumber}`;
      const newWidget = {
        ...widget,
        id: Date.now(),
        x: (widget.x || 10) + 30,
        y: (widget.y || 10) + 30,
        title: newTitle,
      };
      setWidgets(prev => [...prev, newWidget]);
    }
  };


  const updateWidget = (id, updates) => {
    const newWidgets = widgets.map(w => (w.id === id ? { ...w, ...updates } : w));
    setWidgets(newWidgets);
  };

  const onDragOrResizeStop = (id, updates) => {
    updateWidget(id, updates);
    setGuidelines({ x: null, y: null });
  };

  const onDrag = (id, e, d, width, height) => {
    setGuidelines({ x: d.x, y: d.y });
  };

  const onResize = (id, e, direction, ref, delta, position) => {
    setGuidelines({ x: position.x, y: position.y });
  };

  return (
    <>
      <div className='w-full py-2 px-5 border bg-white border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md'>
        <div className='info'>
          <h1 className='text-[35px] font-black leading-10 mb-3'>
            {getGreeting()}, <br />
            {fullname}
          </h1>
          <p>Unlocking Solutions at IT's Best</p>
          <br />
          <Button className='btn-dashboard !capitalize' onClick={() => setDrawerOpen(true)}>
            <FaPlus /> Customized Dashboard
          </Button>
        </div>
        <img src={dashboardCover} className='w-[300px]' alt="Dashboard Cover" />
      </div>

      {/* <DashboardBoxes /> */}
      <div className="flex justify-center w-full overflow-x-auto px-4">
          <DashboardLayout reloadTrigger={reloadTrigger} />
      </div>


      <DashboardSetup
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        widgets={widgets}
        setWidgets={setWidgets}
        guidelines={guidelines}
        widgetType={widgetType}
        setWidgetType={setWidgetType}
        position={position}
        setPosition={setPosition}
        addWidget={addWidget}
        duplicateWidget={duplicateWidget}
        updateWidget={updateWidget}
        onDragOrResizeStop={onDragOrResizeStop}
        onDrag={onDrag}
        onResize={onResize}
        fetchLayout={fetchLayout}
      />
    </>
  );
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

export default Dashboard;
