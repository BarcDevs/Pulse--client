# Store — Redux Toolkit

Global state management with redux-persist.

## Rules
- Create slices in `src/store/`
- Use Redux for app-wide state (auth, tokens)
- Use React Context for cross-cutting concerns
- Use hooks for local component state
- Use TanStack Query for server state

## Slices
- `authSlice` — User authentication state
- `tokenSlice` — CSRF token state
- One concern per slice

## Pattern
- Define type, initialState, createSlice with reducers
- Export actions and reducer
- Use selectors with useSelector hook
- Dispatch with useDispatch hook