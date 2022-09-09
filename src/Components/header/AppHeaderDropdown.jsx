import {
	CDropdown,
	CDropdownItem,
	CDropdownMenu,
	CDropdownToggle
} from '@coreui/react';
import { authActions } from 'app/authSlice.js';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import authAPI from '../../API/authAPI.js';

const AppHeaderDropdown = props => {
	const dispatch = useDispatch();

	const handleLogout = async () => {
		await authAPI.logout();
		dispatch(authActions.setCurrentUser(null));
	};

	return (
		<CDropdown variant="nav-item" className="user">
			<CDropdownToggle placement="bottom-end" className="py-0" caret={true} >
				<div>
					<div className="username">{props.currentUser?.userName}</div>
					<div className="user-role">{props.currentUser?.roles}</div>
				</div>
			</CDropdownToggle>
			<CDropdownMenu className="pt-0" placement="bottom-end">
				<Link className="dropdown-item" to="/changePassword">
					Đổi mật khẩu
				</Link>
				<CDropdownItem onClick={handleLogout}>Đăng xuất</CDropdownItem>
			</CDropdownMenu>
		</CDropdown>
	);
};

export default AppHeaderDropdown;
