export function formatDateByString(dateStr: string): string {
    const date = new Date(dateStr)
    return `${date.getMonth().padZero(2)}/${date.getDay().padZero(2)}/${date.getFullYear()}`
}
