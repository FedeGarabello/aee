import { serverTimestamp } from "firebase/firestore";

/**
 * Convierte la fecha de un objeto Date al formato "dd/mm/aaaa HH:ii:ss".
 *
 * @param {Date} date // '2022-11-30T18:00'
 * @returns {String}
 */
export function dateToString(date) {
    date = new Date(date);
    const formattedDate = new Intl.DateTimeFormat('es-AR', {
        weekday: "long", day: '2-digit',  month: 'short',  year: 'numeric', 
    }).format(date);
    const formattedTime = new Intl.DateTimeFormat('es-AR', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).format(date);

    return `${formattedDate} ${formattedTime}`;
//     // return `${formattedDate} `;
}


export function dateLocaleToString(date) {
    const formattedDate = new Intl.DateTimeFormat('es-AR', {
        weekday: "long", day: '2-digit',  month: 'short',  year: 'numeric', 
    }).format(date);
    const formattedTime = new Intl.DateTimeFormat('es-AR', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).format(date);

    return `${formattedDate} ${formattedTime}`;
//     // return `${formattedDate} `;
}
