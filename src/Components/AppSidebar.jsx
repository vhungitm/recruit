import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { AppSidebarNav } from './AppSidebarNav';
import { selectSystemSidebar, systemActions } from 'app/systemSlice';
import navigation from '_nav';
import { selectCurrentUser } from 'app/authSlice';

const AppSidebar = () => {
	const sidebar = useSelector(selectSystemSidebar);
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);

	const handleNarrowSidebar = () => dispatch(systemActions.setNarrowSidebar());

	return (
		<CSidebar
			position="fixed"
			unfoldable={sidebar.unfoldable}
			narrow={sidebar.narrow}
		>
			<CSidebarBrand>
				<div
					className={`btn-narrow-sidebar${sidebar.narrow ? ' narrow' : ''}`}
					onClick={handleNarrowSidebar}
				></div>
			</CSidebarBrand>
			<CSidebarNav>
				<SimpleBar>
					<AppSidebarNav
						items={
							currentUser?.roles?.find(item => item === 'SuperAdmin')
								? navigation.SuperAdmin
								: navigation.Basic
						}
					/>
				</SimpleBar>
			</CSidebarNav>
		</CSidebar>
	);
};

export default React.memo(AppSidebar);
