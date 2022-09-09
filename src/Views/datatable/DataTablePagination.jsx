import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Select from 'react-select';

export const DataTablePagination = ({
	// Pagination
	totalItems = 0,
	currentPage = 1,
	handleChangePage
}) => {
	// Items per page
	const itemsPerPageOptions = [
		{ value: 10, label: 10 },
		{ value: 20, label: 20 },
		{ value: 30, label: 30 },
		{ value: 40, label: 40 },
		{ value: 50, label: 50 }
	];

	const [selectedItemsPerPage, setSelectedItemsPerPage] = useState({
		value: 10,
		label: 10
	});

	const handleChangeItemsPerPage = value => {
		setSelectedItemsPerPage(value);
		handleChangePage(value.value, currentPage);
	};

	useEffect(() => {
		setTotalPages(Math.ceil(totalItems / selectedItemsPerPage.value));
	}, [totalItems, selectedItemsPerPage.value]);

	// page
	const paginationItems = [];
	const [totalPages, setTotalPages] = useState(0);

	const onPageChange = page => {
		handleChangePage(selectedItemsPerPage.value, page);
	};

	for (let i = 1; i <= totalPages; i++) {
		paginationItems.push(
			<Pagination.Item
				key={i}
				active={i === currentPage}
				onClick={() => onPageChange(i)}
			>
				{i}
			</Pagination.Item>
		);
	}

	// Return
	return (
		<>
			<div className={'wrap-pagination'}>
				<div className="d-flex">
					{
						<div className="itemPerPage">
							<span className="item"> Số lượng hiển thị</span>
							<div className="select-item-per-page">
								<Select
									id="demo-simple-select"
									className="react-select-container"
									classNamePrefix="react-select"
									value={selectedItemsPerPage}
									options={itemsPerPageOptions}
									onChange={handleChangeItemsPerPage}
								/>
							</div>

							<span className="totalItem">
								trong tổng số {totalItems} dữ liệu
							</span>
						</div>

					}
				</div>

				{totalPages > 1 && (
					<Pagination>
						<Pagination.First
							onClick={() => onPageChange(1)}
							disabled={currentPage === 1}
						/>
						<Pagination.Prev
							onClick={() => onPageChange(currentPage - 1)}
							disabled={currentPage === 1}
						/>
						{paginationItems}
						<Pagination.Next
							onClick={() => onPageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
						/>
						<Pagination.Last
							onClick={() => onPageChange(totalPages)}
							disabled={currentPage === totalPages}
						/>
					</Pagination>
				)}
			</div>
		</>
	);
};
