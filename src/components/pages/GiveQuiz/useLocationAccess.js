import log from '@utils/log';
import { useEffect, useState } from 'react';

const useLocationAccess = ({ updateLogs, quizID, toast }) => {
	const [hasLocationAccess, setHasLocationAccess] = useState(false);
	const [location, setLocation] = useState({
		latitude: '',
		longitude: '',
	});

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
					updateLogs({
						body: {
							quizID,
							logType: 'Latitude',
							logData: position.coords.latitude,
						},
					});
					updateLogs({
						body: {
							quizID,
							logType: 'Longitude',
							logData: position.coords.longitude,
						},
					});
					setHasLocationAccess(true); // has location access
				},
				(locationError) => {
					log({ locationError });
					toast.error(
						'Please allow the location access for the quiz to start',
						{
							position: 'top-left',
							autoClose: false,
							hideProgressBar: true,
							closeOnClick: false,
							closeButton: false,
							progress: undefined,
							toastId: 'locationToast',
						},
					);
					setHasLocationAccess(false); // no location access
				},
			);
		} else {
			toast.error('Please allow the location access for the quiz to start', {
				position: 'top-left',
				autoClose: false,
				hideProgressBar: true,
				closeOnClick: false,
				closeButton: false,
				progress: undefined,
				toastId: 'locationToast',
			});
			setHasLocationAccess(false); // no location access
		}

		return () => { };
	}, []);

	return [hasLocationAccess, location];
};

export default useLocationAccess;
