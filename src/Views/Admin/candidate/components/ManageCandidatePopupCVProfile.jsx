import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { BootstrapDialogTitle } from './DialogTitle';
import ManageCandidateCVProfile from './ManageCandidateCVProfile';
import { PrintToPdf } from 'utils';
import 'SCSS/_candidateShowPopupDetail.scss';

const ManageCandidatePopupCVProfile = props => {
  const {
    show,
    onClose,
    candidateAccountDetail,
    education,
    workExp,
    skills,
    isCV,
    eye
  } = props;

  return (
    <div>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={show}
        className={isCV && eye ? '' : 'hide-popup'}
      >
        <BootstrapDialogTitle onClose={onClose}></BootstrapDialogTitle>
        <div className="candidate-profile" id="candidate-profile">
          <ManageCandidateCVProfile
            showViewDetails={show}
            candidateAccountDetail={candidateAccountDetail}
            education={education}
            workExp={workExp}
            skills={skills}
            popup={true}
          />
        </div>
        <DialogActions>
          <button
            className="save-button-pdf"
            onClick={() => PrintToPdf(candidateAccountDetail)}
          >
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

export default ManageCandidatePopupCVProfile;
