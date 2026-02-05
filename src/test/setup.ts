import '@testing-library/dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cleanup nach jedem Test
afterEach(() => {
  cleanup()
})

// Mock für window.matchMedia (für responsive Tests)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
