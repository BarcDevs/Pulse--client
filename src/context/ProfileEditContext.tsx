'use client'

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'

import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import { useQueryClient } from '@tanstack/react-query'

import type { Profile } from '@/types/profile'
import { LayoutProps } from '@/types/react'
import type { User } from '@/types/user'

import { useSaveSettings } from '@/hooks/mutations/useSaveSettings'
import { useUpdateUser } from '@/hooks/mutations/useUpdateUser'
import { useUser } from '@/hooks/ui/useUser'

import {
    clearProfileDraft,
    getProfileDraft,
    saveProfileDraft
} from '@/utils/profileDraft'

import { authQueryKeys } from '@/constants/queryKeys'

import { globalLocales } from '@/locales/globalLocales'
import { profileLocales } from '@/locales/profileLocales'
import { createProfileEditSchema }
    from '@/validations/forms/profileEditSchema'

type UserFields = {
    username: string
    firstName: string
    lastName: string
}

type ProfileFields = {
    location: string
    bio: string
    healthInterests: string[]
    activityPreferences: string[]
    dateOfBirth: string
    recoveryType: string
    careProvider: string
}

type ProfileEditContextValue = {
    isEditing: boolean
    startEdit: () => void
    cancelEdit: () => void
    handleSave: () => Promise<void>
    isSaving: boolean
    userFields: UserFields
    profileFields: ProfileFields
    updateUserField: <K extends keyof UserFields>(
        key: K, value: UserFields[K]
    ) => void
    updateProfileField: <K extends keyof ProfileFields>(
        key: K, value: ProfileFields[K]
    ) => void
    toggleProfileItem: (
        key: 'healthInterests' | 'activityPreferences',
        slug: string
    ) => void
    errors: Record<string, string>
    hasErrors: boolean
}

const EMPTY_USER: UserFields = {
    username: '',
    firstName: '',
    lastName: ''
}

const EMPTY_PROFILE: ProfileFields = {
    location: '',
    bio: '',
    healthInterests: [],
    activityPreferences: [],
    dateOfBirth: '',
    recoveryType: '',
    careProvider: ''
}

const ProfileEditContext =
    createContext<ProfileEditContextValue | null>(null)

