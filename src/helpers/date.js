/**
 * Convierte la fecha de un objeto Date al formato "dd/mm/aaaa HH:ii:ss".
 *
 * @param {Date} date
 * @returns {String}
 */
export function dateToString(date) {
    console.log('%cdate.js line:8 date', 'color: #007acc;', date);
    // Para lograr el objetivo, tenemos 2 caminos que podemos tomar.
    // Forma 1: Sacando la fecha, dato por dato, del objeto Date.
    // const year  = date.getFullYear();
    // let month   = date.getMonth() + 1; // Los meses Date los cuenta empezando en 0.
    // let day     = date.getDate();
    // let hours   = date.getHours();
    // let mins    = date.getMinutes();
    // let secs    = date.getSeconds();
    //
    // if(month < 10)  month   = "0" + month;
    // if(day < 10)    day     = "0" + day;
    // if(hours < 10)  hours   = "0" + hours;
    // if(mins < 10)   mins    = "0" + mins;
    // if(secs < 10)   secs    = "0" + secs;
    //
    // return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;

    // Forma 2: Usando la clase Intl ("Internationalization", o i18n).
    // const formattedDate = new Intl.DateTimeFormat('es-AR').format(date);
    // Podemos usar el segundo parámetro del constructor, que es el objeto de opciones, para configurar
    // lo que queremos obtener.
    // const formattedDate = new Intl.DateTimeFormat('es-AR', {
    //     year: 'numeric', month: '2-digit', day: '2-digit',
    //     hour: '2-digit', minute: '2-digit', second: '2-digit',
    // }).format(date);
    const formattedDate = new Intl.DateTimeFormat('es-AR', {
        weekday: "short", day: '2-digit',  month: 'short',  year: 'numeric', 
    }).format(date);
    const formattedTime = new Intl.DateTimeFormat('es-AR', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).format(date);

    console.log('%cdate.js line:42 formattedDate', 'color: #007acc;', formattedDate);
    console.log('%cdate.js line:42 formattedDate', 'color: #007acc;', formattedTime);
    return `${formattedDate} ${formattedTime}`;
    // return `${formattedDate} `;
}
