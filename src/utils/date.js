function convertToAMPM(hours, minutes) {
	return `${hours % 12 || 12}:${minutes === 0 ? '00' : minutes} ${(hours < 12 || hours === 24) ? 'AM' : 'PM'}`;
}

export const getDateTime = (timestamp) => {
	const date = new Date(timestamp);
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	return `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()} 
	${convertToAMPM(date.getHours(), date.getMinutes())}`;
};

export const a = 'a';
