import React, { useState, useEffect } from "react";
import Drawer from "../../../../components/Modals/AntdDrawer/index";
import { TbXboxXFilled } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import FloatingInput from "../../../../components/Forms/FloatingInput";
import FloatingSelect from "../../../../components/Forms/FloatingSelect";
import FloatingNumberInput from "../../../../components/Forms/FloatingNumberInput";
import FloatingCheckbox from "../../../../components/Forms/FloatingCheckboxGroup";
import Table from "../../../../components/Tables";
import SequenceAPI from "../../../../api/private/maintenance/sequenceAPI";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../components/ActionsCenter/Alerts/Toast";

const MaintenanceSequence = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [sequences, setSequences] = useState([]);

  const [id, setId] = useState(null);
  const [prefix, setPrefix] = useState("IR-");
  const [separator, setSeparator] = useState("-");
  const [sequenceLevel, setSequenceLevel] = useState("");
  const [startNumber, setStartNumber] = useState("1");
  const [paddingLength, setPaddingLength] = useState(4);
  const [includeYear, setIncludeYear] = useState(true);
  const [yearFormat, setYearFormat] = useState("YYYY");
  const [includeMonth, setIncludeMonth] = useState(false);
  const [includeDay, setIncludeDay] = useState(false);

  const openAddDrawer = () => {
    setIsEditMode(false);
    setId(null);
    setPrefix("IR-");
    setSeparator("-");
    setSequenceLevel("");
    setStartNumber("1");
    setPaddingLength(4);
    setIncludeYear(true);
    setYearFormat("YYYY");
    setIncludeMonth(false);
    setIncludeDay(false);
    setIsDrawerOpen(true);
  };

  const openEditDrawer = async (sequenceId) => {
    try {
      setIsEditMode(true);
      const data = await SequenceAPI.getSequence(sequenceId);
      if (data && data.length > 0) {
        const seq = data[0];
        setId(seq.id);
        setPrefix(seq.prefix);
        setSeparator(seq.separator);
        setSequenceLevel(String(seq.employee_level));
        setStartNumber(String(seq.start_number));
        setPaddingLength(seq.padding_length);
        setIncludeYear(Boolean(seq.include_year));
        setYearFormat(seq.year_format || "YYYY");
        setIncludeMonth(Boolean(seq.include_month));
        setIncludeDay(Boolean(seq.include_day));
        setIsDrawerOpen(true);
      } else {
        showErrorToast("Sequence not found");
      }
    } catch (error) {
      showErrorToast("Failed to load sequence data");
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const getPreview = () => {
    const now = new Date();
    const dateParts = [];
    if (includeYear) {
      if (yearFormat === "YY") {
        dateParts.push(String(now.getFullYear()).slice(-2));
      } else {
        dateParts.push(now.getFullYear());
      }
    }
    if (includeMonth)
      dateParts.push(String(now.getMonth() + 1).padStart(2, "0"));
    if (includeDay) dateParts.push(String(now.getDate()).padStart(2, "0"));
    const datePart = dateParts.join(separator);
    const paddedNum = String(startNumber).padStart(paddingLength, "0");
    return `${prefix}${datePart ? datePart + separator : ""}${paddedNum}`;
  };

  const loadSequences = async () => {
    try {
      const data = await SequenceAPI.loadSequence();
      setSequences(data);
    } catch (error) {
      showErrorToast("Failed to load sequences");
    }
  };

  useEffect(() => {
    loadSequences();
  }, []);

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await SequenceAPI.editSequence(id, paddingLength);
        showSuccessToast("Sequence updated successfully");
      } else {
        const res = await SequenceAPI.addSequence(
          sequenceLevel,
          prefix,
          separator,
          startNumber,
          paddingLength,
          includeYear,
          yearFormat,
          includeMonth,
          includeDay
        );

        if (res?.msg === "exist") {
          const errorMessage = res?.msg || "Validation failed.";
          showErrorToast(errorMessage);
          return;
        }

        showSuccessToast("Sequence added successfully");
      }

      closeDrawer();
      loadSequences();
    } catch (error) {
      showErrorToast(
        isEditMode ? error?.msg || "Failed to update sequence" : "Failed to add sequence"
      );
    }
  };

  const tableHeaders = ["Preview", "Type", "Year", "Month", "Day", "Actions"];
  const tableKeys = [
    "preview",
    "sequence_level",
    "includeYear",
    "includeMonth",
    "includeDay",
    "actions",
  ];
  const tableOptions = { withImage: true, withEdit: true, withDelete: false };

  const tableData = sequences.map((seq) => ({
    id: seq.id,
    preview: seq.preview,
    prefix: seq.prefix,
    separator: seq.separator,
    sequence_level: seq.employee_level,
    start_number: seq.start_number,
    padding_length: seq.padding_length,
    includeYear: seq.include_year ? "✓" : "✗",
    includeMonth: seq.include_month ? "✓" : "✗",
    includeDay: seq.include_day ? "✓" : "✗",
    actions: "",
  }));

  const handleDropdownClick = ({ key }) => {
    if (key === "add-new") {
      openAddDrawer();
    } else if (key === "import") {
      showSuccessToast("Importing data...");
    }
  };

  return (
    <div className="p-5">
      <div className="overflow-x-auto rounded-xl shadow">
        <Table
          headers={tableHeaders}
          data={tableData}
          keys={tableKeys}
          {...tableOptions}
          dropdownItems={[
            { key: "add-new", label: "Add New Sequence" },
            { key: "import", label: "Import" },
          ]}
          onItemClick={handleDropdownClick}
          onEditClick={(row) => openEditDrawer(row.id)}
        />
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={
          isEditMode ? "Edit Sequence Reference ID" : "Add Sequence Reference ID"
        }
        width={500}
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div>
            <FloatingInput
              id="prefix"
              label="Prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              disabled={isEditMode}
            />
          </div>

          <div>
            {includeYear && (
              <FloatingSelect
                id="yearFormat"
                label="Year Format"
                value={yearFormat}
                onChange={(e) => setYearFormat(e.target.value)}
                options={[
                  { value: "YYYY", label: "YYYY" },
                  { value: "YY", label: "YY" },
                ]}
                disabled={isEditMode}
              />
            )}
          </div>

          <div className="flex items-center gap-4">
            <FloatingCheckbox
              id="includeYear"
              label="Year"
              checked={includeYear}
              onChange={(e) => setIncludeYear(e.target.checked)}
              disabled={isEditMode}
            />

            <FloatingCheckbox
              id="includeMonth"
              label="Month"
              checked={includeMonth}
              onChange={(e) => setIncludeMonth(e.target.checked)}
              disabled={isEditMode}
            />
            <FloatingCheckbox
              id="includeDay"
              label="Day"
              checked={includeDay}
              onChange={(e) => setIncludeDay(e.target.checked)}
              disabled={isEditMode}
            />
          </div>

          <div className="flex gap-4">
            <FloatingSelect
              id="separator"
              label="Separator"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              options={[
                { value: "-", label: "Dash (-)" },
                { value: "/", label: "Slash (/)" },
                { value: "_", label: "Underscore (_)" },
                { value: "", label: "None" },
              ]}
              disabled={isEditMode}
            />
            <FloatingInput
              id="sequenceLevel"
              label="Sequence Type"
              value={sequenceLevel}
              onChange={(e) => setSequenceLevel(e.target.value)}
              disabled={isEditMode}
            />
          </div>

          <div className="flex gap-4">
            <FloatingNumberInput
              id="start_number"
              label="Start Number"
              value={startNumber}
              onChange={setStartNumber}
              disabled={isEditMode}
            />
            <FloatingNumberInput
              id="padding_length"
              label="Padding Length"
              value={paddingLength}
              onChange={(val) => setPaddingLength(Number(val) || 0)}
              disabled={false}
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold mb-1">Preview</label>
            <div className="px-4 py-2 bg-gray-100 rounded border text-lg font-mono">
              {getPreview()}
            </div>
          </div>

          <div className="flex justify-between space-x-4 mt-4">
            <button
              type="button"
              onClick={closeDrawer}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 flex items-center space-x-2"
            >
              <TbXboxXFilled />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md flex items-center space-x-2"
              style={{
                backgroundColor: "var(--main-color)",
                color: "var(--main-text-color)",
              }}
            >
              <LuSaveAll />
              <span>{isEditMode ? "Update" : "Add"} Sequence</span>
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default MaintenanceSequence;
