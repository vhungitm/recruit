import { CHeader, CHeaderDivider, CHeaderNav, CNavItem } from '@coreui/react';

import { selectCurrentUser } from 'app/authSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'SCSS/_appHeader.scss';
import { AppHeaderDropdown } from './header/index';
import { AppNotification } from './Notification/index';

const AppHeader = ({connection}) => {
	// Auth
	const currentUser = useSelector(selectCurrentUser);

	return (
		<CHeader position="sticky">
			<CHeaderNav>
				<CNavItem>
					<Link to="/home">
						<img
							src={process.env.PUBLIC_URL + `/logo192.png`}
							height={40}
							alt="logo"
						/>
					</Link>
				</CNavItem>
			</CHeaderNav>
			<CHeaderNav className="ms-auto">
				<AppNotification connection={connection}/>
				<AppHeaderDropdown currentUser={currentUser} />
			</CHeaderNav>
			<CHeaderDivider />
		</CHeader>
	);
};

export default AppHeader;
