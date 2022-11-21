import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from 'firebase/storage';

const storage = getStorage();

/**
 * Guarda un archivo en el servidor.
 *
 * @param {string} filepath
 * @param {File} file
 * @returns {Promise<UploadResult>}
 */
export async function uploadFile(filepath, file) {
    return uploadBytes(ref(storage, filepath), file);
}

/**
 * Obtiene la URL absoluta del archivo en el servidor de almacenamiento.
 *
 * @param {string} filepath
 * @returns {Promise<string>}
 */
export async function getFileURL(filepath) {
    return getDownloadURL(ref(storage, filepath));
}
