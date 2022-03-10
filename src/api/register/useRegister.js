import { useQuery, useMutation } from 'react-query';
import * as fetchers from './registrationFetcher';

export const useGetRegistrants = (quizId) => useQuery(['getRegistrants', quizId], fetchers.getAllRegistrants);

export const useRegisterParticipant = () => useMutation(fetchers.registerParticipant);

export const useUnregisterParticipant = () => useMutation(fetchers.unregisterParticipant);
