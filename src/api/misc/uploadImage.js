import axiosInstance from '@api/axiosInstance';

export const uploadImage = async (image) => {
	try {
		const res = await axiosInstance.post('/utils/images', image);
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};

export const a = 'a';
