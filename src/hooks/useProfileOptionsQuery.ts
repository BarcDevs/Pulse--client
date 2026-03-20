import {useQuery} from '@tanstack/react-query'

import {ProfileOptions} from '@/types/profile'

import {hourInMs} from '@/constants/time'

import {getProfileOptions} from '@/api/profile'

export const profileOptionsQueryKey = [
    'profile',
    'options'
] as const

export const useProfileOptionsQuery = () => {
    return useQuery<ProfileOptions>({
        queryKey: profileOptionsQueryKey,
        queryFn: getProfileOptions,
        staleTime: hourInMs
    })
}