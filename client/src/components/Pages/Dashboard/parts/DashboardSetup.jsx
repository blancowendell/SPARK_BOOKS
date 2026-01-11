import React, { useEffect, useState, useRef } from "react";
import { Drawer } from "@mui/material";
import WidgetPreview from "../components/WidgetPreview";
import WidgetPreviewCanvas from "../components/WidgetPreviewCanvas";
import WidgetControls from "../components/WidgetControlPanel";
import DashboardAPI from "../../../../api/private/dashboard/dashboardAPI";
import { v4 as uuidv4 } from "uuid";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../components/ActionsCenter/Alerts/Toast";
import authAPI from "../../../../api/public/auth/authAPI";

const DashboardSetup = ({
  open,
  onClose,
  widgets,
  setWidgets,
  guidelines,
  widgetType,
  setWidgetType,
  fetchLayout,
}) => {
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const isUndoRedoRef = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setPast([widgets]);
    setFuture([]);
  }, []);

  useEffect(() => {
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false;
      return;
    }
    if (past.length > 0) {
      const last = past[past.length - 1];
      if (JSON.stringify(last) === JSON.stringify(widgets)) return;
    }
    setPast((prev) => [...prev, widgets]);
    setFuture([]);
  }, [widgets]);

  const setWidgetsWithHistory = (newWidgets) => {
    setWidgets(newWidgets);
  };

  const handleUndo = () => {
    if (past.length <= 1) return;
    isUndoRedoRef.current = true;
    const previous = past[past.length - 2];
    const newPast = past.slice(0, past.length - 1);
    setPast(newPast);
    setFuture((f) => [past[past.length - 1], ...f]);
    setWidgets(previous);
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    isUndoRedoRef.current = true;
    const next = future[0];
    setFuture((f) => f.slice(1));
    setPast((p) => [...p, next]);
    setWidgets(next);
  };

  const getNextWidgetTitle = (type, offset = 0) => {
    const count = widgets.filter((w) => w.type === type).length;
    return `${type.charAt(0).toUpperCase() + type.slice(1)} ${count + 1 + offset}`;
  };

  const addWidgetWithPosition = (type) => {
    if (!containerRef.current) return;

    const parentWidth = containerRef.current.offsetWidth;
    const parentHeight = containerRef.current.offsetHeight;

    const defaultWidth = 200;
    const defaultHeight = 200;

    const maxY = widgets.length
      ? Math.max(...widgets.map((w) => w.y + w.height))
      : 0;

    const pxX = 0;
    const pxY = maxY + 20;

    const newWidget = {
      id: uuidv4(),
      type,
      title: getNextWidgetTitle(type),
      content: "",
      apiUrl: "",
      param: "",
      cardType: type === "card" ? "default" : "",
      chartType: type === "graph" ? "bar" : "",
      headers: "",
      tbody: "",
      actions: false,
      x: pxX,
      y: pxY,
      width: defaultWidth,
      height: defaultHeight,
      xPercent: pxX / parentWidth,
      yPercent: pxY / parentHeight,
      widthPercent: defaultWidth / parentWidth,
      heightPercent: defaultHeight / parentHeight,
    };

    setWidgetsWithHistory([...widgets, newWidget]);
  };

  const addAutoWidgets = (type, count) => {
    if (!containerRef.current) return;

    const parentWidth = containerRef.current.offsetWidth;
    const parentHeight = containerRef.current.offsetHeight;

    const defaultHeight = 150;

    const spacing = 10;
    const totalSpacing = spacing * (count - 1);
    const cardWidth = (parentWidth - totalSpacing) / count;

    const maxY = widgets.length
      ? Math.max(...widgets.map((w) => w.y + w.height))
      : 0;

    const pxY = maxY + 20;

    const newWidgets = [];
    for (let i = 0; i < count; i++) {
      const pxX = i * (cardWidth + spacing);

      newWidgets.push({
        id: uuidv4(),
        type,
        title: getNextWidgetTitle(type, i),
        content: "",
        apiUrl: "",
        param: "",
        cardType: type === "card" ? "default" : "",
        chartType: type === "graph" ? "bar" : "",
        headers: "",
        tbody: "",
        actions: false,
        x: pxX,
        y: pxY,
        width: cardWidth,
        height: defaultHeight,
        xPercent: pxX / parentWidth,
        yPercent: pxY / parentHeight,
        widthPercent: cardWidth / parentWidth,
        heightPercent: defaultHeight / parentHeight,
      });
    }

    setWidgetsWithHistory([...widgets, ...newWidgets]);
  };

  const duplicateWidget = (id) => {
    const widget = widgets.find((w) => w.id === id);
    if (!widget || !containerRef.current) return;

    const parentWidth = containerRef.current.offsetWidth;
    const parentHeight = containerRef.current.offsetHeight;

    const pxX = widget.x + 20;
    const pxY = widget.y + 20;

    const newWidget = {
      ...widget,
      id: uuidv4(),
      title: getNextWidgetTitle(widget.type),
      x: pxX,
      y: pxY,
      xPercent: pxX / parentWidth,
      yPercent: pxY / parentHeight,
    };

    setWidgetsWithHistory([...widgets, newWidget]);
  };

  const handleWidgetUpdate = (id, updates) => {
    const newWidgets = widgets.map((w) =>
      w.id === id ? { ...w, ...updates } : w
    );
    setWidgetsWithHistory(newWidgets);
  };

  const handleWidgetTypeChange = (e) => {
    const selectedType = e.target.value;
    setWidgetType(selectedType);
    if (selectedType) {
      addWidgetWithPosition(selectedType);
    }
  };

  const handleDrag = (id, x, y, width, height) => {
    if (!containerRef.current) return;

    const parentWidth = containerRef.current.offsetWidth;
    const parentHeight = containerRef.current.offsetHeight;

    handleWidgetUpdate(id, {
      x,
      y,
      width,
      height,
      xPercent: x / parentWidth,
      yPercent: y / parentHeight,
      widthPercent: width / parentWidth,
      heightPercent: height / parentHeight,
    });
  };

  const handleResize = (id, x, y, width, height) => {
    handleDrag(id, x, y, width, height);
  };

  const onWidgetFieldChange = (id, field, value) => {
    handleWidgetUpdate(id, { [field]: value });
  };

  const renderWidgetContent = (widget) => {
    const commonClasses =
      "w-full h-full flex flex-col items-center justify-center text-sm font-medium p-2 overflow-hidden";
    switch (widget.type) {
      case "card":
        return (
          <div className={`bg-blue-100 text-blue-800 ${commonClasses}`}>
            <div className="font-bold truncate w-full">
              {widget.title || "Card"}
            </div>
            <WidgetPreview widget={widget} />
          </div>
        );
      case "table":
        return (
          <div className={`bg-green-100 text-green-800 ${commonClasses}`}>
            <div className="font-bold truncate w-full">
              {widget.title || "Table"}
            </div>
            <div className="text-xs mt-1 truncate w-full whitespace-normal">
              {widget.content || "Table data..."}
            </div>
          </div>
        );
      case "graph":
        return (
          <div className={`bg-purple-100 text-purple-800 ${commonClasses}`}>
            <div className="font-bold truncate w-full">
              {widget.title || "Graph"}
            </div>
            <WidgetPreview widget={widget} />
          </div>
        );
      default:
        return null;
    }
  };

  const closeDrawer = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      const session = await authAPI.getSession();
      if (!session || !session.user || !session.user.dashboard_id) {
        throw new Error("Dashboard ID not found in session.");
      }
      const dashboardId = session.user.dashboard_id;
      
      const payload = {
        dashboard_id: dashboardId,
        widgets: widgets.map((widget) => ({
          type: widget.type,
          title: widget.title || "",
          position_x: widget.xPercent,
          position_y: widget.yPercent,
          width: widget.widthPercent,
          height: widget.heightPercent,
          config: {
            cardType: widget.cardType || "",
            content: widget.content || "",
            param: widget.param || "",
            apiId: widget.apiId || null,
            chartType: widget.chartType || "",
            headers: widget.headers || "",
            tbody: widget.tbody || "",
            actions: widget.actions || false,
            scorecardIcon: widget.scorecardIcon || "",
          },
        })),
      };
      await DashboardAPI.addWidgets(payload);
      showSuccessToast("Layout saved successfully!");

      if (typeof fetchLayout === "function") {
        fetchLayout();
      }

      onClose();
    } catch (error) {
      console.error("Save failed:", error);
      showErrorToast("Failed to save layout.");
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="flex flex-col md:flex-row w-[90vw] max-w-[1600px] h-screen p-4 gap-4 overflow-hidden">
        <div
          ref={containerRef}
          className="w-full md:w-2/3 h-full overflow-auto border rounded-md bg-white"
        >
          <WidgetPreviewCanvas
            widgets={widgets}
            guidelines={guidelines}
            handleUndo={handleUndo}
            handleRedo={handleRedo}
            past={past}
            future={future}
            onDrag={handleDrag}
            onResize={handleResize}
            handleWidgetUpdate={handleWidgetUpdate}
            duplicateWidget={duplicateWidget}
            renderWidgetContent={renderWidgetContent}
            addAutoWidgets={addAutoWidgets}
            containerRef={containerRef}
          />
        </div>
        <div className="w-full md:w-1/3 h-full overflow-y-auto rounded-md">
          <WidgetControls
            widgetType={widgetType}
            handleWidgetTypeChange={handleWidgetTypeChange}
            widgets={widgets}
            duplicateWidget={duplicateWidget}
            onWidgetFieldChange={onWidgetFieldChange}
            closeDrawer={closeDrawer}
            handleSave={handleSave}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default DashboardSetup;



