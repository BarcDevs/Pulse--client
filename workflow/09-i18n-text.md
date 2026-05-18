# SCENARIO 9: Adding text with next-intl (i18n)

## Files
- Translation strings: `messages/en-US.json` **and** `messages/he-IL.json` (always update both)
- Locale key file: `src/locales/[feature]Locales.ts`

## Pattern

```typescript
// src/locales/goalsLocales.ts
export const goalsLocales = {
    overview: {
        title: 'goals.overview.title',
        filterButton: 'goals.overview.filterButton',
    },
    buttons: {
        create: 'goals.buttons.create',
        creating: 'goals.buttons.creating',
    }
} as const
```

```json
// messages/en-US.json (partial)
{
    "goals": {
        "overview": {
            "title": "Recovery Goals",
            "filterButton": "Filter"
        },
        "buttons": {
            "create": "Create goal",
            "creating": "Creating..."
        }
    }
}
```

**Client component usage:**
```typescript
import { useTranslations } from 'next-intl'
import { goalsLocales } from '@/locales/goalsLocales'

const t = useTranslations()
t(goalsLocales.overview.title)
```

**Server component usage:**
```typescript
import { getTranslations } from 'next-intl/server'

const t = await getTranslations()
```

## Constraints
- Always update **both** `en-US.json` and `he-IL.json`
- Keys in locales file are dot-path strings matching JSON structure: `'feature.section.key'`
- Locale file name: `[feature]Locales.ts` (camelCase feature name)
- Export: `const [feature]Locales = { ... } as const`
- Nested structure mirrors the JSON — group by page section or semantic group
- Button text: always include both `action` + `action + 'ing'` forms (create/creating, update/updating, delete/deleting)
- Never hardcode text strings in components — always go through `t(localeKey)`
- Never use `src/constants/componentTexts/` — that pattern is dead

## References
- `src/locales/goalsLocales.ts`
- `src/locales/settingsLocales.ts`
- `messages/en-US.json`
- `messages/he-IL.json`
