import { CFormCheck } from '@coreui/react';
import { useState } from 'react';

export const Header = ({
	headers,
	checkAllClass,
	controlsClass,
	onSorting,
	tab,
	checkedAll,
	setCheckedAll
}) => {
	const [sortingField, setSortingField] = useState('');
	const [sortingOrder, setSortingOrder] = useState('asc');
	const onSortingChange = field => {
		const order =
			field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc';

		setSortingField(field);
		setSortingOrder(order);
		onSorting(field, order);
	};

	return (
		<thead>
			<tr>
				{tab === 'true' && (
					<th
						className={
							checkAllClass ? `checkAll ${checkAllClass}` : 'checkAll'
						}>
						<div className="checkAll">
							<CFormCheck
								id="jobIdList"
								checked={checkedAll}
								onChange={e => setCheckedAll(e.target.checked)}
							/>
						</div>
					</th>
				)}
				{headers.map(({ name, field, sortable }) => (
					<th
						key={name}
						onClick={() => (sortable ? onSortingChange(field) : null)}>
						<div className="item">
							{name}
							<img
								alt="order-icon"
								src={
									sortingOrder === 'asc'
										? process.env.PUBLIC_URL +
										  `/Assets/images/jobpost/sortIcon.png`
										: process.env.PUBLIC_URL +
										  `/Assets/images/jobpost/sortIcon.png`
								}
							/>
						</div>
					</th>
				))}
				<th align="center" className={controlsClass}>
					<div className="controls">Thao tác</div>
				</th>
			</tr>
		</thead>
	);
};
