/**
 * @author lodecoder
 * @param format バグ以外ではフォーマットエラーなどは起きないはずなので、必要であれば実行後に正規表現などでチェックすること
 */
export function formatDate(date: Date, format: string, opts: { tz: string }): string {
	const offsetM = opts.tz === "UTC"
		? 0
		: Number(opts.tz.replace(/^([+-][0-9]{2}):[0-9]{2}$/, (_, h, m) => String(1 * h * 60 + 1 * m)))

	if (24 < Math.abs(offsetM) || Number.isNaN(offsetM)) throw Error(`Invalid timezone: ${opts.tz}`)

	const local = new Date(date.getTime() + offsetM * 60 * 1000)

	return format.replace(/yyyy|MM?|dd?|HH?|mm?|ss?|f{1,3}/g, (match) => {
		const matchLength = match.length
		// dprint-ignore
		switch (match[0]) {
			case "y": return local.getUTCFullYear().toString()
			case "M": return p(local.getUTCMonth() + 1, matchLength)
			case "d": return p(local.getUTCDate(), matchLength)
			case "H": return p(local.getUTCHours(), matchLength)
			case "m": return p(local.getUTCMinutes(), matchLength)
			case "s": return p(local.getUTCSeconds(), matchLength)
			case "f": return p(local.getUTCMilliseconds(), 3).slice(0, matchLength)
			default: throw Error(`Unknown format specifier"${match}"in"${format}"`)
		}
	})
}

// pad with 0
const p = (num: number, size: number) => num.toString().padStart(size, "0")
