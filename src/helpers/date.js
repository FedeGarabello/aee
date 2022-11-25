/**
 * Convierte la fecha de un objeto Date al formato "dd/mm/aaaa HH:ii:ss".
 *
 * @param {Date} date
 * @returns {String}
 */
export function dateToString(date) {
    date = new Date(date);
    // console.log('%cdate.js line:8 date', 'color: #007acc;', date);
    const formattedDate = new Intl.DateTimeFormat('es-AR', {
        weekday: "long", day: '2-digit',  month: 'short',  year: 'numeric', 
    }).format(date);
    const formattedTime = new Intl.DateTimeFormat('es-AR', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).format(date);

    // console.log('%cdate.js line:42 formattedDate', 'color: #007acc;', formattedDate);
    // console.log('%cdate.js line:42 formattedDate', 'color: #007acc;', formattedTime);

    return `${formattedDate} ${formattedTime}`;
    // return `${formattedDate} `;
}
