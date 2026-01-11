import React, { useEffect, useState, useRef, useCallback } from 'react';
import DashboardAPI from "../../../../api/private/dashboard/dashboardAPI";
import WidgetBox from '../components/WidgetBox';
import ChartWidget from '../components/ChartWidget';
import TableWidget from '../components/TableWidget';

const DashboardLayout = ({ reloadTrigger }) => {
    const [widgets, setWidgets] = useState([]);
    const [loading, setLoading] = useState(true);

    const containerRef = useRef(null);

    const fetchLayout = useCallback(async () => {
        setLoading(true);
        try {
            const res = await DashboardAPI.loadLayout();
            const data = Array.isArray(res) ? res : res?.data;
            if (Array.isArray(data)) {
                setWidgets(data);
            } else {
                console.warn("Unexpected response format:", res);
            }
        } catch (err) {
            console.error("Error loading dashboard layout:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLayout();
    }, [fetchLayout, reloadTrigger]);

    const renderWidget = (widget, index) => {
        const { dw_type, configs } = widget;
        const config = configs?.[0] || {};

        const style = {
            position: 'absolute',
            left: `${widget.dw_position_x * 100}%`,
            top: `${widget.dw_position_y * 100}%`,
            width: `${widget.dw_width * 100}%`,
            height: `${widget.dw_height * 100}%`,
        };

        const content = (() => {
            switch (dw_type) {
                case 'card':
                    return <WidgetBox widget={widget} config={config} />;
                case 'graph':
                    return <ChartWidget widget={widget} config={config} />;
                case 'table':
                    return <TableWidget widget={widget} config={config} />;
                default:
                    return (
                        <div className="text-red-500">
                            Unknown widget type: {dw_type}
                        </div>
                    );
            }
        })();

        return (
            <div key={widget.dw_id || index} style={style}>
                {content}
            </div>
        );
    };

    return (
        <div className="w-full h-screen overflow-hidden bg-gray-100 p-4">
            {loading ? (
                <p className="text-center text-gray-400">Loading widgets...</p>
            ) : widgets.length === 0 ? (
                <p className="text-center text-gray-500">No widgets to display</p>
            ) : (
                <div
                    ref={containerRef}
                    className="w-full h-full relative overflow-hidden rounded-md"
                >
                    {widgets.map((widget, index) => renderWidget(widget, index))}
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
