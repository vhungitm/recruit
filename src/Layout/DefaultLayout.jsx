import { selectCurrentUser } from 'app/authSlice';
import { AppContent, AppHeader, AppSidebar } from 'Components/index';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DefaultLayout = ({ element, connection }) => {
	const currentUser = useSelector(selectCurrentUser);
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) navigate('/login');
	}, [currentUser, navigate]);

	return (
		currentUser && (
			<div className="admin">
				<AppSidebar />
				<div className="wrapper d-flex flex-column min-vh-100 bg-light">
					<AppHeader connection={connection} />
					<div className="body flex-grow-1">
						<AppContent element={element} connection={connection} />
					</div>
					{/* <AppFooter /> */}
				</div>
			</div>
		)
	);
};

export default DefaultLayout;
