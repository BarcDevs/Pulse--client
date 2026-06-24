import type { LocationSuggestion } from '@/types/location'

const NOMINATIM_SEARCH_URL = 'https://nominatim.openstreetmap.org/search'

export const searchLocations = async (
    query: string,
    signal?: AbortSignal
): Promise<LocationSuggestion[]> => {
    const url = `${NOMINATIM_SEARCH_URL}?format=json&addressdetails=0&limit=5&q=${encodeURIComponent(query)}`
    const response = await fetch(url, { signal })

    if (!response.ok) return []

    const results: { display_name: string }[] = await response.json()
    return results.map((result) => ({ label: result.display_name }))
}
