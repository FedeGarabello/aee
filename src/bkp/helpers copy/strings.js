/**
 * Obtiene la extensión correspondiente al tipo MIME provisto.
 *
 * @param {string} type - El tipo MIME.
 * @returns {string|null}
 */
export function extensionFromMIME(type) {
    switch(type) {
        case 'image/jpeg':
        case 'image/pjpeg':
            return 'jpg';

        case 'image/png':
            return 'png';

        case 'image/gif':
            return 'gif';

        case 'image/svg':
            return 'svg';

        case 'image/webp':
            return 'webp';

        case 'image/avif':
            return 'avif';

        default:
            return null;
    }
}
