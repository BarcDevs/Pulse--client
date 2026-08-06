export type LegalListItem = {
    label?: string
    text: string
}

export type LegalListBlock = {
    list: LegalListItem[]
}

export type LegalCalloutTone = 'info' | 'warn'

export type LegalCalloutBlock = {
    callout: string
    tone: LegalCalloutTone
}

export type LegalTableBlock = {
    table: string[][]
}

export type LegalBlock =
    | string
    | LegalListBlock
    | LegalCalloutBlock
    | LegalTableBlock

export type LegalCalloutBlockRaw = Omit<LegalCalloutBlock, 'tone'>

export type LegalBlockRaw =
    | string
    | LegalListBlock
    | LegalCalloutBlockRaw
    | LegalTableBlock

export type LegalSectionContent = {
    title: string
    body: LegalBlock[]
}

export type LegalSectionContentRaw = {
    title: string
    body: LegalBlockRaw[]
}

export type LegalSection = LegalSectionContent & {
    id: string
}

export type LegalDocumentContent = {
    kicker: string
    title: string
    subtitle: string
}
