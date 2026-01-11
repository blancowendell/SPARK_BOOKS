import React, { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { LuSaveAll } from "react-icons/lu";
import { FaUser, FaDollarSign, FaCheck, FaExclamationTriangle, FaStar } from "react-icons/fa";
import { Divider, Typography } from "@mui/material";
import FloatingSelect from "../../../../components/Forms/FloatingSelect";
import FloatingInput from "../../../../components/Forms/FloatingInput";
import FloatingTextArea from "../../../../components/Forms/FloatingTextArea";
import FloatingCheckbox from "../../../../components/Forms/FloatingCheckboxGroup";
import PresetAPI from "../../../../api/private/dev_tools/presetAPI";

const WidgetControls = ({
  widgetType,
  handleWidgetTypeChange,
  widgets,
  duplicateWidget,
  onWidgetFieldChange,
  closeDrawer,
  handleSave,
}) => {
  const [apiList, setApiList] = useState([]);

  const scorecardIconOptions = [
    { label: "User", value: "FaUser", icon: <FaUser /> },
    { label: "Dollar", value: "FaDollarSign", icon: <FaDollarSign /> },
    { label: "Check", value: "FaCheck", icon: <FaCheck /> },
    { label: "Warning", value: "FaExclamationTriangle", icon: <FaExclamationTriangle /> },
    { label: "Star", value: "FaStar", icon: <FaStar /> },
  ];


  useEffect(() => {
    const loadApiOptions = async () => {
      try {
        const apis = await PresetAPI.loadPreSetApi();
        setApiList(apis || []);
      } catch (error) {
        console.error("Failed to load API options", error);
      }
    };
    loadApiOptions();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 overflow-auto">
      <Typography variant="h6">Add Widget</Typography>
      <Divider />

      <div className="mb-4">
        <FloatingSelect
          label="Widget Type"
          name="widgetType"
          options={[
            { label: "Card", value: "card" },
            { label: "Table", value: "table" },
            { label: "Graph", value: "graph" },
          ]}
          value={widgetType}
          onChange={handleWidgetTypeChange}
        />
      </div>

      <Divider className="my-2" />
      <Typography variant="h6">Widgets List (Edit Inline)</Typography>

      <div className="max-h-[600px] overflow-auto border rounded p-2 space-y-4">
        {widgets.length === 0 && <div>No widgets added</div>}
        {widgets.map((widget) => (
          <div key={widget.id} className="p-3 border rounded bg-white">
            <div className="flex justify-between items-center mb-2">
              <strong className="capitalize">{widget.type}</strong>
              <div
                className="cursor-pointer text-gray-600 hover:text-gray-900"
                onClick={() => duplicateWidget(widget.id)}
                title="Duplicate Widget"
              >
                <MdContentCopy size={18} />
              </div>
            </div>

            <div className="mb-4">
              <FloatingInput
                id={`title-${widget.id}`}
                label="Title"
                value={widget.title}
                onChange={(e) =>
                  onWidgetFieldChange(widget.id, "title", e.target.value)
                }
                length={100}
              />
            </div>

            <div className="mb-4">
              <FloatingTextArea
                id={`content-${widget.id}`}
                label="Content"
                value={widget.content}
                onChange={(e) =>
                  onWidgetFieldChange(widget.id, "content", e.target.value)
                }
                length={200}
                textarea
                rows={2}
              />
            </div>

            <div className="mb-4">
              <FloatingSelect
                label="API URL"
                name={`api-${widget.id}`}
                value={String(widget.apiId ?? "")}
                onChange={(e) =>
                  onWidgetFieldChange(widget.id, "apiId", Number(e.target.value))
                }
                options={apiList.map((api) => ({
                  label: api.name,
                  value: String(api.id),
                }))}
              />
            </div>

            <div className="mb-4">
              <FloatingInput
                id={`param-${widget.id}`}
                label="Param"
                value={widget.param || ""}
                onChange={(e) =>
                  onWidgetFieldChange(widget.id, "param", e.target.value)
                }
                length={100}
              />
            </div>

            {widget.type === "card" && (
              <>
                <div className="mb-4">
                  <FloatingSelect
                    label="Card Type"
                    name={`cardType-${widget.id}`}
                    options={[
                      { label: "Default", value: "default" },
                      { label: "Leaderboard", value: "leaderboard" },
                      { label: "Statistics", value: "statistics" },
                      { label: "Status Bar", value: "statusbar" },
                      { label: "Scorecard", value: "scorecard" },
                    ]}
                    value={widget.cardType || "default"}
                    onChange={(e) =>
                      onWidgetFieldChange(widget.id, "cardType", e.target.value)
                    }
                  />
                </div>

                {widget.cardType === "scorecard" && (
                  <div className="mb-4">
                    <FloatingSelect
                      label="Scorecard Icon"
                      name={`scorecardIcon-${widget.id}`}
                      value={widget.scorecardIcon || ""}
                      onChange={(e) =>
                        onWidgetFieldChange(widget.id, "scorecardIcon", e.target.value)
                      }
                      options={[
                        { label: "-- Select Icon --", value: "" },
                        ...scorecardIconOptions.map((opt) => ({
                          label: opt.label,
                          value: opt.value,
                        })),
                      ]}
                    />
                  </div>
                )}
              </>
            )}

            {widget.type === "table" && (
              <>
                <div className="mb-4">
                  <FloatingInput
                    id={`headers-${widget.id}`}
                    label="Table Headers (comma-separated)"
                    value={widget.headers || ""}
                    onChange={(e) =>
                      onWidgetFieldChange(widget.id, "headers", e.target.value)
                    }
                    length={200}
                  />
                </div>
                <div className="mb-4">
                  <FloatingInput
                    id={`tbody-${widget.id}`}
                    label="Table Body (rows | separated)"
                    value={widget.tbody || ""}
                    onChange={(e) =>
                      onWidgetFieldChange(widget.id, "tbody", e.target.value)
                    }
                    length={200}
                  />
                </div>
                <div className="mb-4">
                  <FloatingCheckbox
                    id={`actions-checkbox-${widget.id}`}
                    label="With Actions"
                    checked={widget.actions || false}
                    onChange={(e) =>
                      onWidgetFieldChange(
                        widget.id,
                        "actions",
                        e.target.checked
                      )
                    }
                  />
                </div>
              </>
            )}

            {widget.type === "graph" && (
              <div className="mb-4">
                <FloatingSelect
                  label="Chart Type"
                  name={`chartType-${widget.id}`}
                  options={[
                    { label: "Bar Chart", value: "bar" },
                    { label: "Line Chart", value: "line" },
                    { label: "Pie Chart", value: "pie" },
                    { label: "Doughnut Chart", value: "doughnut" },
                  ]}
                  value={widget.chartType || "bar"}
                  onChange={(e) =>
                    onWidgetFieldChange(widget.id, "chartType", e.target.value)
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between space-x-4 mt-4">
        <button
          onClick={closeDrawer}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Close
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-1"
          style={{
            backgroundColor: "var(--main-color)",
            color: "var(--main-text-color)",
          }}
        >
          <LuSaveAll /> Save Layout
        </button>
      </div>
    </div>
  );
};

export default WidgetControls;

