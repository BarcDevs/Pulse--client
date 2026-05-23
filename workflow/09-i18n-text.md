# SCENARIO 9: Adding text with next-intl (i18n)

## Files
- Translation strings: `messages/en-US.json` **and** `messages/he-IL.json` (always update both)
- Locale key file: `src/locales/[feature]Locales.ts`

## Pattern

1. Create locale key file in `src/locales/[feature]Locales.ts` — export `const [feature]Locales` with nested dot-path strings
2. Add matching keys to `messages/en-US.json` AND `messages/he-IL.json` with translations
3. Client: `useTranslations()` → `t(featureLocales.section.key)`
4. Server: `getTranslations()` → `t(featureLocales.section.key)`

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
