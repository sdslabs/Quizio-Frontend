import { useMutation, useQuery } from 'react-query';
import * as fetchers from './sectionFetcher';

export const useAddSection = () => useMutation(fetchers.addSectionToQuiz);

export const useGetSectionDetails = (sectionID) => useQuery([`getSection-${sectionID}`, sectionID],
	fetchers.getSectionDetails, { enabled: !!sectionID });

export const useUpdateSection = () => useMutation(fetchers.updateSectionDetails);

export const useDeleteSection = () => useMutation(fetchers.deleteSection);
