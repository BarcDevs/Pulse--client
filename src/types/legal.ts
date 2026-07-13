export type LegalListItem = {
    label?: string
    text: string
}

export type LegalListBlock = {
    list: LegalListItem[]
}

export type LegalCalloutBlock = {
    callout: string
    tone?: 'info' | 'warn'
}

export type LegalTableBlock = {
    table: string[][]
}

export type LegalBlock =
    | string
    | LegalListBlock
    | LegalCalloutBlock
    | LegalTableBlock

export type LegalSectionContent = {
    title: string
    body: LegalBlock[]
}

export type LegalSection = LegalSectionContent & {
    id: string
}

export type LegalDocumentContent = {
    kicker: string
    title: string
    subtitle: string
}
