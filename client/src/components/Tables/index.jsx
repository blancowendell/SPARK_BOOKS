import React, { useState, useMemo, useEffect } from "react";
import noDataAnimation from "../../assets/animations/no-data.json";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import excelIcon from "../../assets/images/xlsx.png";
import pdfIcon from "../../assets/images/pdf.png";
import ActionDropdown from "./parts/DropdownActions.jsx";
import TablePagination from "./parts/TablePagination.jsx";
import TableContent from "./parts/TableContent.jsx";
import SearchForm from "./parts/SearchForm.jsx";

const Table = ({
  headers,
  keys,
  data,
  rowsPerPage = 10,
  withImage = false,
  withEdit = false,
  withView = false,        // ✅ NEW
  withDelete = false,
  withActions = true,
  dropdownItems = [],
  onItemClick,
  onEditClick,
  onViewClick,             // ✅ NEW
  onDeleteClick,
  onRowClick,
  customActionsRenderer,
  currentPage: controlledPage,
  onPageChange: onExternalPageChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(controlledPage || 1);

    useEffect(() => {
    if (controlledPage !== undefined) setCurrentPage(controlledPage);
  }, [controlledPage]);

  const handlePageChange = (page) => {
    if (onExternalPageChange) onExternalPageChange(page);
    setCurrentPage(page);
  };


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Exported Table", 14, 10);

    doc.autoTable({
      head: [Object.keys(data[0])],
      body: data.map((row) => Object.values(row)),
    });

    doc.save("data.pdf");
  };

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 80%)`;
  };

  const getContrastColor = (hsl) => {
    const tempDiv = document.createElement("div");
    tempDiv.style.color = hsl;
    document.body.appendChild(tempDiv);
    const rgb = window.getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);

    const [r, g, b] = rgb.match(/\d+/g).map(Number).slice(0, 3);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "text-black" : "text-white";
  };

  const renderAvatar = (name = "", image) => {
    if (image) {
      return <img src={image} alt={name} className="w-10 h-10 rounded-full" />;
    }

    const nameParts = name.trim().split(" ");
    const initials =
      nameParts.length >= 2
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
        : nameParts[0]?.[0] || "?";

    const bgColor = stringToColor(name);
    const textColor = getContrastColor(bgColor);

    return (
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${textColor}`}
        style={{ backgroundColor: bgColor }}
      >
        {initials.toUpperCase()}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 py-10 rounded-xl shadow-md border border-[rgba(0,0,0,0.1)] h-[800px] flex flex-col">
      <div className="mb-4 flex justify-between items-center w-full">
        {/* Export buttons */}
        <div className="flex space-x-2 me-4">
          <button
            onClick={handleExportExcel}
            title="Export to Excel"
            className="p-3 rounded-lg border border-[rgba(0,0,0,0.1)] bg-green-100 hover:bg-green-200"
          >
            <img src={excelIcon} alt="Export to Excel" className="w-5 h-5" />
          </button>

          <button
            onClick={handleExportPDF}
            title="Export to PDF"
            className="p-3 rounded-lg border border-[rgba(0,0,0,0.1)] bg-red-100 hover:bg-red-200"
          >
            <img src={pdfIcon} alt="Export to PDF" className="w-5 h-5" />
          </button>

          {withActions && (
            <ActionDropdown items={dropdownItems} onItemClick={onItemClick} />
          )}
        </div>

        {/* Search input */}
        <SearchForm
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          handleSubmit={handleSubmit}
        />
      </div>

      {/* Table content */}
      <TableContent
        headers={headers}
        keys={keys}
        paginatedData={paginatedData}
        onRowClick={onRowClick}
        onEditClick={onEditClick}
        onViewClick={onViewClick}
        onDeleteClick={onDeleteClick}
        withEdit={withEdit}
        withView={withView}
        withDelete={withDelete}
        withImage={withImage}
        renderAvatar={renderAvatar}
        noDataAnimation={noDataAnimation}
        customActionsRenderer={customActionsRenderer}
      />

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        // onPageChange={setCurrentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
