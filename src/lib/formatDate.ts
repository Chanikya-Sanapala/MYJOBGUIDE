import { format } from 'date-fns';

/**
 * Formats a date or date string into DD/MM/YY format.
 * @param date The date object or ISO string to format.
 * @returns A formatted date string (e.g., "17/01/26").
 */
export function formatDate(date: string | Date | number): string {
    if (!date) return '';
    try {
        const d = new Date(date);
        return format(d, 'dd/MM/yy');
    } catch (error) {
        console.error('[formatDate] Error formatting date:', error);
        return String(date);
    }
}
