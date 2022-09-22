import { SelectField } from 'Components/FormFields';
import { useEffect } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export const ManageRecruiterExtendModal = props => {
  const { isExtend, isDetail, show, onClose, onSubmit } = props;

  // Form
  const { control, reset, handleSubmit } = useForm({
    defaultValues: { durationInMonth: 6 }
  });

  useEffect(() => {
    if (show) {
      reset({ durationInMonth: 6 });
    }
  }, [show, isExtend, isDetail, reset]);

  const durationInMonthOptions = [
    { value: 0, label: 'Vĩnh viễn' },
    { value: 3, label: '3 Tháng' },
    { value: 6, label: '6 Tháng' },
    { value: 9, label: '9 Tháng' },
    { value: 12, label: '12 Tháng' }
  ];

  return (
    <Modal className="approve-modal" show={show} onHide={onClose}>
      <ModalHeader closeButton></ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <img
            className="img-88"
            src={
              process.env.PUBLIC_URL + `/Assets/images/jobpost/success-icon.png`
            }
            alt="success-icon"
          />
          <p className="modal-title">
            {isExtend
              ? 'Gia hạn tài khoản'
              : isDetail
              ? 'Thời hạn sử dụng tài khoản'
              : 'Xác nhận duyệt tài khoản'}
          </p>

          {isExtend || isDetail ? (
            <>
              <span className="modal-inform">
                Vui lòng chọn thời hạn sử dụng cho tài khoản
              </span>
              <SelectField
                control={control}
                name="durationInMonth"
                placeholder="Thời hạn"
                options={durationInMonthOptions}
              />
            </>
          ) : (
            <span className="modal-inform">
              Tất cả các tài khoản duyệt nhanh sẽ có thời hạn là <b>6 tháng</b>
            </span>
          )}
        </ModalBody>
        <ModalFooter>
          <Button className="cancel-btn" onClick={onClose}>
            Hủy
          </Button>

          <Button className="confirm-btn" type="submit">
            Xác nhận
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
