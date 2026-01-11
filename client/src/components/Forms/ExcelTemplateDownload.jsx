import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { FaDownload } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ExcelTemplateDownload = ({ headers, templateName = 'template' }) => {
  const getCSSVariable = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const hexToARGB = (hex) => {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map((h) => h + h).join('');
    }
    return `FF${hex.toUpperCase()}`;
  };

  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Template');

    const mainColor = getCSSVariable('--main-color') || '#4F81BD';
    const textColor = getCSSVariable('--main-text-color') || '#FFFFFF';

    const headerRow = worksheet.addRow(headers.map(h => h.toUpperCase()));

    headerRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true, color: { argb: hexToARGB(textColor) } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: hexToARGB(mainColor) },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

      worksheet.getColumn(colNumber).width = 20;
    });

    headerRow.height = 25;

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `${templateName}.xlsx`);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-gray-700"
    >
      <FaDownload className="mr-2" />
      Download Excel Template
    </button>
  );
};

ExcelTemplateDownload.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  templateName: PropTypes.string,
};

export default ExcelTemplateDownload;
