import { useMutation, useQueries, useQuery } from 'react-query';
import * as fetchers from './sectionFetcher';

export const useAddSection = () => useMutation(fetchers.addSectionToQuiz);

export const useGetSectionDetails = (sectionId) => useQuery([`getSection-${sectionId}`, sectionId],
fetchers.getSectionDetails, { enabled: !!sectionId });

export const useGetMultipleSections = (sectionIds) => useQueries(sectionIds.map((id) => ({
 queryKey: [`getSection-${id}`, id],
 queryFn: fetchers.getSectionDetails,
})));

export const useUpdateSection = () => useMutation(fetchers.updateSectionDetails);

export const useDeleteSection = () => useMutation(fetchers.deleteSection);
