import { useMutation, useQueries, useQuery } from 'react-query';
import * as fetchers from './sectionFetcher';

export const useAddSection = () => useMutation(fetchers.addSectionToQuiz);

export const useGetSectionDetails = (sectionID, accessCode) => useQuery([`getSection-${sectionID}`, sectionID, accessCode],
	fetchers.getSectionDetails, { enabled: !!sectionID });

export const useUpdateSection = () => useMutation(fetchers.updateSectionDetails);

export const useDeleteSection = () => useMutation(fetchers.deleteSection);

export const useGetMultipleSections = (sectionIDs) => useQueries(sectionIDs.map((ID) => ({
	queryKey: [`getSection-${ID}`, ID],
	queryFn: fetchers.getSectionDetails,
})));
