import { useMutation, useQuery } from 'react-query';
import * as fetchers from './sectionFetcher';

export const useAddSection = () => useMutation(fetchers.addSectionToQuiz);

export const useGetSectionDetails = (sectionId) => useQuery([`getSection-${sectionId}`, sectionId],
fetchers.getSectionDetails, { enabled: !!sectionId });

export const useUpdateSection = () => useMutation(fetchers.updateSectionDetails);

export const useDeleteSection = () => useMutation(fetchers.deleteSection);
