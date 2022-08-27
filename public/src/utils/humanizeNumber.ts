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
