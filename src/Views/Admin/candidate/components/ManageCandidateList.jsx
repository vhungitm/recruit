import { Tooltip } from "@mui/material";
import { selectCurrentUser } from "app/authSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header } from "Views/datatable";
export const ManageCandidateList = (props) => {
  const {
    tabId,
    headers,
    data,

    // Sort
    handleSort,

    //Handle
    handleShowModal,
  } = props;

  const isAdmin = useSelector(selectCurrentUser).roles.includes("SuperAdmin");

  return (
    <div className="datatable">
      <table>
        <Header headers={headers} onSorting={handleSort} />
        <tbody>
          {isAdmin
            ? data.map((item) => (
                <tr key={item.candidateId}>
                  <td>{item.hoten}</td>
                  <td>{item.email}</td>
                  <td>{item.sodienthoai}</td>
                  <td>{item.vitrilamviec}</td>
                  <td>{item.hinhthuclamviec}</td>
                  <td>{item.capbac}</td>
                  <td>{item.ngaytaotaikhoan}</td>
                  <td>
                    <div className="controls">
                      <Tooltip arrow title="Chi tiết">
                        <Link to={`/ManageCandidateDetail/${item.candidateId}`}>
                          <img
                            className="action"
                            src={
                              process.env.PUBLIC_URL +
                              `/Assets/images/candidate/Detail.png`
                            }
                            alt="View detail"
                          />
                        </Link>
                      </Tooltip>
                      <Tooltip arrow title="Khóa tài khoản">
                        <img
                          onClick={() => handleShowModal(item)}
                          className="action-detail "
                          src={`/Assets/images/candidate/${
                            tabId === 1 ? "block.png" : "unblock.png"
                          }`}
                          alt="Block"
                        />
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            : data.map((item) => (
                <tr key={item.candidateId}>
                  <td>{item.hoten}</td>
                  <td>{item.vitriungtuyen}</td>
                  <td>{item.hinhthuclamviec}</td>
                  <td>{item.capbac}</td>
                  <td>{item.mucluongmongmuon}</td>
                  <td>{item.hocvan}</td>
                  <td>
                    <div className="controls">
                      <Tooltip arrow title="Chi tiết">
                        <Link to={`/CandidateDetails/${item.candidateId}`}>
                          <img
                            className="action"
                            src={
                              process.env.PUBLIC_URL +
                              `/Assets/images/candidate/Detail.png`
                            }
                            alt="View detail"
                          />
                        </Link>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};
