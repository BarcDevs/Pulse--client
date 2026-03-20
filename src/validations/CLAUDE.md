# Validations — Form & Data Validation

Zod schemas for type-safe form and data validation.

## Rules
- One schema per form in `src/validations/forms/`
- Use Zod for validation
- Combine with react-hook-form and zodResolver
- Use trimmed strings, length limits, enum validation

## Pattern
- Define schema as const
- Export schema for reuse in hooks and actions
- Use with useForm(zodResolver(schema))
- Provide meaningful error messages

## Files
- `src/validations/forms/` — Form validation schemas
- camelCase naming

## Integration
- Used with react-hook-form in components
- Used with API calls for server-side validation
- Used with route actions for mutation validation