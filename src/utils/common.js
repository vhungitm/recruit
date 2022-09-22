import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import FileSaver from 'file-saver';

export const convertToSingleText = str => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[\s]/g, '-')
    .toLowerCase();
};

export const formatStringToDate = (string, type) => {
  let result;
  switch (type) {
    case 'dd/MM/yyyy': {
      let arr = string.split('/');
      result = new Date(arr[2], arr[1] - 1, arr[0]);
      break;
    }

    default:
      break;
  }

  return result;
};

export const formatDateToString = (date, type) => {
  // Day
  let day = date.getDate();
  if (day < 10) day = `0${day}`;

  // Month
  let month = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;

  // Year
  const year = date.getFullYear();

  let result = '';
  switch (type) {
    case 'yyyy-MM-dd': {
      result = `${year}-${month}-${day}`;
      break;
    }
    default: {
      result = `${day}/${month}/${year}`;
    }
  }

  return result;
};

export const formatDateString = (string, type, typeTo) => {
  switch (type) {
    default: {
      let arr = string.split('/');

      switch (typeTo) {
        default: {
          return `${arr[2]}-${arr[1]}-${arr[0]}`;
        }
      }
    }
  }
};

export const PrintToPdf = dataInfo => {
  html2canvas(document.getElementById('candidate-profile')).then(canvas => {
    var data = canvas.toDataURL();
    var pdfExportSetting = {
      content: [
        {
          alignment: 'center',
          margin: [15, -20, 0, 0],
          image: data,
          width: 500,
          fit: [550, 850]
        }
      ]
    };
    pdfMake.createPdf(pdfExportSetting).download(`${dataInfo.hoten}.pdf`);
  });
};

export const handleDownloadCv = candidateAccountDetail => {
  fetch(candidateAccountDetail.hosodinhkem).then(response => {
    response.blob().then(blob => {
      FileSaver.saveAs(
        window.URL.createObjectURL(blob),
        `CV_${candidateAccountDetail.hoten}.pdf`
      );
    });
  });
};

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const timeOutToast = 10000;
