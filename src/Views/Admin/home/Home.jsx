import homePageAPI from 'API/homePageAPI';
import { selectCurrentUser } from 'app/authSlice';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import 'SCSS/_chart.scss';
import 'SCSS/_home.scss';
import { Card, ChartList, LatestJobList, TableTop } from './components';
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

	useEffect(() => {
		const getListTotalHeader = async () => {
			const res = await homePageAPI.getListTotal();
			setListTotalHeader(res.data?.totalItem || []);
		};

		getListTotalHeader();
	}, []);

	// Effect update top job post applied
	const [listJobOnBoard, setListJobOnBoard] = useState([]);

	useEffect(() => {
		const getListJobOnBoard = async () => {
			const resp = await homePageAPI.getListJobApplied();
			setListJobOnBoard(resp.data?.jobItem || []);
		};

		if (isAdmin) getListJobOnBoard();
	}, [isAdmin]);

	// Effect update top position posted
	const [listPositionOnBoard, setListPositionOnBoard] = useState([]);

	useEffect(() => {
		const getListPositionOnBoard = async () => {
			const resp = await homePageAPI.getListJobRecruited();
			setListPositionOnBoard(resp.data?.jobItem || []);
		};

		if (isAdmin) getListPositionOnBoard();
	}, [isAdmin]);

	// Effect update list job latest
	const [listJobLatest, setListJobLatest] = useState([]);

	useEffect(() => {
		const getListJobLatest = async () => {
			const res = await homePageAPI.getListJobLatest(9);

			setListJobLatest(res.data?.jobItem || []);
		};

		if (!isAdmin) getListJobLatest();
	}, [isAdmin]);

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
								<span>Thêm mới</span>
							</Button>
						</Link>
					</div>
				)}
			</div>
			<div className="wrap-content">
				<div className={!isAdmin ? 'wrap-left w-100' : 'wrap-left '}>
					<div className="card-header-left ">
						<div className="total-items">
							{listTotalHeader.map((data, index) => (
								<Card key={index} data={data} />
							))}
						</div>
					</div>

					{/* Chart */}
					{isAdmin && <ChartList />}

					{/* List job latest */}
					{!isAdmin && <LatestJobList data={listJobLatest} />}
				</div>
				{isAdmin && (
					<div className="wrap-right">
						<div className="card-header-right">
							<TableTop
								headers={headerTopCandidateTable}
								topLists={listJobOnBoard}
								titleTopTable={
									<p>
										{'Bảng xếp hạng các tin được '}
										<span className="text-orange">ứng tuyển</span>
										{'  nhiều nhất'}
									</p>
								}
							/>
							<TableTop
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
		</div>
	);
};

export default Home;
