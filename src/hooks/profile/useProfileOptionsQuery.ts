// TODO: TanStack Query setup pending
// import {useQuery} from '@tanstack/react-query'
// import {ProfileOptions} from '@/types/profile'
// import {hourInMs} from '@/constants/time'
// import {getProfileOptions} from '@/api/profile'

export const profileOptionsQueryKey = [
    'profile',
    'options'
] as const

// TODO: TanStack Query implementation pending
// export const useProfileOptionsQuery = () => {
//     return useQuery<ProfileOptions>({
//         queryKey: profileOptionsQueryKey,
//         queryFn: getProfileOptions,
//         staleTime: hourInMs
//     })
// }

// Temporary stub
export const useProfileOptionsQuery = () => ({})