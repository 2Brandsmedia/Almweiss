import { describe, it, expect } from 'vitest'
import {
  getEasterSunday,
  addDays,
  getHolidaysNRW,
  getAllHolidays,
  getHolidayName,
} from './holidays'

describe('holidays', () => {
  describe('getEasterSunday', () => {
    it('berechnet Ostern 2024 korrekt', () => {
      const easter = getEasterSunday(2024)
      expect(easter.getDate()).toBe(31)
      expect(easter.getMonth()).toBe(2) // März = 2
    })

    it('berechnet Ostern 2025 korrekt', () => {
      const easter = getEasterSunday(2025)
      expect(easter.getDate()).toBe(20)
      expect(easter.getMonth()).toBe(3) // April = 3
    })

    it('berechnet Ostern 2026 korrekt', () => {
      const easter = getEasterSunday(2026)
      expect(easter.getDate()).toBe(5)
      expect(easter.getMonth()).toBe(3) // April = 3
    })
  })

  describe('addDays', () => {
    it('addiert Tage korrekt', () => {
      const date = new Date(2024, 0, 1) // 1. Januar 2024
      const result = addDays(date, 5)
      expect(result.getDate()).toBe(6)
    })

    it('subtrahiert Tage korrekt (negative Werte)', () => {
      const date = new Date(2024, 0, 10)
      const result = addDays(date, -5)
      expect(result.getDate()).toBe(5)
    })

    it('wechselt Monate korrekt', () => {
      const date = new Date(2024, 0, 31) // 31. Januar
      const result = addDays(date, 1)
      expect(result.getMonth()).toBe(1) // Februar
      expect(result.getDate()).toBe(1)
    })
  })

  describe('getHolidaysNRW', () => {
    it('enthält alle festen Feiertage', () => {
      const holidays = getHolidaysNRW(2024)
      const names = holidays.map(h => h.name)

      expect(names).toContain('Neujahr')
      expect(names).toContain('Tag der Arbeit')
      expect(names).toContain('Tag der Deutschen Einheit')
      expect(names).toContain('Allerheiligen')
      expect(names).toContain('1. Weihnachtstag')
      expect(names).toContain('2. Weihnachtstag')
    })

    it('enthält bewegliche Feiertage', () => {
      const holidays = getHolidaysNRW(2024)
      const names = holidays.map(h => h.name)

      expect(names).toContain('Karfreitag')
      expect(names).toContain('Ostermontag')
      expect(names).toContain('Christi Himmelfahrt')
      expect(names).toContain('Pfingstmontag')
      expect(names).toContain('Fronleichnam')
    })

    it('enthält Karneval', () => {
      const holidays = getHolidaysNRW(2024)
      const names = holidays.map(h => h.name)

      expect(names).toContain('Weiberfastnacht')
      expect(names).toContain('Karnevalssamstag')
      expect(names).toContain('Rosenmontag')
    })
  })

  describe('getAllHolidays', () => {
    it('gibt eine Map zurück', () => {
      const holidays = getAllHolidays()
      expect(holidays).toBeInstanceOf(Map)
    })

    it('enthält Feiertage für mehrere Jahre', () => {
      const holidays = getAllHolidays()
      const currentYear = new Date().getFullYear()

      // Prüfe ob Neujahr für mehrere Jahre existiert
      expect(holidays.get(`${currentYear}-0-1`)).toBe('Neujahr')
      expect(holidays.get(`${currentYear + 1}-0-1`)).toBe('Neujahr')
    })
  })

  describe('getHolidayName', () => {
    it('gibt Feiertagsnamen zurück wenn Datum ein Feiertag ist', () => {
      const holidays = getAllHolidays()
      const neujahr = new Date(new Date().getFullYear(), 0, 1)
      expect(getHolidayName(neujahr, holidays)).toBe('Neujahr')
    })

    it('gibt null zurück für normale Tage', () => {
      const holidays = getAllHolidays()
      const normalDay = new Date(new Date().getFullYear(), 5, 15) // 15. Juni
      expect(getHolidayName(normalDay, holidays)).toBeNull()
    })

    it('gibt null zurück für null-Input', () => {
      const holidays = getAllHolidays()
      expect(getHolidayName(null, holidays)).toBeNull()
    })
  })
})
