import { yupResolver } from '@hookform/resolvers/yup';
import jobPostAPI from 'API/jobPostAPI.js';
import { selectCurrentUser } from 'app/authSlice';
import { BarChart } from 'Components/Chart';
import { format, subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { timeOutToast } from 'utils';
import 'SCSS/_jobPostDetail.scss';
import * as yup from 'yup';
import {
  JobPostApproveOrRestoreModal,
  JobPostCancelUpdateModal,
  JobPostCandidateModal,
  JobPostDeleteModal,
  JobPostDetailHeader,
  JobPostDetailInformation,
  JobPostDetailInterview,
  JobPostRejectModal,
  JobPostUpdateModal,
  JobPostUpdateStatusModal
} from './components';

const JobPostDetail = () => {
  const jobPostId = useParams();
  // Page type
  const pageType = window.location.pathname.includes('/detail/')
    ? 0
    : window.location.pathname.includes('/CreateNew')
    ? 1
    : window.location.pathname.includes('/update')
    ? 2
    : -1;

  const isAdmin = useSelector(selectCurrentUser).roles.includes('SuperAdmin');
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingAllIndex, setLoadingAllIndex] = useState(true);
  const [candidateListLoading, setCandidateListLoading] = useState(true);
  const [status, setStatus] = useState(-1);

  // Candidate
  const [candidateList, setCandidateList] = useState([]);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await jobPostAPI.fetch(jobPostId.id);
        if (res.succeeded) setAllData(res.data);
        else setAllData([]);
      } catch (error) {
        setAllData([]);
      } finally {
        setLoading(false);
      }
    };
    if (loading) fetchData();
  }, [jobPostId, loading]);

  // Handle show, close candidate list modal
  const handleShowCandidateModal = () => {
    if (candidateList.length > 0) setShowCandidateModal(true);
  };
  const handleCloseCandidateModal = () => setShowCandidateModal(false);

  // Select options data (Create/Update job post)
  const [workingStatusData, setWorkingStatusData] = useState([]);
  const [salaryDealData, setSalaryDealData] = useState([]);
  const [rankData, setRankData] = useState([]);
  const [degreeData, setDegreeData] = useState([]);
  const [locationData, setLocationData] = useState([]);

  // Form validation schema (Create/Update)
  const validationSchema = yup.object().shape({
    ngayhethan: isAdmin
      ? yup
          .date()
          .required('Vui l??ng nh???p ng??y h???t h???n')
          .typeError('Vui l??ng nh???p ng??y h???t h???n')
      : null,
    vitrituyendung: yup.string().required('Vui l??ng nh???p v??? tr?? tuy???n d???ng'),
    hinhthuclamviec: yup.string().required('Vui l??ng ch???n h??nh th???c l??m vi???c'),
    mucluong: yup.string().required('Vui l??ng ch???n m???c l????ng'),
    capbac: yup.string().required('Vui l??ng ch???n c???p b???c'),
    hocvan: yup.string().required('Vui l??ng ch???n h???c v???n'),
    soluong: yup
      .number('')
      .required('Vui l??ng nh???p s??? l?????ng')
      .typeError('Vui l??ng nh???p s??? l?????ng')
      .min(1, 'S??? l?????ng ph???i l???n h??n 0'),
    diadiem: yup.string().required('Vui l??ng ch???n ?????a ??i???m'),
    noinhan: yup
      .string()
      .email('N??i nh???n kh??ng h???p l???')
      .required('Vui l??ng nh???p n??i nh???n')
  });

  // Form (Create/Update)
  const {
    control,
    register,
    reset,
    getValues,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm({
    defaultValues: {
      jobPostId: 0,
      ngayhethan: new Date(),
      vitrituyendung: '',
      hinhthuclamviec: '',
      mucluong: '',
      capbac: '',
      hocvan: '',
      cankinhnghiem: false,
      soluong: 0,
      hotjob: false,
      diadiem: '',
      noinhan: '',
      phongvannhanh: false,
      phongvansang: false,
      buoisang_Tugio: '--:--',
      buoisang_Dengio: '--:--',
      phongvanchieu: false,
      buoichieu_Tugio: '--:--',
      buoichieu_Dengio: '--:--'
    },
    resolver: yupResolver(validationSchema)
  });

  // Description
  const [description, setDescription] = useState();
  const [readMore, setReadMore] = useState(false);

  // Effect update description
  useEffect(() => {
    setDescription(jobDetail.motachitiet);
  }, [jobDetail]);

  // Detail page function
  // Delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Handle show, clsoe delete modal
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  // Handle delete
  const handleDelete = async () => {
    try {
      const response = await jobPostAPI.delete(jobDetail.jobPostId);

      if (response.succeeded) {
        toast(
          <>
            ???? x??a tin s??? {jobDetail.id}
            <span className="undo-btn" onClick={handleUndoDelete}>
              Ho??n t??c
            </span>
          </>
        );
        navigate(`/jobPost?id=${status}`);
      } else {
        toast('X??a tin kh??ng th??nh c??ng', { autoClose: timeOutToast });
      }
    } catch (error) {
      toast('X??a tin kh??ng th??nh c??ng', { autoClose: timeOutToast });
    }
  };

  // Handle undo delete (Job post has been deleted)
  const handleUndoDelete = async () => {
    try {
      const res = await jobPostAPI.restore(jobDetail.jobPostId);

      if (res.succeeded === true) {
        toast(`???? ho??n t??c th??nh c??ng tin s??? ${jobDetail.id}`, {
          autoClose: timeOutToast
        });
      } else {
        toast(`Ho??n t??c kh??ng th??nh c??ng tin s??? ${jobDetail.id}`, {
          autoClose: timeOutToast
        });
      }
    } catch (error) {
      toast(`Ho??n t??c th??nh c??ng tin s??? ${jobDetail.id}`, {
        autoClose: timeOutToast
      });
    }
  };

  // Update status (hide/show)
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);

  // Handle close, show update status modal
  const handleShowUpdateStatusModal = () => setShowUpdateStatusModal(true);
  const handleCloseUpdateStatusModal = () => setShowUpdateStatusModal(false);

  // Handle click button update status
  const onUpdateStatus = () => {
    if (isAdmin) handleUpdateStatus();
    else {
      if (jobDetail.trangthaitin === 'Hi???n') handleShowUpdateStatusModal();
      else handleUpdateStatus();
    }
  };

  // Handle click button submit update status
  const onSubmitUpdateStatus = () => {
    setShowUpdateStatusModal(false);
    handleUpdateStatus();
  };

  // Handle update status (show/hide)
  const handleUpdateStatus = async () => {
    try {
      const response = await jobPostAPI.updateStatus(jobDetail.jobPostId);

      if (response.succeeded === true) {
        toast(`???? ${jobDetail.trangthaitin === 'Hi???n' ? '???n' : 'hi???n'} tin`, {
          autoClose: timeOutToast
        });
        setLoading(true);
      }
    } catch (error) {}
  };

  // Handle click update
  const onUpdate = () => {
    navigate(`/jobPost/update/${jobDetail.jobPostId}`);
  };

  // Approve
  const [showApproveOrRestoreModal, setShowApproveOrRestoreModal] =
    useState(false);

  // Handle show, close approve/restore modal
  const handleShowApproveOrRestoreModal = () =>
    setShowApproveOrRestoreModal(true);
  const handleCloseApproveOrRestoreModal = () =>
    setShowApproveOrRestoreModal(false);

  // Handle approve
  const handleApprove = async () => {
    try {
      const response = await jobPostAPI.approve([
        jobDetail.jobPostId.toString()
      ]);

      if (response.succeeded) {
        toast(`???? duy???t th??nh c??ng tin s??? ${jobDetail.id}`, {
          autoClose: timeOutToast
        });
        setLoading(true);
      } else {
        toast(`Duy???t tin kh??ng th??nh c??ng`, { autoClose: timeOutToast });
      }
    } catch (error) {
      toast(`Duy???t tin kh??ng th??nh c??ng`, { autoClose: timeOutToast });
    } finally {
      setShowApproveOrRestoreModal(false);
    }
  };
  // Handle restore
  const handleRestore = async () => {
    try {
      const response = await jobPostAPI.restore(jobDetail.jobPostId);

      if (response.succeeded) {
        toast(`???? kh??i ph???c th??nh c??ng tin s??? ${jobDetail.id}`, {
          autoClose: timeOutToast
        });
        navigate('/jobPost?id=3');
      } else {
        toast('Kh??i ph???c tin kh??ng th??nh c??ng', { autoClose: timeOutToast });
      }
    } catch (error) {
      toast('Kh??i ph???c tin kh??ng th??nh c??ng', { autoClose: timeOutToast });
    }
  };

  // Reject
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Handle show, close reject modal
  const handleShowRejectModal = () => setShowRejectModal(true);
  const handleCloseRejectModal = () => setShowRejectModal(false);

  // Handle reject
  const handleReject = async formValues => {
    try {
      let { reason, otherNormalReason, otherCriticalReason, isCriticalError } =
        formValues;
      reason =
        reason === 'Kh??c'
          ? otherNormalReason
          : reason === 'Kh??c2'
          ? otherCriticalReason
          : reason;

      console.log('jobPostId', jobPostId);
      console.log('reason', reason);
      console.log(' isCriticalError', isCriticalError);
      const response = await jobPostAPI.reject({
        jobPostId: jobDetail.jobPostId,
        reason: reason,
        isCriticalError: isCriticalError
      });
      console.log(response);
      if (response.succeeded) {
        toast(`???? kh??ng duy???t tin s??? ${jobDetail.id}`, {
          autoClose: timeOutToast
        });
        navigate('/jobPost?id=0');
      } else {
        toast('Kh??ng duy???t tin kh??ng th??nh c??ng', { autoClose: timeOutToast });
      }
    } catch (error) {
      toast('Kh??ng duy???t tin kh??ng th??nh c??ng', { autoClose: timeOutToast });
    } finally {
      setShowRejectModal(false);
    }
  };

  // Update
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Handle show, close update submit modal
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  // Handle create, create the draff and update for admin role and recruiter role
  const handleUpdate = async formValues => {
    let {
      jobPostId,
      ngayhethan,
      vitrituyendung,
      hinhthuclamviec,
      mucluong,
      capbac,
      hocvan,
      cankinhnghiem,
      soluong,
      hotjob,
      diadiem,
      noinhan,
      phongvannhanh,
      phongvansang,
      thoiluongphongvansang,
      buoisang_Tugio,
      buoisang_Dengio,
      phongvanchieu,
      thoiluongphongvanchieu,
      buoichieu_Tugio,
      buoichieu_Dengio,
      isSoanThao
    } = formValues;

    try {
      // Get id
      hinhthuclamviec = workingStatusData.filter(
        item => item.name === hinhthuclamviec
      )[0].id;
      mucluong = salaryDealData.filter(
        item => item.name === formValues.mucluong
      )[0].id;
      capbac = rankData.filter(item => item.name === formValues.capbac)[0].id;
      hocvan = degreeData.filter(item => item.name === formValues.hocvan)[0].id;
      diadiem = locationData.filter(item => item.name === formValues.diadiem)[0]
        .id;

      if (isAdmin) {
        // Check interview time
        if (phongvannhanh && !phongvansang && !phongvanchieu) {
          toast('Vui l??ng ch???n th???i gian ph???ng v???n nhanh', {
            autoClose: timeOutToast
          });
          return;
        }

        // Fix inter view time
        if (!phongvansang) {
          thoiluongphongvansang = undefined;
          phongvansang = undefined;
          buoisang_Tugio = undefined;
          buoisang_Dengio = undefined;
        }

        if (!phongvanchieu) {
          thoiluongphongvanchieu = undefined;
          phongvanchieu = undefined;
          buoichieu_Tugio = undefined;
          buoichieu_Dengio = undefined;
        }

        // Expiration date
        let expirationDate = ngayhethan;
        ngayhethan = expirationDate.getFullYear();
        ngayhethan += `-${expirationDate.getMonth() + 1}-`;
        ngayhethan += expirationDate.getDate();

        // New data
        const newJobPost = {
          jobPostId,
          ngayhethan,
          vitrituyendung,
          hinhthuclamviec,
          mucluong,
          capbac,
          hocvan,
          cankinhnghiem,
          soluong: soluong.toString(),
          hotjob,
          diadiem,
          noinhan,
          motachitiet: description,
          phongvannhanh,
          buoisang_Tugio,
          buoisang_Dengio,
          buoichieu_Tugio,
          buoichieu_Dengio,
          thoiluongphongvansang,
          thoiluongphongvanchieu
        };

        const res = await jobPostAPI.update(newJobPost);
        if (res.succeeded) {
          toast('C???p nh???t th??nh c??ng', { autoClose: timeOutToast });
          navigate('/jobPost/detail/' + jobDetail.jobPostId);
        } else {
          toast('C???p nh???t kh??ng th??nh c??ng', { autoClose: timeOutToast });
        }
      } else {
        // New data
        const newJobPost = {
          jobPostId,
          vitrituyendung,
          hinhthuclamviec,
          mucluong,
          capbac,
          hocvan,
          cankinhnghiem,
          soluong: soluong.toString(),
          hotjob,
          diadiem,
          noinhan,
          motachitiet: description,
          isSoanThao
        };

        const res = await jobPostAPI.create(newJobPost);

        if (res.succeeded) {
          if (isAdmin) {
            toast('C???p nh???t th??nh c??ng', { autoClose: timeOutToast });
            navigate('/jobPost/detail/' + jobDetail.jobPostId);
          } else {
            if (pageType === 1) {
              if (isSoanThao)
                toast(`???? l??u nh??p tin s??? ${res.data.jobPostId}`, {
                  autoClose: timeOutToast
                });
              else
                toast(`???? g???i tin s??? ${res.data.jobPostId} ????? duy???t`, {
                  autoClose: timeOutToast
                });

              navigate('/jobPost/detail/' + res.data.jobPostId);
            } else {
              toast(`???? g???i tin s??? ${jobDetail.id} ????? duy???t`, {
                autoClose: timeOutToast
              });
              navigate('/jobPost/detail/' + jobDetail.jobPostId);
            }
          }
        } else {
          if (isAdmin)
            toast('C???p nh???t kh??ng th??nh c??ng', { autoClose: timeOutToast });
          else {
            if (pageType === 1) {
              if (isSoanThao)
                toast(`Tin ????ng tuy???n kh??ng th??? l??u nh??p`, {
                  autoClose: timeOutToast
                });
              else
                toast(`Tin ????ng tuy???n kh??ng t???o ???????c`, {
                  autoClose: timeOutToast
                });
            } else
              toast(`G???i kh??ng th??nh c??ng tin s??? ${jobDetail.id} ????? duy???t`, {
                autoClose: timeOutToast
              });
          }
        }
      }
    } catch (error) {
      if (isAdmin)
        toast('C???p nh???t kh??ng th??nh c??ng', { autoClose: timeOutToast });
      else {
        if (pageType === 1) {
          if (isSoanThao)
            toast(`Tin ????ng tuy???n kh??ng th??? l??u nh??p`, {
              autoClose: timeOutToast
            });
          else
            toast(`Tin ????ng tuy???n kh??ng t???o ???????c`, { autoClose: timeOutToast });
        } else
          toast(`G???i kh??ng th??nh c??ng tin s??? ${jobDetail.id} ????? duy???t`, {
            autoClose: timeOutToast
          });
      }
    } finally {
      setLoading(true);
    }
  };

  // Cancel update
  const [showCancelUpdateModal, setShowCancelUpdateModal] = useState(false);

  // Handle show, close cancel update modal
  const handleShowCancelUpdateModal = () => setShowCancelUpdateModal(true);
  const handleCloseCancelUpdateModal = () => setShowCancelUpdateModal(false);

  // Handle click cancel update button
  const onCancelUpdate = () => {
    if (isAdmin) navigate(`/jobPost/detail/${jobDetail.jobPostId}`);
    else {
      if (pageType === 1) handleShowCancelUpdateModal();
      else navigate(`/jobPost/detail/${jobDetail.jobPostId}`);
    }
  };

  // Handle cancel update
  const handleCancelUpdate = () => {
    setShowCancelUpdateModal(false);
    if (pageType === 1) navigate('/jobPost?id=5');
    else navigate(`/jobPost/detail/${jobDetail.jobPostId}`);
  };

  // Handle click save button
  const onSave = e => {
    if (isAdmin) handleSubmit(handleUpdate)(e);
    else handleShowUpdateModal();
  };

  const onSubmitSaveDraff = e => {
    handleCloseCancelUpdateModal();
    handleSubmit(value => handleUpdate({ ...value, isSoanThao: true }))(e);
  };

  // Handle click submit save button
  const onSubmitSave = e => {
    setShowCancelUpdateModal(false);
    setShowUpdateModal(false);
    handleSubmit(handleUpdate)(e);
  };

  // Time interview now
  const ngayhethan = useWatch({ control, name: 'ngayhethan' });
  const phongvansang = useWatch({ control, name: 'phongvansang' });
  const phongvanchieu = useWatch({ control, name: 'phongvanchieu' });
  const phongvannhanh = useWatch({ control, name: 'phongvannhanh' });

  // Effect update data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jobPostAPI.fetch(id);
        const { data } = response;
        let {
          trangthaiduyet,
          cankinhnghiem,
          ngayhethan,
          hotjob,
          thoiluongphongvansang,
          buoisang_Tugio,
          buoisang_Dengio,
          thoiluongphongvanchieu,
          buoichieu_Tugio,
          buoichieu_Dengio
        } = data;

        // Update status
        if (trangthaiduyet.search('???? duy???t') >= 0) {
          setStatus(1);
        } else if (trangthaiduyet.includes('Ch??? duy???t')) {
          setStatus(0);
        } else if (trangthaiduyet.includes('H???t h???n')) {
          setStatus(2);
        } else if (trangthaiduyet.includes('???? x??a')) {
          setStatus(3);
        } else if (trangthaiduyet.includes('Kh??ng ???????c duy???t')) {
          setStatus(4);
        } else if (trangthaiduyet.includes('??ang so???n th???o')) {
          setStatus(5);
        }

        // Set expiration date
        const expirationDateArr = ngayhethan.split('/');
        let expirationDate = expirationDateArr[2];
        expirationDate += `-${expirationDateArr[1]}-`;
        expirationDate += expirationDateArr[0];
        expirationDate = new Date(expirationDate);

        // Set job post detail and form value
        setJobDetail(data);
        reset({
          ...data,
          ngayhethan: expirationDate,
          cankinhnghiem: cankinhnghiem !== '',
          hotjob: hotjob !== '',

          phongvansang: thoiluongphongvansang ? true : false,
          buoisang_Tugio: !buoisang_Tugio ? '--:--' : buoisang_Tugio,
          buoisang_Dengio: !buoisang_Dengio ? '--:--' : buoisang_Dengio,

          phongvanchieu: thoiluongphongvanchieu ? true : false,
          buoichieu_Tugio: !buoichieu_Tugio ? '--:--' : buoichieu_Tugio,
          buoichieu_Dengio: !buoichieu_Dengio ? '--:--' : buoichieu_Dengio
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    const fetchCandidates = async () => {
      try {
        setCandidateListLoading(true);
        const res = await jobPostAPI.fetchCandidateApplyList(id);

        if (res.succeeded) setCandidateList(res.data.list);
        else setCandidateList([]);
      } catch (error) {
      } finally {
        setCandidateListLoading(false);
      }
    };

    const fetchAllIndex = async () => {
      try {
        setLoadingAllIndex(true);
        const res = await jobPostAPI.fetchAllIndex(id);

        if (res.succeeded) {
          setWorkingStatusData(res.data.hinhthuclamviec);
          setSalaryDealData(res.data.mucluong);
          setRankData(res.data.capbac);
          setDegreeData(res.data.hocvan);
          setLocationData(res.data.diadiem);
        }
      } catch (error) {
      } finally {
        setLoadingAllIndex(false);
      }
    };

    if (loading) {
      if (pageType === 0 || pageType === 2) fetchData();
    }
    if (pageType === 1 || pageType === 2) fetchAllIndex();
    if (pageType === 0 || pageType === 2) fetchCandidates();
  }, [id, loading, pageType, reset, isAdmin]);

  // Chart
  const [chart, setChart] = useState();
  const [chartLoading, setChartLoading] = useState(true);
  const [chartType, setChartType] = useState(0);
  const [chartDate, setChartDate] = useState({
    startDate: subDays(new Date(), 31),
    endDate: new Date()
  });

  // Effect update chart
  useEffect(() => {
    const fetchChart = async () => {
      try {
        setChartLoading(true);
        let { startDate, endDate } = chartDate;
        startDate = format(startDate, 'yyyy-MM-dd');
        endDate = format(endDate, 'yyyy-MM-dd');

        const res = await jobPostAPI.fetchChart(
          jobDetail.jobPostId,
          startDate,
          endDate,
          chartType
        );

        if (res.succeeded) {
          const chartItem = res.data.chartItem;
          const labels = chartItem.map(item => item.timeLine);
          const totalViews = chartItem.map(item => item.totalView);
          const totalApplies = chartItem.map(item => item.totalApply);

          const newData = {
            labels,
            datasets: [
              {
                label: 'S??? l?????t xem',
                data: totalViews,
                backgroundColor: ['#108FCF'],
                stack: '1',
                barThickness: 16
              },
              {
                label: 'S??? l?????ng ???ng tuy???n',
                data: totalApplies,
                backgroundColor: ['#27AE60'],
                stack: '2',
                barThickness: 16
              }
            ]
          };

          setChart(newData);
        } else {
          setChart(null);
        }
      } catch (error) {
        setChart(null);
      } finally {
        setChartLoading(false);
      }
    };

    if (isAdmin && jobDetail) fetchChart();
  }, [chartType, chartDate, jobDetail, isAdmin]);

  // Return JSX
  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <div className="wrap-management detail">
        {/* Job Detail Header */}
        <JobPostDetailHeader
          pageType={pageType}
          isAdmin={isAdmin}
          jobPostId={jobDetail.jobPostId}
          status={status}
          trangthaitin={jobDetail.trangthaitin}
          // Update
          onCancelUpdate={onCancelUpdate}
          onSave={onSave}
          onSaveDraff={onSubmitSaveDraff}
          // Detail
          onUpdate={onUpdate}
          onUpdateStatus={onUpdateStatus}
          onApprove={handleShowApproveOrRestoreModal}
          onReject={handleShowRejectModal}
          onDelete={handleShowDeleteModal}
        />

        {/* Job Detail Body */}
        <div className="row wrap-management-body">
          {/* Wrap Left */}
          <JobPostDetailInformation
            loading={
              ((pageType === 0 || pageType === 2) && loading) ||
              ((pageType === 1 || pageType === 2) && loadingAllIndex)
            }
            pageType={pageType}
            isAdmin={isAdmin}
            jobDetail={jobDetail}
            status={status}
            // Use form
            control={control}
            errors={errors}
            register={register}
            setValue={setValue}
            // Read more
            readMore={readMore}
            setReadMore={setReadMore}
            // Description
            description={description}
            setDescription={setDescription}
            // Select data
            ngayhethan={ngayhethan}
            workingStatusData={workingStatusData}
            salaryDealData={salaryDealData}
            rankData={rankData}
            degreeData={degreeData}
            locationData={locationData}
            // Candiate list
            handleShowCandidateModal={handleShowCandidateModal}
          />

          {/* Wrap right */}
          {isAdmin && (
            <div className="col-lg-4 wrap-management-end">
              {/* Interview */}
              <JobPostDetailInterview
                pageType={pageType}
                loading={loading}
                jobDetail={jobDetail}
                control={control}
                register={register}
                setValue={setValue}
                getValues={getValues}
                reset={reset}
                trangthaiphongvannhanh={allData.trangthaiphongvannhanh}
                phongvannhanh={phongvannhanh}
                phongvansang={phongvansang}
                phongvanchieu={phongvanchieu}
              />

              {/* Note */}
              {status !== 1 && (
                <div className="note">
                  *T??nh n??ng Ph???ng v???n ngay ch??? ??p d???ng cho tin ????ng tuy???n ????
                  ???????c duy???t!
                </div>
              )}

              {/* Chart */}
              {!pageType && (
                <BarChart
                  loading={chartLoading}
                  title="BI???U ????? C???T TH??? HI???N S??? L?????NG NG?????I XEM TIN V?? ???NG TUY???N"
                  data={chart}
                  date={chartDate}
                  setDate={setChartDate}
                  type={chartType}
                  setType={setChartType}
                />
              )}
            </div>
          )}
        </div>

        {/* MODAL */}
        {/* Candidate List Modal */}
        <JobPostCandidateModal
          loading={candidateListLoading}
          show={showCandidateModal}
          candidateList={candidateList}
          onClose={handleCloseCandidateModal}
        />

        {/* Reject Modal */}
        <JobPostRejectModal
          showRejectModal={showRejectModal}
          handleCloseRejectModal={handleCloseRejectModal}
          handleReject={handleReject}
        />
        {/* Update Status Modal */}
        <JobPostUpdateStatusModal
          show={showUpdateStatusModal}
          onClose={handleCloseUpdateStatusModal}
          onSubmit={onSubmitUpdateStatus}
        />
        {/* Approve/Restore Modal */}
        <JobPostApproveOrRestoreModal
          isApprove={status === 0}
          show={showApproveOrRestoreModal}
          onClose={handleCloseApproveOrRestoreModal}
          onSubmit={status === 0 ? handleApprove : handleRestore}
        />
        {/* Delete Modal */}
        <JobPostDeleteModal
          isDeleted={status === 3}
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onSubmit={handleDelete}
        />
        {/* Cancel Update Modal */}
        <JobPostCancelUpdateModal
          show={showCancelUpdateModal}
          onClose={handleCloseCancelUpdateModal}
          onCancel={handleCancelUpdate}
          onSubmit={onSubmitSaveDraff}
        />

        {/* Update Modal */}
        <JobPostUpdateModal
          show={showUpdateModal}
          onClose={handleCloseUpdateModal}
          onSubmit={onSubmitSave}
        />
      </div>

      {/* Loading */}
      {(((pageType === 0 || pageType === 2) && loading) ||
        ((pageType === 1 || pageType === 2) && loadingAllIndex) ||
        (isAdmin && chartLoading)) && <div className="loading-shadow" />}
    </form>
  );
};

export default JobPostDetail;
