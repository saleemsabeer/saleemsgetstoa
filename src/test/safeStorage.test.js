import { describe, it, expect, beforeEach, vi } from 'vitest'
import { safeGetItem, safeSetItem, safeRemoveItem } from '../utils/safeStorage'

// Create a proper localStorage mock since jsdom's may be incomplete
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = String(value) }),
    removeItem: vi.fn((key) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
    get length() { return Object.keys(store).length },
    key: vi.fn((i) => Object.keys(store)[i] ?? null),
    _reset() { store = {} },
  }
})()

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true })

describe('safeStorage', () => {
  beforeEach(() => {
    localStorageMock._reset()
    vi.clearAllMocks()
  })

  describe('safeGetItem', () => {
    it('returns parsed JSON for valid stored data', () => {
      localStorageMock.setItem('test', JSON.stringify({ name: 'Saleem' }))
      expect(safeGetItem('test')).toEqual({ name: 'Saleem' })
    })

    it('returns fallback when key does not exist', () => {
      expect(safeGetItem('missing', [])).toEqual([])
    })

    it('returns fallback for invalid JSON', () => {
      localStorageMock.setItem('bad', '{invalid json}')
      expect(safeGetItem('bad', 'default')).toBe('default')
    })

    it('returns null as default fallback', () => {
      expect(safeGetItem('missing')).toBeNull()
    })
  })

  describe('safeSetItem', () => {
    it('stores JSON data and returns true', () => {
      const result = safeSetItem('test', { count: 42 })
      expect(result).toBe(true)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('test', JSON.stringify({ count: 42 }))
    })

    it('returns false when localStorage throws (quota exceeded)', () => {
      localStorageMock.setItem.mockImplementationOnce(() => {
        throw new DOMException('QuotaExceededError')
      })
      const result = safeSetItem('test', 'data')
      expect(result).toBe(false)
    })
  })

  describe('safeRemoveItem', () => {
    it('removes an existing item', () => {
      localStorageMock.setItem('test', 'value')
      safeRemoveItem('test')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('test')
    })

    it('does not throw for non-existent keys', () => {
      expect(() => safeRemoveItem('missing')).not.toThrow()
    })
  })
})
