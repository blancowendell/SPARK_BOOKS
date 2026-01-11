import React from "react";
import Lottie from "lottie-react";
import { Pencil, Eye } from "lucide-react";
import DeleteConfirmButton from "../../Buttons/PopconfirmDelete.jsx";

const TableContent = ({
  headers,
  keys,
  paginatedData,
  onRowClick,
  onEditClick,
  onViewClick,
  onDeleteClick,
  withEdit = false,
  withView = false,
  withDelete = false,
  withImage = false,
  renderAvatar,
  noDataAnimation,
  customActionsRenderer,
}) => {
  return (
    <div className="overflow-x-auto flex-1 rounded-t-lg shadow border border-gray-200">
      <table className="min-w-full text-sm text-left table-fixed">
        <thead
          className="text-[var(--main-text-color)] uppercase text-xs font-semibold sticky top-0 z-[5]"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <tr>
            {headers.map((header, index) => {
              const isFirst = index === 0;
              const isLast = index === headers.length - 1;
              return (
                <th
                  key={index}
                  className={`px-4 py-3 bg-[var(--main-color)] text-white ${
                    isFirst ? "rounded-tl-lg" : ""
                  } ${isLast ? "rounded-tr-lg" : ""}`}
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {keys.map((key, colIndex) => {
                  let content;

                  if (key === "actions") {
                    content = (
                      <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* ✅ Custom action renderer support */}
                        {customActionsRenderer ? (
                          customActionsRenderer(row)
                        ) : (
                          <>
                            {withEdit && (
                              <button
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => onEditClick(row)}
                              >
                                <Pencil size={16} />
                              </button>
                            )}
                            {withView && (
                              <button
                                className="text-green-500 hover:text-green-700"
                                onClick={() => onViewClick && onViewClick(row)}
                              >
                                <Eye size={16} />
                              </button>
                            )}
                            {withDelete && (
                              <DeleteConfirmButton
                                onConfirm={() =>
                                  onDeleteClick && onDeleteClick(row)
                                }
                              />
                            )}
                          </>
                        )}
                      </div>
                    );
                  } else if (key === "amount") {
                    const amount = row[key];
                    content =
                      amount !== undefined && amount !== null
                        ? `₱${parseFloat(amount).toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`
                        : "-";
                  } else if ((key === "name" || key === "name2") && withImage) {
                    const nameKey = key;
                    const emailKey = key === "name" ? "email" : "email2";
                    const imageKey = key === "name" ? "image" : "image2";

                    const nameValue = row[nameKey] ?? "-";
                    const emailValue = row[emailKey] ?? "";
                    const imageValue = row[imageKey];

                    content = (
                      <div className="flex items-center gap-3">
                        {renderAvatar(nameValue, imageValue)}
                        <div>
                          <p className="font-medium">{nameValue}</p>
                          <p className="text-xs text-gray-500">{emailValue}</p>
                        </div>
                      </div>
                    );
                  } else if (key === "status") {
                    const status = row[key] ?? "-";
                    let statusColor = "bg-gray-200 text-gray-800";

                    if (status.toLowerCase() === "active") {
                      statusColor = "bg-green-100 text-green-700";
                    } else if (status.toLowerCase() === "inactive") {
                      statusColor = "bg-red-100 text-red-700";
                    } else if (status.toLowerCase() === "pending") {
                      statusColor = "bg-yellow-100 text-yellow-700";
                    }

                    content = (
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}
                      >
                        {status}
                      </span>
                    );
                  } else {
                    content = row[key] ?? "-";
                  }

                  return (
                    <td
                      key={colIndex}
                      className="px-4 py-3 border-t border-gray-200 font-medium"
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center py-16">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-48 h-48">
                    <Lottie animationData={noDataAnimation} loop autoplay />
                  </div>
                  <p className="text-gray-500 mt-2">No Data Available</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableContent;
