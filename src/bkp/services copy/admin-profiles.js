import {
    getFirestore,
    setDoc,
    getDoc,
    doc,
    updateDoc,
} from "firebase/firestore";

const db = getFirestore();

/**
 * Crea un nuevo perfil de usuario en la base de datos.
 *
 * @param {string} id
 * @param {string} email
 * @param {string|null} displayName
 * @param {string|null} photoURL
 * @returns {Promise<void>}
 */
export function createUserProfile(id, {email, displayName = null, photoURL = null}) {
    return setDoc(doc(db, 'admin', id), {
        email,
        displayName,
        photoURL,
    });
}

/**
 * Actualiza la info de perfil de un usuario en la base de datos.
 *
 * @param {string} id
 * @param {string|null} displayName
 * @param {string|null} photoURL
 * @returns {Promise<void>}
 */
export function updateUserProfile(id, {displayName = null, photoURL = null}) {
    return updateDoc(doc(db, 'admin', id), {
        displayName,
        photoURL,
    });
}

/**
 *
 * @param {string} id
 * @returns {Promise<{displayName: string, photoURL: string, email: string, id: string}>}
 */
 export async function getUserProfile(id) {
    const adminData = await getDoc(doc(db, `admin/${id}`));
    // TODO: Verificar que exista el usuario.
    return {
        id,
        ...adminData.data(),
    }
}