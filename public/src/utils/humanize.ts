const locale =
	navigator.languages && navigator.languages.length
		? navigator.languages[0]
		: navigator.language;

export const humanizeNumber = (value: number, currency = false) => {
	return new Intl.NumberFormat(locale, {
		notation: currency ? undefined : "compact",
		style: currency ? "currency" : undefined,
		currency: currency ? "EUR" : undefined,
	}).format(value);
};

export const humanizeDate = (value: Date) => {
	return new Intl.DateTimeFormat(locale, {
		weekday: "long",
		day: "2-digit",
		month: "short",
	}).format(value);
};

export const humanizeHours = (value: Date) => {
	return new Intl.DateTimeFormat(locale, {
		// hour12: false,
		hourCycle: "h23",
		hour: "2-digit",
		minute: "numeric",
	}).format(value);
};
