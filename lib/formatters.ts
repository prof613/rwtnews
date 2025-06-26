/**
 * Formats a date string or Date object into a more readable format.
 * Example: "2023-10-26T10:00:00.000Z" -> "October 26, 2023"
 * @param dateInput The date string (ISO 8601 format recommended) or Date object.
 * @param options Intl.DateTimeFormatOptions to customize the output.
 * @returns A formatted date string, or an empty string if input is invalid.
 */
export function formatDate(dateInput: string | Date | undefined | null, options?: Intl.DateTimeFormatOptions): string {
  if (!dateInput) {
    return "" // Return empty string for undefined, null, or empty string input
  }

  try {
    const date = new Date(dateInput)

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      // console.warn("Invalid date input to formatDate:", dateInput)
      return "" // Or return the original input, or a specific error string
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      // timeZone: 'UTC', // Uncomment if your dates from Strapi are consistently UTC and you want to format them as such
      ...options,
    }
    return new Intl.DateTimeFormat("en-US", defaultOptions).format(date)
  } catch (error) {
    // console.error("Error formatting date:", dateInput, error)
    return "" // Fallback for any other error
  }
}

/**
 * Formats a date string or Date object into a short format.
 * Example: "2023-10-26T10:00:00.000Z" -> "Oct 26, 2023" or "10/26/2023"
 * @param dateInput The date string or Date object.
 * @returns A formatted short date string.
 */
export function formatShortDate(dateInput: string | Date | undefined | null): string {
  return formatDate(dateInput, {
    year: "numeric",
    month: "short", // 'short' for "Oct", 'numeric' for "10"
    day: "numeric",
  })
}

/**
 * Formats a date string or Date object to include time.
 * Example: "2023-10-26T10:30:00.000Z" -> "October 26, 2023, 10:30 AM" (if local time is desired)
 * @param dateInput The date string or Date object.
 * @param showSeconds Whether to include seconds in the time.
 * @returns A formatted date-time string.
 */
export function formatDateTime(dateInput: string | Date | undefined | null, showSeconds = false): string {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    ...(showSeconds && { second: "numeric" }),
    // timeZoneName: 'short', // Optional: to show timezone like PST, EST
  }
  return formatDate(dateInput, timeOptions)
}

/**
 * Calculates approximate read time for a given text.
 * @param text The text content.
 * @param wpm Words per minute, average reading speed.
 * @returns A string like "X min read".
 */
export function calculateReadTime(text: string, wpm = 200): string {
  if (!text || typeof text !== "string") {
    return "1 min read" // Default for empty or invalid input
  }
  const words = text.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)
  return `${time} min read`
}

/**
 * Truncates a string to a specified length and appends an ellipsis if truncated.
 * @param str The string to truncate.
 * @param maxLength The maximum length of the string.
 * @returns The truncated string.
 */
export function truncateText(str: string | undefined | null, maxLength: number): string {
  if (!str) {
    return ""
  }
  if (str.length <= maxLength) {
    return str
  }
  return `${str.substring(0, maxLength)}...`
}

/**
 * Converts a string to sentence case.
 * Capitalizes the first letter of the string.
 * @param str The string to convert.
 * @returns The string in sentence case.
 */
export function toSentenceCase(str: string | undefined | null): string {
  if (!str) {
    return ""
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Generates a slug from a string.
 * Converts to lowercase, replaces spaces with hyphens, and removes non-alphanumeric characters (except hyphens).
 * @param str The string to slugify.
 * @returns The slugified string.
 */
export function slugify(str: string | undefined | null): string {
  if (!str) {
    return ""
  }
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
}
