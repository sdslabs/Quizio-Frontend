import { useMutation, useQueries, useQuery } from 'react-query';
import * as fetchers from './sectionFetcher';

export const useAddSection = () => useMutation(fetchers.addSectionToQuiz);

export const useGetSectionDetails = (sectionID) => useQuery([`getSection-${sectionID}`, sectionID],
	fetchers.getSectionDetails, { enabled: !!sectionID });

export const useUpdateSection = () => useMutation(fetchers.updateSectionDetails);

export const useDeleteSection = () => useMutation(fetchers.deleteSection);

export const useGetMultipleSections = (sectionIDs) => useQueries(sectionIDs.map((ID) => ({
	queryKey: [`getSection-${ID}`, ID],
	queryFn: fetchers.getSectionDetails,
})));

export const useGetMultipleSectionsWithAccessCode = (sectionIDs, accessCode) => useQueries(sectionIDs.map((ID) => ({
	queryKey: [`getSection-${ID}`, ID, accessCode],
	queryFn: fetchers.getSectionDetailsWithAccessCode,
})));
