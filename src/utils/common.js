export const convertToSingleText = str => {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/đ/g, 'd')
		.replace(/Đ/g, 'd')
		.replace(/[^a-zA-Z0-9 ]/g, '')
		.replace(/\s+/g, ' ')
		.replace(/[\ ]/g, '-')
		.toLowerCase();
};

export const formatStringToDate = (string, type) => {
	let result;
	switch (type) {
		case 'dd/MM/yyyy': {
			let arr = string.split('/');
			result = new Date(arr[2], arr[1] - 1, arr[0]);
			break;
		}

		default:
			break;
	}

	return result;
};

export const formatDateToString = (date, type) => {
	// Day
	let day = date.getDate();
	if (day < 10) day = `0${day}`;

	// Month
	let month = date.getMonth() + 1;
	if (month < 10) month = `0${month}`;

	// Year
	const year = date.getFullYear();

	let result = '';
	switch (type) {
		case 'yyyy-MM-dd': {
			result = `${year}-${month}-${day}`;
			break;
		}
		default: {
			result = `${day}/${month}/${year}`;
		}
	}

	return result;
};

export const formatDateString = (string, type, typeTo) => {
	switch (type) {
		default: {
			let arr = string.split('/');

			switch (typeTo) {
				default: {
					return `${arr[2]}-${arr[1]}-${arr[0]}`;
				}
			}
		}
	}
};
