export const truncateQuizName = (quiz) => {
	if (!quiz) { return quiz; }

	if (quiz.length <= 12) {
		return quiz;
	}
	return `${quiz.slice(0, 9)}...`;
};
export const a = 'a';