export const ProfileEditProvider = ({
    children
}: LayoutProps) => {
    const t = useTranslations()
    const queryClient = useQueryClient()
    const { user } = useUser()
    const [isEditing, setIsEditing] = useState(false)
    const [userFields, setUserFields] = useState<UserFields>(EMPTY_USER)
    const [profileFields, setProfileFields] = useState<ProfileFields>(EMPTY_PROFILE)

    const {
        mutateAsync: updateUser,
        isPending: isUpdatingUser
    } = useUpdateUser()
    const {
        mutateAsync: saveSettings,
        isPending: isSavingSettings
    } = useSaveSettings()

    const updateUserField =
        <K extends keyof UserFields> (key: K, value: UserFields[K]) =>
        setUserFields((prev) => ({
            ...prev,
            [key]: value
        }))

    const updateProfileField =
        <K extends keyof ProfileFields> (key: K, value: ProfileFields[K]) =>
        setProfileFields((prev) => ({
            ...prev,
            [key]: value
        }))

    const toggleProfileItem = (
        key: 'healthInterests' | 'activityPreferences',
        slug: string
    ) =>
        setProfileFields((prev) => ({
            ...prev,
            [key]: prev[key].includes(slug)
                ? prev[key].filter((s) => s !== slug)
                : [...prev[key], slug]
        }))

    const startEdit = () => {
        const draft = user ? getProfileDraft(user.id) : null
        setUserFields({
            username: draft?.username ?? user?.username ?? '',
            firstName: draft?.firstName ?? user?.firstName ?? '',
            lastName: draft?.lastName ?? user?.lastName ?? ''
        })
        setProfileFields({
            location: draft?.location ?? user?.profile?.location ?? '',
            bio: draft?.bio ?? user?.profile?.bio ?? '',
            healthInterests: draft?.healthInterests ?? user?.profile?.healthInterests ?? [],
            activityPreferences: draft?.activityPreferences ?? user?.profile?.activityPreferences ?? [],
            dateOfBirth: draft?.dateOfBirth ?? (user?.dateOfBirth
                ? new Date(user.dateOfBirth).toISOString().split('T')[0]
                : ''),
            recoveryType: draft?.recoveryType ?? user?.recoveryType ?? '',
            careProvider: draft?.careProvider ?? user?.careProvider ?? ''
        })
        setIsEditing(true)
    }

    const cancelEdit = () => {
        setUserFields(EMPTY_USER)
        setProfileFields(EMPTY_PROFILE)
        setIsEditing(false)
        if (user) clearProfileDraft(user.id)
    }

    useEffect(() => {
        if (!isEditing || !user) return
        saveProfileDraft(user.id, { ...userFields, ...profileFields })
    }, [isEditing, user, userFields, profileFields])

    const schema = useMemo(() => createProfileEditSchema(t), [t])

    const errors = useMemo(() => {
        const result = schema.safeParse({
            username: userFields.username,
            firstName: userFields.firstName,
            lastName: userFields.lastName,
            location: profileFields.location,
            bio: profileFields.bio
        })
        if (result.success) return {}
        return Object.fromEntries(
            result.error.issues.map((issue) =>
                [String(issue.path[0]), issue.message])
        )
    }, [userFields, profileFields, schema])

    const hasErrors = Object.keys(errors).length > 0

    const handleSave = async () => {
        if (!user || hasErrors) return

        const userUpdates: Record<string, string> = {}
        if (userFields.username !== user.username)
            userUpdates.username = userFields.username
        if (userFields.firstName !== user.firstName)
            userUpdates.firstName = userFields.firstName
        if (userFields.lastName !== user.lastName)
            userUpdates.lastName = userFields.lastName

        const textUpdates: Record<string, string> = {}
        if (profileFields.location !== (user.profile?.location ?? ''))
            textUpdates.location = profileFields.location
        if (profileFields.bio !== (user.profile?.bio ?? ''))
            textUpdates.bio = profileFields.bio
        if (profileFields.recoveryType !== (user.recoveryType ?? ''))
            textUpdates.recoveryType = profileFields.recoveryType
        if (profileFields.careProvider !== (user.careProvider ?? ''))
            textUpdates.careProvider = profileFields.careProvider
        const currentDob = user.dateOfBirth
            ? new Date(user.dateOfBirth).toISOString().split('T')[0]
            : ''
        if (profileFields.dateOfBirth !== currentDob && profileFields.dateOfBirth)
            textUpdates.dateOfBirth = profileFields.dateOfBirth

        const prevUser = queryClient.getQueryData<User>(authQueryKeys.getMe)
        const prevProfile = queryClient.getQueryData<Profile>(authQueryKeys.profile)

        const profileChanged =
            Object.keys(textUpdates).length > 0
            || profileFields.healthInterests.join() !== (prevProfile?.healthInterests ?? []).join()
            || profileFields.activityPreferences.join() !== (prevProfile?.activityPreferences ?? []).join()

        queryClient.setQueryData<User>(authQueryKeys.getMe, (old) =>
            old ? {
                ...old,
                ...userUpdates,
                ...(profileFields.dateOfBirth && { dateOfBirth: new Date(profileFields.dateOfBirth) }),
                recoveryType: profileFields.recoveryType || undefined,
                careProvider: profileFields.careProvider || undefined
            } : old
        )
        queryClient.setQueryData<Profile>(authQueryKeys.profile, (old) => {
            if (!old) return old
            return {
                ...old,
                ...textUpdates,
                healthInterests: profileFields.healthInterests,
                activityPreferences: profileFields.activityPreferences
            }
        })

        setIsEditing(false)

        try {
            await Promise.all([
                Object.keys(userUpdates).length > 0
                    ? updateUser(userUpdates)
                    : Promise.resolve(),
                profileChanged
                    ? saveSettings({
                        ...textUpdates,
                        healthInterests: profileFields.healthInterests,
                        activityPreferences: profileFields.activityPreferences
                    })
                    : Promise.resolve()
            ])
            queryClient.invalidateQueries({ queryKey: authQueryKeys.profile })
            queryClient.invalidateQueries({ queryKey: authQueryKeys.getMe })
            setUserFields(EMPTY_USER)
            setProfileFields(EMPTY_PROFILE)
            if (user) clearProfileDraft(user.id)
        } catch {
            queryClient.setQueryData(authQueryKeys.getMe, prevUser)
            queryClient.setQueryData(authQueryKeys.profile, prevProfile)
            toast.error(t(profileLocales.toasts.saveFailed), {
                action: {
                    label: t(globalLocales.shared.retry),
                    onClick: () => void handleSave()
                }
            })
        }
    }

    const isSaving = isUpdatingUser || isSavingSettings

    const value: ProfileEditContextValue = {
        isEditing,
        startEdit,
        cancelEdit,
        handleSave,
        isSaving,
        userFields,
        profileFields,
        updateUserField,
        updateProfileField,
        toggleProfileItem,
        errors,
        hasErrors
    }

    return (
        <ProfileEditContext.Provider value={value}>
            {children}
        </ProfileEditContext.Provider>
    )
}

export const useProfileEditContext = () => {
    const ctx = useContext(ProfileEditContext)
    if (!ctx) throw new Error('useProfileEditContext must be used within ProfileEditProvider')
    return ctx
}
