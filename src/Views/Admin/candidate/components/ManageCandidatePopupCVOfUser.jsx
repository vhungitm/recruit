import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Document, Page } from 'react-pdf';
import { BootstrapDialogTitle } from './DialogTitle';
import 'SCSS/_candidateShowPopupDetail.scss';

const ManageCandidatePopupCVOfUser = props => {
  const {
    show,
    onClose,
    candidateAccountDetail,
    onDocumentLoadSuccess,
    numPages,
    download
  } = props;

  return (
    <div>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={show}
      >
        <BootstrapDialogTitle onClose={onClose}></BootstrapDialogTitle>
        <div className="candidate-profile" id="candidate-profile">
          <Document
            file={candidateAccountDetail.hosodinhkem}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
        <DialogActions>
          <button className="save-button-pdf" onClick={download}>
            <img
              className="file-export"
              src={
                process.env.PUBLIC_URL +
                `/Assets/images/candidate/save-button-pdf.png`
              }
              alt=""
            />
            Tải về
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageCandidatePopupCVOfUser;
