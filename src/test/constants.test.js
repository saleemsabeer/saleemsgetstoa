import { describe, it, expect } from 'vitest'
import { STORAGE_KEYS, ROUTES } from '../constants'

describe('constants', () => {
  it('exports STORAGE_KEYS with required keys', () => {
    expect(STORAGE_KEYS.PLATFORM_STATE).toBe('stoa_platform')
    expect(STORAGE_KEYS.EDITS).toBe('stoa_edits')
    expect(STORAGE_KEYS.BRAND_COLOR).toBe('stoa_brand_color')
  })

  it('exports ROUTES with base paths', () => {
    expect(ROUTES.HOME).toBe('/')
    expect(ROUTES.MUSEUM_DEMO).toBe('/demo/museum')
  })

  it('does not export medspa references', () => {
    expect(ROUTES.MEDSPA_DEMO).toBeUndefined()
  })

  it('has no duplicate storage key values', () => {
    const values = Object.values(STORAGE_KEYS)
    const unique = new Set(values)
    expect(values.length).toBe(unique.size)
  })
})
