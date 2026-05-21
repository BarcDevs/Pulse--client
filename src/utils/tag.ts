import type { PartialTag, Tag } from '@/types/community'

export const getTagName = (
    tag: Tag | PartialTag,
    lang: 'en' | 'he'
): string => tag.label?.[lang] || tag.label?.en || tag.slug
