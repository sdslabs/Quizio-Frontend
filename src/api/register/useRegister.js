import { useQuery, useMutation } from 'react-query';
import * as fetchers from './registrationFetcher';

export const useGetRegistrants = (quizID) => useQuery(['getRegistrants', quizID], fetchers.getAllRegistrants);

export const useRegisterParticipant = () => useMutation(fetchers.registerParticipant);

export const useUnregisterParticipant = () => useMutation(fetchers.unregisterParticipant);

export const useCheckIfUserIsRegisteredForQuiz = (quizID) => useQuery(
	[`isRegistedForQuiz-${quizID}`, quizID],
	fetchers.checkIfUserIsRegisteredForQuiz,
	{ enabled: !!quizID },
);

// find better file
export const useCheckAccessCode = (quizID, accessCode) => useQuery(
	[`isAccessCodeCorrect-${quizID}`, quizID, accessCode],
	fetchers.checkAccessCode,
	{ enabled: !!quizID },
);
