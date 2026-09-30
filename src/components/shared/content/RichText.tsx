import { GuardedLink } from '@/components/shared/content/GuardedLink'

import { RICH_TEXT_LINKS } from '@/constants/richText'

type RichTextProps = {
    text: string
    openInNewTab?: boolean
}

const TAG_PATTERN = /<(\w+)>(.*?)<\/\1>/g

export const RichText = ({
    text,
    openInNewTab = false
}: RichTextProps) => {
    const parts: (string | { tag: string, label: string })[] = []
    let lastIndex = 0

    for (const match of text.matchAll(TAG_PATTERN)) {
        if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
        parts.push({ tag: match[1], label: match[2] })
        lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) parts.push(text.slice(lastIndex))

    return (
        <>
            {parts.map((part, index) => {
                if (typeof part === 'string') return part

                const href = RICH_TEXT_LINKS[part.tag]

                if (!href) return part.label

                return (
                    <GuardedLink
                        key={`${part.tag}-${index}`}
                        href={href}
                        openInNewTab={openInNewTab}
                        className={'text-primary underline underline-offset-2 hover:text-primary/80'}
                    >
                        {part.label}
                    </GuardedLink>
                )
            })}
        </>
    )
}
