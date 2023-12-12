
import { Box, Button } from '@mui/material';
import FileSaver from 'file-saver';
import React from 'react'
import * as XLSX from "xlsx";
import DownloadIcon from '@mui/icons-material/Download';

export default function ExportarExcel({ apiData, fileName }) {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(apiData);

        //XLSX.utils.sheet_add_aoa(ws, [["CARRERA", "FACULTAD", "TOTAL HORAS", "NOMBRE", "CODIGO"]], { origin: "A1" });

        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <Button variant="contained" color="success" endIcon={<DownloadIcon/>} onClick={(e) => exportToCSV(apiData, fileName)}>Exportar Excel</Button>
      );
}