import { formatDistanceToNow, formatRelative, Locale, parseISO } from 'date-fns'
import formatDistance from 'date-fns/locale/en-US/_lib/formatDistance/index.js'
import formatLong from 'date-fns/locale/en-US/_lib/formatLong/index.js'
import localize from 'date-fns/locale/en-US/_lib/localize/index.js'
import match from 'date-fns/locale/en-US/_lib/match/index.js'

export type RelativeTimeTokens =
  | 'lastWeek'
  | 'yesterday'
  | 'today'
  | 'tomorrow'
  | 'nextWeek'
  | 'other'

export type formatDistanceFn = (...args: any[]) => any
export type formatLongFn =
  | {
      date: (...args: any[]) => any
      time: (...args: any[]) => any
      dateTime: (...args: any[]) => any
    }
  | undefined
export type localizeFn =
  | {
      ordinalNumber: (...args: any[]) => any
      era: (...args: any[]) => any
      quarter: (...args: any[]) => any
      month: (...args: any[]) => any
      day: (...args: any[]) => any
      dayPeriod: (...args: any[]) => any
    }
  | undefined
export type matchFn =
  | {
      ordinalNumber: (...args: any[]) => any
      era: (...args: any[]) => any
      quarter: (...args: any[]) => any
      month: (...args: any[]) => any
      day: (...args: any[]) => any
      dayPeriod: (...args: any[]) => any
    }
  | undefined

// Get the default en-US locale to be added to
const defaultLocale: Locale = {
  formatDistance: formatDistance as formatDistanceFn,
  formatLong: formatLong as formatLongFn,
  localize: localize as localizeFn,
  match: match as matchFn,
  options: { weekStartsOn: 1 },
}

// Relative date formatter without time
const formatRelativeWithoutTime = (token: RelativeTimeTokens) => {
  const formatRelativeLocale = {
    lastWeek: "eeee',' MMMM do", // Tuesday, February 9th
    yesterday: "'Yesterday'",
    today: "'Today'",
    tomorrow: "'Tomorrow'",
    nextWeek: "eeee',' MMMM do", // Tuesday, February 9th
    other: "M'/'d'/'yy'", // 1/1/21
  }
  return formatRelativeLocale[token]
}

export const friendlyDate = (date: string): string | null => {
  if (!date) return null

  return formatRelative(parseISO(date), new Date(), {
    locale: {
      ...defaultLocale,
      formatRelative: formatRelativeWithoutTime,
    } as Locale,
  })
}

export const timeDifference = (date: string): string =>
  formatDistanceToNow(parseISO(date), { addSuffix: true })
