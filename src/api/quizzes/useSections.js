import { useMutation, useQuery } from 'react-query';
import * as fetchers from './sectionFetcher';

export const useAddSection = () => useMutation(fetchers.addSectionToQuiz);

export const useGetSectionDetails = (sectionId) => useQuery(['getSectionDetails', sectionId], fetchers.getSectionDetails);

export const useUpdateSection = () => useMutation(fetchers.updateSectionDetails);

export const useDeleteSection = () => useMutation(fetchers.deleteSection);
