const longDate = new Intl.DateTimeFormat("en-AU", {
  dateStyle: "long",
  timeZone: "UTC",
});

const courseWeekdayDate = new Intl.DateTimeFormat("en-AU", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Australia/Sydney",
});

const courseDateTime = new Intl.DateTimeFormat("en-AU", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Australia/Sydney",
  timeZoneName: "short",
});

/** Format a date-only value without letting the viewer's timezone move it. */
export function formatCourseDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(`${value}T00:00:00Z`) : value;
  return longDate.format(date);
}

/** Format a course timestamp as its weekday and calendar date in Sydney. */
export function formatCourseWeekdayDate(value: Date | string): string {
  return courseWeekdayDate.format(typeof value === "string" ? new Date(value) : value);
}

/** Format an exact course deadline in Sydney, including its local timezone. */
export function formatCourseDateTime(value: Date | string): string {
  return courseDateTime.format(typeof value === "string" ? new Date(value) : value);
}
