import { selectCurrentUser } from 'app/authSlice';
import { useSelector } from 'react-redux';

export const Card = props => {
	const { id, title, total } = props.data;
	const currentUser = useSelector(selectCurrentUser);

	const imgURL = {
		1: '/Assets/images/home/home-recruiting.png',
		2: '/Assets/images/home/home-interviewer.png',
		3: currentUser?.roles?.find(item => item === 'SuperAdmin')
			? '/Assets/images/home/home-recruiter.png'
			: '/Assets/images/home/home-jobpost.png'
	};

	return (
		<div className="total-item">
			<div className="total-item-content">
				<div className="total-item-title">{title}</div>
				<div className="total-item-value">{total}</div>
			</div>
			<div className="total-item-icon">
				<img src={imgURL[id]} alt={title} width={72} height={72} />
			</div>
		</div>
	);
};

export default Card;
