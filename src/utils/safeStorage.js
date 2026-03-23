// Safe localStorage wrapper — handles quota exceeded, disabled storage, and parse errors

export function safeGetItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    console.warn(`localStorage.setItem failed for key "${key}":`, e.message)
    return false
  }
}

export function safeRemoveItem(key) {
  try {
    localStorage.removeItem(key)
  } catch {
    // silently fail
  }
}
