import { CFormCheck } from '@coreui/react';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Header } from 'Views/datatable';

export const ManageRecruiterList = props => {
  const {
    tabId,
    headers,
    recruiterAccountsData,

    // Checked item
    checkedAll,
    checkedIdList,

    setCheckedAll,
    handleCheckItem,

    // Sort
    handleSort,

    // Handle approve/extend
    handleShowExtendModal
  } = props;

  return (
    <div className="datatable scroll">
      <table className="w-1500">
        <Header
          headers={
            tabId === 2
              ? headers.approved
              : tabId === 1
              ? headers.waiting
              : tabId === 3
              ? headers.expired
              : headers.blocked
          }
          tab={tabId === 1 ? 'true' : 'false'}
          checkedAll={checkedAll}
          setCheckedAll={setCheckedAll}
          onSorting={handleSort}
        />
        <tbody>
          {recruiterAccountsData.map((item, index) => (
            <tr key={item.recruiterId}>
              {tabId === 1 && (
                <td className="checkBox">
                  <div className="checkBox">
                    <CFormCheck
                      value={item.recruiterId.toString()}
                      checked={
                        checkedIdList.findIndex(
                          recruiterId =>
                            recruiterId === item.recruiterId.toString()
                        ) >= 0
                      }
                      onChange={handleCheckItem}
                    />
                  </div>
                </td>
              )}
              <td className={`${tabId === 2 ? 'pl-16' : ''}`}>{item.id}</td>
              <td>{item.tencongty}</td>
              <td>{item.email}</td>
              <td>{item.sodienthoai}</td>
              {tabId !== 1 && (
                <td className={`${tabId === 0 ? 'width-320' : ''}`}>
                  {item.sotindang}
                </td>
              )}
              <td>{item.ngaytaotaikhoan}</td>
              {tabId === 0 && <td>{item.lantruycapcuoi}</td>}
              {(tabId === 2 || tabId === 3) && <td>{item.ngayhethan}</td>}
              {tabId === 3 && (
                <>
                  <td>{item.solangiahan}</td>
                  <td>
                    {item.yeucaugiahan && (
                      <img
                        class="isExperience"
                        src="/Assets/images/jobpost/isExperience.png"
                        alt="isExperience"
                      />
                    )}
                  </td>
                </>
              )}
              <td>
                <div
                  className={
                    index % 2 === 0 ? 'controls bg-white' : 'controls bg-gray'
                  }
                >
                  <Tooltip arrow title="Chi tiết">
                    <Link to={`/manageRecruiter/detail/${item.recruiterId}`}>
                      <img
                        className="action"
                        src="/Assets/images/jobpost/view-detail.png"
                        alt="View detail"
                      />
                    </Link>
                  </Tooltip>
                  {tabId === 1 && (
                    <Tooltip arrow title="Duyệt">
                      <img
                        className="action-detail"
                        src="/Assets/images/jobpost/approved.png"
                        alt="Approve"
                        onClick={() => {
                          handleShowExtendModal(item);
                        }}
                      />
                    </Tooltip>
                  )}
                  {tabId === 3 && (
                    <Tooltip arrow title="Gia hạn">
                      <img
                        className="action-detail"
                        src={
                          item.yeucaugiahan
                            ? '/Assets/images/recruiter/expired-icon.png'
                            : '/Assets/images/recruiter/expired-disable-icon.png'
                        }
                        alt="Extend"
                        onClick={() => {
                          if (item.yeucaugiahan) handleShowExtendModal(item);
                        }}
                      />
                    </Tooltip>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
