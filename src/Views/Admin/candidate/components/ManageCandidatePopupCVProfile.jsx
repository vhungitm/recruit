import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import html2canvas from 'html2canvas'
import pdfMake from 'pdfmake/build/pdfmake'
import { BootstrapDialogTitle } from './DialogTitle'
import ManageCandidateCVProfile from './ManageCandidateCVProfile'
import 'SCSS/_candidateShowPopupDetail.scss'

const ManageCandidatePopupCVProfile = props => {
    const {
        show,
        onClose,
        candidateAccountDetail,
        education,
        workExp,
        skills
    } = props

    const printToPdf = () => {
        html2canvas(document.getElementById('candidate-profile')).then(canvas => {
            var data = canvas.toDataURL()
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
            }
            pdfMake
                .createPdf(pdfExportSetting)
                .download(`${candidateAccountDetail.hoten}.pdf`)
        })
    }

    return (
        <div>
            <Dialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={show}
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
                    <button className="save-button-pdf" onClick={printToPdf}>
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
    )
}

export default ManageCandidatePopupCVProfile
