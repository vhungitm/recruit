import { CFormCheck } from '@coreui/react';
import { Tooltip } from '@mui/material';
import { selectCurrentUser } from 'app/authSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from 'Views/datatable';

export const JobPostList = props => {
  const {
    tabId,
    headers,
    data,

    // Checked item
    checkedAll,
    checkedIdList,

    setCheckedAll,
    handleCheckItem,
    // Sort
    handleSort,

    // Handle
    handleShowApproveOrRestoreModal,
    handleUpdateStatus,
    handleShowDeleteModal
  } = props;

  // Is admin role
  const isAdmin = useSelector(selectCurrentUser).roles.includes('SuperAdmin');

  // Return JSX
  return (
    <div className="datatable scroll">
      <table className="w-2000">
        <Header
          headers={
            tabId === 1
              ? headers.approved
              : tabId === 0
              ? headers.waiting
              : tabId === 2
              ? headers.expried
              : tabId === 4
              ? headers.rejected
              : tabId === 5
              ? headers.draffing
              : headers.deleted
          }
          checkAllClass={tabId === 0 ? 'sticky' : ''}
          controlsClass={tabId === 2 ? 'sticky th-2' : 'sticky'}
          tab={isAdmin && (tabId === 0 ? 'true' : 'false')}
          checkedAll={checkedAll}
          setCheckedAll={setCheckedAll}
          onSorting={handleSort}
        />
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              {isAdmin && tabId === 0 && (
                <td className="checkBox sticky">
                  <div
                    className={
                      index % 2 === 0 ? 'checkBox bg-white' : 'checkBox bg-gray'
                    }
                  >
                    <CFormCheck
                      value={item.jobPostId.toString()}
                      checked={
                        checkedIdList.findIndex(
                          jobPostId => jobPostId === item.jobPostId.toString()
                        ) >= 0
                      }
                      onChange={handleCheckItem}
                    />
                  </div>
                </td>
              )}

              <td>{item.id}</td>

              {isAdmin &&
                (tabId === 0 || tabId === 1 || tabId === 2 || tabId === 3) && (
                  <td>{item.tencongty}</td>
                )}

              <td>
                <div>
                  {item.vitrituyendung}
                  {item.hotjob && (
                    <img
                      src="/Assets/images/jobpost/hotjob.png"
                      alt="hot job"
                      className="hotjob"
                    />
                  )}
                </div>
              </td>
              <td>
                <div className="item">{item.mucluong}</div>
              </td>

              {(tabId === 1 || tabId === 2 || tabId === 3) && (
                <td className={tabId === 0 ? 'd-none' : ''}>
                  {item.daungtuyen}
                </td>
              )}

              <td>{item.soluong}</td>

              {isAdmin && (
                <td className={tabId === 1 ? '' : 'd-none'}>
                  <div className="item">
                    {item.phongvannhanh === 'Kh??ng ??p d???ng' ? (
                      <div className="itemPVN">
                        <div className="dot dot-gray"></div>
                        <span className="gray">Kh??ng ??p d???ng</span>
                      </div>
                    ) : item.phongvannhanh === '???? l??n l???ch' ? (
                      <div className="itemPVN">
                        <div className="dot dot-green"></div>
                        <span className="green">???? l??n l???ch</span>
                      </div>
                    ) : item.phongvannhanh === '???? nh???n y??u c???u' ? (
                      <div className="itemPVN">
                        <div className="dot dot-blue"></div>
                        <span className="blue">???? nh???n y??u c???u</span>
                      </div>
                    ) : item.phongvannhanh === '??ang di???n ra' ? (
                      <div className="itemPVN">
                        <div className="dot dot-orange"></div>
                        <span className="orange">??ang di???n ra</span>
                      </div>
                    ) : (
                      <div className="itemPVN">
                        <div className="dot dot-gray"></div>
                        <span className="gray">Kh??ng x??c ?????nh</span>
                      </div>
                    )}
                  </div>
                </td>
              )}

              <td>
                {item.cankinhnghiem && (
                  <img
                    className="isExperience"
                    src="/Assets/images/jobpost/isExperience.png"
                    alt="is experience"
                  />
                )}
              </td>
              <td>{item.hinhthuclamviec}</td>
              <td>
                <div className="item">{item.diadiem}</div>
              </td>

              {(tabId === 1 || tabId === 2 || tabId === 3) && (
                <td>{item.ngayhethan}</td>
              )}

              <td>{item.noinhan}</td>
              <td className={tabId === 2 ? 'sticky td-2' : 'sticky'}>
                <div
                  className={
                    index % 2 === 0 ? 'controls bg-white' : 'controls bg-gray'
                  }
                >
                  <Tooltip arrow title="Chi ti???t">
                    <Link to={`/jobPost/detail/${item.jobPostId}`}>
                      <img
                        className="action"
                        src="/Assets/images/jobpost/view-detail.png"
                        alt="view-detail"
                      />
                    </Link>
                  </Tooltip>
                  {isAdmin && tabId === 0 && (
                    <Tooltip arrow title="Duy???t">
                      <img
                        onClick={() => handleShowApproveOrRestoreModal(item)}
                        className="action"
                        src="/Assets/images/jobpost/approved.png"
                        alt="approve"
                      />
                    </Tooltip>
                  )}
                  {tabId === 1 && (
                    <Tooltip
                      arrow
                      title={item.trangthaitin ? '???n tin' : 'Hi???n tin'}
                    >
                      <img
                        onClick={() => handleUpdateStatus(item)}
                        className="action"
                        src={
                          item.trangthaitin
                            ? '/Assets/images/jobpost/unpublish.png'
                            : '/Assets/images/jobpost/publish.png'
                        }
                        alt="unpublish"
                      />
                    </Tooltip>
                  )}
                  {tabId === 3 && (
                    <Tooltip arrow title="Kh??i ph???c">
                      <img
                        onClick={() => handleShowApproveOrRestoreModal(item)}
                        className="action"
                        src="/Assets/images/jobpost/restore.png"
                        alt="restore"
                      />
                    </Tooltip>
                  )}
                  {!isAdmin ? (
                    tabId === 5 && (
                      <Tooltip arrow title="X??a tin">
                        <img
                          onClick={() => handleShowDeleteModal(item)}
                          className="action"
                          src="/Assets/images/jobpost/delete.png"
                          alt="delete"
                        />
                      </Tooltip>
                    )
                  ) : (
                    <Tooltip arrow title="X??a tin">
                      <img
                        onClick={() => handleShowDeleteModal(item)}
                        className="action"
                        src="/Assets/images/jobpost/delete.png"
                        alt="delete"
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
