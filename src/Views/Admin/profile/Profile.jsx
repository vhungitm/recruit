import { yupResolver } from '@hookform/resolvers/yup';
import recruiterAccountAPI from 'API/recruiterAccountAPI';
import { InputField } from 'Components/FormFields';
import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'SCSS/_profile.scss';
import { timeOutToast } from 'utils';
import * as yup from 'yup';
import { ProfileCancelUpdateModal } from './components';

const Profile = () => {
  const isUpdate = window.location.pathname.includes('/profile/update');
  const navigate = useNavigate();

  // Form validate
  const validationSchema = yup.object().shape({
    nguoidaidien: yup.string().required('Vui lòng điền tên'),
    diachi: yup.string().required('Vui lòng điền địa chỉ')
  });

  // Use form
  const {
    control,
    formState: { isSubmitting },
    reset,
    handleSubmit
  } = useForm({
    defaultValues: {
      nguoidaidien: '',
      diachi: ''
    },
    resolver: yupResolver(validationSchema)
  });

  // Data
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  // Effect update profile
  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await recruiterAccountAPI.fetchProfile();

        setData(res?.data || {});
        reset({
          nguoidaidien: res?.data?.nguoidaidien || '',
          diachi: res?.data?.diachi || ''
        });
      } catch (error) {
        setData({});
        reset({
          nguoidaidien: '',
          diachi: ''
        });
      } finally {
        setLoading(false);
      }
    };

    if (loading) getInfo();
  }, [reset, loading]);

  useEffect(() => {
    if (isUpdate)
      reset({
        nguoidaidien: data.nguoidaidien,
        diachi: data.diachi
      });
  }, [isUpdate, reset, data]);

  // Update
  const [showCancelUpdateModal, setShowCancelUpdateModal] = useState(false);

  // Handle show, close cancel update modal
  const handleShowCancelUpdateModal = () => setShowCancelUpdateModal(true);
  const handleCloseCancelUpdateModal = () => setShowCancelUpdateModal(false);

  // Handle cancel update modal
  const handleCancelUpdate = () => {
    navigate('/profile');
    setShowCancelUpdateModal(false);
  };

  // Handle update
  const handleUpdate = async value => {
    if (isSubmitting) return;

    try {
      const res = await recruiterAccountAPI.updateProfile(value);

      if (res.succeeded) {
        toast('Cập nhật thông tin thành công', {
          autoClose: timeOutToast
        });
      } else {
        toast('Cập nhật thông tin không thành công', {
          autoClose: timeOutToast
        });
      }
    } catch (error) {
      toast('Cập nhật thông tin không thành công', {
        autoClose: timeOutToast
      });
    } finally {
      navigate('/profile');
      setLoading(true);
    }
  };

  // Handle request extension
  const handleRequestExtension = async () => {
    try {
      const res = await recruiterAccountAPI.requestExtension();

      if (res.succeeded) {
        toast('Yêu cầu gia hạn đã được gửi đến Admin', {
          autoClose: timeOutToast
        });
        setLoading(true);
      } else {
        toast('Yêu cầu gia hạn chưa được gửi đến Admin', {
          autoClose: timeOutToast
        });
      }
    } catch (error) {
      toast('Yêu cầu gia hạn chưa được gửi đến Admin', {
        autoClose: timeOutToast
      });
    }
  };

  // Return JSX
  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <div className="wrap-management">
        <div className="wrap-management-header">
          <div className="wrap-management-header-title">HỒ SƠ CÁ NHÂN</div>
          {!isUpdate && (
            <div className="wrap-management-header-buttons">
              {!data.dahethan && (
                <Link to="/profile/update">
                  <Button className="btn-update">Chỉnh sửa</Button>
                </Link>
              )}
              {data.dahethan &&
                (data.yeuCauGiaHan ? (
                  <Button variant="success" className="btn-requested-extension">
                    Đã yêu cầu gia hạn
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    className="btn-request-extension"
                    onClick={handleRequestExtension}
                  >
                    Yêu cầu gia hạn
                  </Button>
                ))}
            </div>
          )}

          {isUpdate && (
            <div className="wrap-management-header-buttons">
              <Button
                variant="secondary"
                className="btn-cancel"
                onClick={handleShowCancelUpdateModal}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-save"
              >
                Lưu
              </Button>
            </div>
          )}
        </div>

        {/* Management body */}
        {!loading && (
          <div className="wrap-management-body detail">
            {/* Gray */}
            <div className="profile-gray">
              <div className="content-profile-item">
                <div className="profile-item">
                  <div className="profile-item-title">ID:</div>
                  <div className="profile-item-value">{data.id}</div>
                </div>
              </div>

              <div className="content-profile-item">
                <div className="img-sub-title"></div>
                <div className="profile-item">
                  <div className="profile-item-title">Số tin đăng:</div>
                  <div className="profile-item-value">{data.sotindang}</div>
                </div>
              </div>

              <div className="content-profile-item">
                <div className="img-sub-title"></div>
                <div className="profile-item">
                  <div className="profile-item-title">Ngày tạo tài khoản:</div>
                  <div className="profile-item-value">
                    {data.ngaytaotaikhoan}
                  </div>
                </div>
              </div>

              <div className="content-profile-item">
                <div className="img-sub-title"></div>
                <div className="profile-item">
                  <div className="profile-item-title">Ngày hết hạn:</div>
                  <div className="profile-item-value">
                    <span>{data.ngayhethan || 'Vĩnh viễn'}</span>
                    {data.dahethan && (
                      <span className="is-expired"> (Đã hết hạn)</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* White */}
            <div className="profile">
              <div className="profile-item">
                <div className="profile-item-title">Công ty:</div>
                <div className="profile-item-value">{data.tencongty}</div>
              </div>
              <div className="profile-item">
                <div className="profile-item-title">Người đại diện:</div>
                {isUpdate && (
                  <InputField control={control} name="nguoidaidien" />
                )}
                {!isUpdate && (
                  <div className="profile-item-value">{data.nguoidaidien}</div>
                )}
              </div>
              <div className="profile-item">
                <div className="profile-item-title">Địa chỉ:</div>
                {isUpdate && <InputField control={control} name="diachi" />}
                {!isUpdate && (
                  <div className="profile-item-value">{data.diachi}</div>
                )}
              </div>
              <div className="profile-item">
                <div className="profile-item-title">Email:</div>
                <div className="profile-item-value">{data.email}</div>
              </div>
              <div className="profile-item">
                <div className="profile-item-title">Số điện thoại:</div>
                <div className="profile-item-value">{data.sodienthoai}</div>
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="wrap-management-body">
            <div className="loading">
              <Spinner animation="border" />
            </div>
            <div className="loading-shadow"></div>
          </div>
        )}
      </div>

      {/* MODAL */}
      <ProfileCancelUpdateModal
        show={showCancelUpdateModal}
        onClose={handleCloseCancelUpdateModal}
        onSubmit={handleCancelUpdate}
      />
    </form>
  );
};

export default Profile;
