import { CFormCheck } from '@coreui/react';
import { Switch } from '@mui/material';
import { SelectField } from 'Components/FormFields';
import { useState } from 'react';
import { FormCheck, Spinner } from 'react-bootstrap';
import { timeOptions } from '../datas';

export const JobPostDetailInterview = props => {
  const {
    pageType,
    loading,
    jobDetail,

    control,
    register,
    setValue,
    getValues,
    reset,
    trangthaiphongvannhanh,
    phongvannhanh,
    phongvansang,
    phongvanchieu
  } = props;

  // Time interview options
  const [morningTimeFromOptions, setMorningTimeFromOptions] = useState(
    timeOptions.morning
  );
  const [morningTimeToOptions, setMorningTimeToOptions] = useState(
    timeOptions.morning
  );
  const [afternoonTimeFromOptions, setAfternoonTimeFromOptions] = useState(
    timeOptions.afternoon
  );
  const [afternoonTimeToOptions, setAfternoonTimeToOptions] = useState(
    timeOptions.afternoon
  );

  // Handle change interview time
  const handleChangeInterviewTime = e => {
    const { name, value } = e.target;

    setValue(name, value);
    handleTimeOptions();
  };

  // Handle time options
  const handleTimeOptions = () => {
    handleMorningTimeOptions();
    handleAfternoonTimeOptions();
  };

  // Handle morning time options
  const handleMorningTimeOptions = () => {
    // Check session
    const morningInterview = getValues('phongvansang');
    if (!morningInterview) {
      setMorningTimeFromOptions([{ value: '--:--', label: '--:--' }]);
      setMorningTimeToOptions([{ value: '--:--', label: '--:--' }]);
      return;
    }

    const morningTimeOptions = timeOptions.morning;
    const morningTimeOptionsLength = morningTimeOptions.length;
    const morningInterviewTime = getValues('thoiluongphongvansang');
    const morningTimeFrom = getValues('buoisang_Tugio');
    const morningTimeFromIndex = morningTimeOptions.findIndex(
      item => item.value === morningTimeFrom
    );

    // Get morning time from options
    setMorningTimeFromOptions(
      morningTimeOptions.filter(
        (item, id) =>
          id >= 1 &&
          id <=
            morningTimeOptionsLength -
              (morningInterviewTime === '15'
                ? 2
                : morningInterviewTime === '30'
                ? 3
                : morningInterviewTime === '45'
                ? 4
                : 5)
      )
    );

    // Get morning time to options
    let morningTimeFromStartIndex = morningTimeFromIndex;
    morningTimeFromStartIndex +=
      morningInterviewTime === '15'
        ? 1
        : morningInterviewTime === '30'
        ? 2
        : morningInterviewTime === '45'
        ? 3
        : 4;
    const morningTimeToStep =
      morningInterviewTime === '15'
        ? 1
        : morningInterviewTime === '30'
        ? 2
        : morningInterviewTime === '45'
        ? 3
        : 4;
    let newMorningTimeToOptions = [];

    for (
      let i = morningTimeFromStartIndex;
      i < morningTimeOptionsLength;
      i += morningTimeToStep
    ) {
      newMorningTimeToOptions = [
        ...newMorningTimeToOptions,
        morningTimeOptions[i]
      ];
    }
    setMorningTimeToOptions(newMorningTimeToOptions);

    // Fix out options
    const morningTimeTo = getValues('buoisang_Dengio');
    const morningTimeToIndex = newMorningTimeToOptions.findIndex(
      item => item.value === morningTimeTo
    );

    if (morningTimeToIndex < 0) {
      setValue('buoisang_Dengio', newMorningTimeToOptions[0].value);
    }
  };

  // Handle afternoon time options
  const handleAfternoonTimeOptions = () => {
    // Check session
    const afternoonInterview = getValues('phongvanchieu');
    if (!afternoonInterview) {
      setAfternoonTimeFromOptions([{ value: '--:--', label: '--:--' }]);
      setAfternoonTimeToOptions([{ value: '--:--', label: '--:--' }]);
      return;
    }

    // Handle time options
    const afternoonTimeOptions = timeOptions.afternoon;
    const afternoonTimeOptionsLength = afternoonTimeOptions.length;
    const afternoonInterviewTime = getValues('thoiluongphongvanchieu');
    const afternoonTimeFrom = getValues('buoichieu_Tugio');
    const afternoonTimeFromIndex = afternoonTimeOptions.findIndex(
      item => item.value === afternoonTimeFrom
    );

    // Get afternoon time from options
    setAfternoonTimeFromOptions(
      afternoonTimeOptions.filter(
        (item, id) =>
          id >= 1 &&
          id <=
            afternoonTimeOptionsLength -
              (afternoonInterviewTime === '15'
                ? 2
                : afternoonInterviewTime === '30'
                ? 3
                : afternoonInterviewTime === '45'
                ? 4
                : 5)
      )
    );

    // Get afternoon time to options
    let afternoonTimeFromStartIndex = afternoonTimeFromIndex;
    afternoonTimeFromStartIndex +=
      afternoonInterviewTime === '15'
        ? 1
        : afternoonInterviewTime === '30'
        ? 2
        : afternoonInterviewTime === '45'
        ? 3
        : 4;
    const afternoonTimeToStep =
      afternoonInterviewTime === '15'
        ? 1
        : afternoonInterviewTime === '30'
        ? 2
        : afternoonInterviewTime === '45'
        ? 3
        : 4;
    let newAfternoonTimeToOptions = [];

    for (
      let i = afternoonTimeFromStartIndex;
      i < afternoonTimeOptionsLength;
      i += afternoonTimeToStep
    ) {
      newAfternoonTimeToOptions = [
        ...newAfternoonTimeToOptions,
        afternoonTimeOptions[i]
      ];
    }

    setAfternoonTimeToOptions(newAfternoonTimeToOptions);

    // Fix time out options
    const afternoonTimeTo = getValues('buoichieu_Dengio');
    const afternoonTimeToIndex = newAfternoonTimeToOptions.findIndex(
      item => item.value === afternoonTimeTo
    );

    if (afternoonTimeToIndex < 0) {
      setValue('buoichieu_Dengio', newAfternoonTimeToOptions[0].value);
    }
  };

  // Handle change session
  const handleChangeSession = e => {
    const { name, checked } = e.target;

    if (name === 'phongvansang') {
      reset({
        ...getValues(),
        phongvansang: checked,
        buoisang_Tugio: checked ? '09:00' : '--:--',
        buoisang_Dengio: checked ? '09:15' : '--:--',
        thoiluongphongvansang: checked ? '15' : ''
      });
    } else {
      reset({
        ...getValues(),
        phongvanchieu: checked,
        buoichieu_Tugio: checked ? '13:30' : '--:--',
        buoichieu_Dengio: checked ? '13:45' : '--:--',
        thoiluongphongvanchieu: checked ? '15' : ''
      });
    }

    handleTimeOptions();
  };

  // Handle change time from
  const handleChangeTimeFrom = e => {
    const { name, value } = e.target;

    setValue(name, value);
    handleTimeOptions();
  };

  // Handle change time to
  const handleChangeTimeTo = e => {
    const { name, value } = e.target;

    setValue(name, value);
    handleTimeOptions();
  };

  return (
    <div className="interview">
      <div className="interview-header">
        <div className="interview-header-tab"></div>
        <div className="interview-header-title">PH???NG V???N NHANH</div>
        {pageType === 2 ? (
          <Switch
            id="phongvannhanh"
            name="phongvannhanh"
            className="switch-interviewNow"
            color="primary"
            checked={phongvannhanh}
            {...register('phongvannhanh')}
          />
        ) : (
          <Switch
            id="phongvannhanh"
            name="phongvannhanh"
            className="switch-interviewNow"
            color="primary"
            checked={phongvannhanh}
          />
        )}
      </div>

      {/* Interview body */}
      {!loading && (
        <div className="interview-body">
          <div className="interview-infor">
            <p className="item-title">Tr???ng th??i:</p>
            <div
              dangerouslySetInnerHTML={{
                __html: `${trangthaiphongvannhanh}`
              }}
            />
          </div>

          {/* Interview time */}
          {pageType === 2 ? (
            <div className="interview-infor" onMouseOver={handleTimeOptions}>
              <div className="item-title">Khung th???i gian ph???ng v???n</div>
              {phongvannhanh ? (
                <div className="interview-body">
                  <div className="morning-interview-info">
                    <div className="morning-time-range">
                      <FormCheck
                        id="phongvansang"
                        {...register('phongvansang')}
                        onChange={handleChangeSession}
                      />
                      <div>S??ng:</div>
                      <SelectField
                        control={control}
                        name="buoisang_Tugio"
                        isDisabled={!phongvansang}
                        onChange={handleChangeTimeFrom}
                        options={morningTimeFromOptions}
                      />
                      <div className="time-to">-</div>
                      <SelectField
                        control={control}
                        name="buoisang_Dengio"
                        isDisabled={!phongvansang}
                        onChange={handleChangeTimeTo}
                        options={morningTimeToOptions}
                      />
                    </div>
                    <div className="morning-interview-time-range">
                      <div className="item-title">Th???i l?????ng ph???ng v???n</div>
                      <div className={`radio-check`}>
                        <CFormCheck
                          type="radio"
                          name="thoiluongphongvansang"
                          id="thoiluongphongvansang-15"
                          label="15 Ph??t"
                          value="15"
                          disabled={!phongvansang}
                          {...register('thoiluongphongvansang')}
                          onChange={handleChangeInterviewTime}
                        />
                        <CFormCheck
                          type="radio"
                          name="thoiluongphongvansang"
                          id="thoiluongphongvansang-30"
                          label="30 Ph??t"
                          value="30"
                          disabled={!phongvansang}
                          {...register('thoiluongphongvansang')}
                          onChange={handleChangeInterviewTime}
                        />
                        <CFormCheck
                          type="radio"
                          name="thoiluongphongvansang"
                          id="thoiluongphongvansang-45"
                          label="45 Ph??t"
                          value="45"
                          disabled={!phongvansang}
                          {...register('thoiluongphongvansang')}
                          onChange={handleChangeInterviewTime}
                        />
                        <CFormCheck
                          type="radio"
                          id="thoiluongphongvansang-60"
                          label="60 Ph??t"
                          value="60"
                          name="thoiluongphongvansang"
                          disabled={!phongvansang}
                          {...register('thoiluongphongvansang')}
                          onChange={handleChangeInterviewTime}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="afternoon-interview-info">
                    <div className="afternoon-time-range">
                      <CFormCheck
                        checked={phongvanchieu}
                        {...register('phongvanchieu')}
                        onChange={handleChangeSession}
                      />
                      <span>Chi???u:</span>
                      <SelectField
                        control={control}
                        name="buoichieu_Tugio"
                        isDisabled={!phongvanchieu}
                        onChange={handleChangeTimeFrom}
                        options={afternoonTimeFromOptions}
                      />
                      <span className="time-to">-</span>
                      <SelectField
                        control={control}
                        name="buoichieu_Dengio"
                        isDisabled={!phongvanchieu}
                        onChange={handleChangeTimeTo}
                        options={afternoonTimeToOptions}
                      />
                    </div>
                    <div className="afternoon-interview-time-range">
                      <div className="item-title">Th???i l?????ng ph???ng v???n</div>
                      <span className={`radio-check`}>
                        <CFormCheck
                          type="radio"
                          label="15 Ph??t"
                          value="15"
                          id="thoiluongphongvanchieu-15"
                          name="thoiluongphongvanchieu"
                          disabled={!phongvanchieu}
                          {...register('thoiluongphongvanchieu')}
                          onChange={handleChangeInterviewTime}
                        />
                        <CFormCheck
                          type="radio"
                          label="30 Ph??t"
                          value="30"
                          name="thoiluongphongvanchieu"
                          id="thoiluongphongvanchieu-30"
                          disabled={!phongvanchieu}
                          {...register('thoiluongphongvanchieu')}
                          onChange={handleChangeInterviewTime}
                        />
                        <CFormCheck
                          type="radio"
                          label="45 Ph??t"
                          value="45"
                          name="thoiluongphongvanchieu"
                          id="thoiluongphongvanchieu-45"
                          disabled={!phongvanchieu}
                          {...register('thoiluongphongvanchieu')}
                          onChange={handleChangeInterviewTime}
                        />
                        <CFormCheck
                          type="radio"
                          label="60 Ph??t"
                          value="60"
                          name="thoiluongphongvanchieu"
                          id="thoiluongphongvanchieu-60"
                          disabled={!phongvanchieu}
                          {...register('thoiluongphongvanchieu')}
                          onChange={handleChangeInterviewTime}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray">--</div>
              )}
            </div>
          ) : (
            <div className="interview-infor">
              <p className="item-title">Khung th???i gian ph???ng v???n</p>
              {jobDetail.phongvannhanh ? (
                <p
                  className="item-infor"
                  dangerouslySetInnerHTML={{
                    __html: jobDetail.khungthoigianphongvannhanh
                  }}
                ></p>
              ) : (
                <div className="text-gray">--</div>
              )}
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="interview-body">
          <div className="loading">
            <Spinner animation="border" />
          </div>
        </div>
      )}
    </div>
  );
};
