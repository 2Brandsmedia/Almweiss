/**
 * Berechnet Ostersonntag für ein gegebenes Jahr (Gaußsche Osterformel)
 */
export function getEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

/**
 * Hilfsfunktion: Datum + Tage
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Feiertage für NRW (Nordrhein-Westfalen) + Karneval
 */
export function getHolidaysNRW(year: number): { date: Date; name: string }[] {
  const easter = getEasterSunday(year);
  const holidays: { date: Date; name: string }[] = [];

  // Feste Feiertage
  holidays.push({ date: new Date(year, 0, 1), name: "Neujahr" });
  holidays.push({ date: new Date(year, 4, 1), name: "Tag der Arbeit" });
  holidays.push({ date: new Date(year, 9, 3), name: "Tag der Deutschen Einheit" });
  holidays.push({ date: new Date(year, 10, 1), name: "Allerheiligen" }); // NRW
  holidays.push({ date: new Date(year, 11, 25), name: "1. Weihnachtstag" });
  holidays.push({ date: new Date(year, 11, 26), name: "2. Weihnachtstag" });

  // Karneval (basierend auf Ostern)
  holidays.push({ date: addDays(easter, -52), name: "Weiberfastnacht" });
  holidays.push({ date: addDays(easter, -50), name: "Karnevalssamstag" });
  holidays.push({ date: addDays(easter, -48), name: "Rosenmontag" });

  // Gesetzliche Feiertage (basierend auf Ostern)
  holidays.push({ date: addDays(easter, -2), name: "Karfreitag" });
  holidays.push({ date: addDays(easter, 1), name: "Ostermontag" });
  holidays.push({ date: addDays(easter, 39), name: "Christi Himmelfahrt" });
  holidays.push({ date: addDays(easter, 50), name: "Pfingstmontag" });
  holidays.push({ date: addDays(easter, 60), name: "Fronleichnam" }); // NRW

  return holidays;
}

/**
 * Alle Feiertage für die nächsten 5 Jahre als Map
 */
export function getAllHolidays(): Map<string, string> {
  const holidayMap = new Map<string, string>();
  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year <= currentYear + 5; year++) {
    const holidays = getHolidaysNRW(year);
    for (const holiday of holidays) {
      const key = `${holiday.date.getFullYear()}-${holiday.date.getMonth()}-${holiday.date.getDate()}`;
      holidayMap.set(key, holiday.name);
    }
  }

  return holidayMap;
}

/**
 * Prüft ob ein Datum ein Feiertag ist und gibt den Namen zurück
 */
export function getHolidayName(date: Date | null, holidays: Map<string, string>): string | null {
  if (!date) return null;
  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) return null;
  const key = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
  return holidays.get(key) || null;
}

/**
 * getDayProps für Mantine DatePicker - markiert Feiertage
 */
export function getDayPropsForHolidays(dateStr: string, holidays: Map<string, string>) {
  const date = new Date(dateStr);
  const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  const holidayName = holidays.get(key);

  if (holidayName) {
    return {
      style: {
        background: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(59, 130, 246, 0.1) 4px, rgba(59, 130, 246, 0.1) 6px)",
        borderRadius: "4px",
      },
      title: holidayName,
    };
  }
  return {};
}
