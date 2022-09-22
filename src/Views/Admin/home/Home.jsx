import homePageAPI from 'API/homePageAPI';
import { selectCurrentUser } from 'app/authSlice';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import 'SCSS/_chart.scss';
import 'SCSS/_home.scss';
import {
  ChartList,
  LatestJobList,
  TableTop,
  TotalHeaderList
} from './components';
import { headerTopCandidateTable, headerTopPostTable } from './Datas';

const Home = () => {
  // Effect update navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/') navigate('/home');
  }, [navigate]);

  // IsAdmin
  const isAdmin = useSelector(selectCurrentUser).roles.includes('SuperAdmin');

  // Effect update list total
  const [listTotalHeader, setListTotalHeader] = useState([]);
  const [listTotalHeaderLoading, setListTotalHeaderLoading] = useState(true);

  useEffect(() => {
    const getListTotalHeader = async () => {
      try {
        setListTotalHeaderLoading(true);
        const res = await homePageAPI.getListTotal();

        if (res.succeeded) setListTotalHeader(res.data.totalItem);
        else setListTotalHeader([]);
      } catch (error) {
        setListTotalHeader([]);
      } finally {
        setListTotalHeaderLoading(false);
      }
    };

    getListTotalHeader();
  }, []);

  // Effect update top job post applied
  const [listJobOnBoard, setListJobOnBoard] = useState([]);
  const [listJobOnBoardLoading, setListJobOnBoardLoading] = useState(true);

  useEffect(() => {
    const getListJobOnBoard = async () => {
      try {
        setListJobOnBoardLoading(true);
        const res = await homePageAPI.getListJobApplied();

        if (res.succeeded) setListJobOnBoard(res.data.jobItem);
        else setListJobOnBoard([]);
      } catch (error) {
        setListJobOnBoard([]);
      } finally {
        setListJobOnBoardLoading(false);
      }
    };

    if (isAdmin) getListJobOnBoard();
  }, [isAdmin]);

  // Effect update top position posted
  const [listPositionOnBoard, setListPositionOnBoard] = useState([]);
  const [listPositionOnBoardLoading, setListPositionOnBoardLoading] =
    useState(false);

  useEffect(() => {
    const getListPositionOnBoard = async () => {
      try {
        const res = await homePageAPI.getListJobRecruited();

        if (res.succeeded) setListPositionOnBoard(res.data.jobItem);
        else setListPositionOnBoard([]);
      } catch (error) {
        setListPositionOnBoard([]);
      } finally {
        setListPositionOnBoardLoading(false);
      }
    };

    if (isAdmin) getListPositionOnBoard();
  }, [isAdmin]);

  // Effect update list job latest
  const [listJobLatest, setListJobLatest] = useState([]);
  const [listJobLatestLoading, setListJobLatestLoading] = useState(false);

  useEffect(() => {
    const getListJobLatest = async () => {
      try {
        setListJobLatestLoading(true);
        const res = await homePageAPI.getListJobLatest(9);

        if (res.succeeded) setListJobLatest(res.data.jobItem);
        else setListJobLatest([]);
      } catch (error) {
        setListJobLatest([]);
      } finally {
        setListJobLatestLoading(false);
      }
    };

    if (!isAdmin) getListJobLatest();
  }, [isAdmin]);

  const loading =
    (isAdmin && (listJobOnBoardLoading || listPositionOnBoardLoading)) ||
    (!isAdmin && listJobLatestLoading) ||
    listTotalHeaderLoading;

  // Return JSX
  return (
    <div className="wrap-management">
      <div className="wrap-management-header">
        <div className="wrap-management-header-title">TRANG CHỦ</div>

        {!isAdmin && (
          <div className="wrap-management-header-buttons">
            <Link to="/jobPost/CreateNew">
              <Button className="add-new-jobpost">
                <img
                  src="/Assets/images/home/add-jobpost.png"
                  width={16}
                  height={16}
                  alt="add jobpost"
                />
                <span>Tạo tin mới</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="wrap-content row">
        <div
          className={
            !isAdmin
              ? 'col-lg-12 col-xl-8 wrap-left content-recruiter w-100'
              : 'col-lg-12 col-xl-8 wrap-left '
          }
        >
          <div className="card-header-left ">
            <TotalHeaderList
              data={listTotalHeader}
              loading={listTotalHeaderLoading}
            />
          </div>

          {/* Chart */}
          {isAdmin && <ChartList />}

          {/* List job latest */}
          {!isAdmin && (
            <LatestJobList
              data={listJobLatest}
              loading={listJobLatestLoading}
            />
          )}
        </div>
        {isAdmin && (
          <div className="col-lg-12 col-xl-4 wrap-right">
            <div className="card-header-right">
              <TableTop
                flagTable="jobpost"
                headers={headerTopCandidateTable}
                topLists={listJobOnBoard}
                loading={listJobOnBoardLoading}
                titleTopTable={
                  <p>
                    {'Bảng xếp hạng các tin được '}
                    <span className="text-orange">ứng tuyển</span>
                    {'  nhiều nhất'}
                  </p>
                }
              />
              <TableTop
                flagTable="position"
                headers={headerTopPostTable}
                topLists={listPositionOnBoard}
                titleTopTable={
                  <p>
                    {'Bảng xếp hạng các vị trí được '}
                    <span className="text-orange">đăng tuyển</span>
                    {'  nhiều nhất'}
                  </p>
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && <div className="loading-shadow" />}
    </div>
  );
};

export default Home;
