import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

export const excelFunction = {
	export: async (fileName, sheetName, header, data, footer) => {
		const wb = new ExcelJS.Workbook();
		const ws = wb.addWorksheet(sheetName);

		// Header
		header = header.map(item => ({
			header: item.name,
			key: item.field,
			width: (item.width || 8.48) + 0.72
		}));

		ws.columns = header;
		let headerEX = ws.getRow(1);
		headerEX.font = {
			name: 'Calibri',
			color: { argb: '000000' },
			size: 11,
			bold: true
		};

		data.forEach(item => {
			let row = ws.addRow(item);

			row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
				cell.alignment = { vertical: 'middle', wrapText: true };
			});
		});

		const buf = await wb.xlsx.writeBuffer();
		FileSaver.saveAs(new Blob([buf]), `${fileName}.xlsx`);
	}
};
