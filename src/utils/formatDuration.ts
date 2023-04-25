const year = /(?:(\d+)Y)?/
const month = /(?:(\d+)M)?/
const day = /(?:(\d+)D)?/
const h = /(?:(\d+)H)?/
const m = /(?:(\d+)M)?/
const s = /(?:(\d+)S)?/

const datetimeRegex = new RegExp('^P' +year.source + month.source + day.source + 'T' + h.source + m.source + s.source + '$')

export function formatDuration(youtubeDuration: string): string {
    const matched = youtubeDuration.match(datetimeRegex)

    if (!matched) {
        return "--:--"
    }

    const captures = matched.slice(1)
    const datetime = captures.map((value: string, idx: number) => {
        if (idx < 3) {
            // years, months, days
            return value || '0'
        } else {
            // use two digits for hours, minutes, seconds
            return ''.padStart.call(value || '0', 2, '0')
        }
    }).join(':')

    const cleanedDatetime = datetime.replace(/^[0:]+/, '')
    return cleanedDatetime;
}
