import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore();

// Preparo el cache con el patron SWR
const refCache = {};
const profilesCache = {};

/**
 * Funciona para obtener la refererncia del usuario
 * @param {String} id Id del usuario a traer referencia
 * @returns {DocumentReference} Referencia del usuario
 */
function getUserProfileRef(id) {
  if (!refCache[id]) {
    refCache[id] = doc(db, "users", id);
  }
  return refCache[id];
}

/**
 * Crea un nuevo perfil de usuario en la base de datos.
 * @param {string} id
 * @param {string} email
 * @param {string|null} displayName
 * @param {string|null} photoURL
 * @returns {Promise<void>} Referencia al perfil de usuario.
 */
export function createUserProfile(id,
  { 
    nombre,
    apellido,
    email,
    displayName = null, 
    photoURL = null 
  }) {
  return setDoc(getUserProfileRef(id), {
    nombre,
    apellido,
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
export function updateUserProfile(id, { displayName = null, photoURL = null }) {
  return updateDoc(getUserProfileRef(id), {
    displayName,
    photoURL,
  });
}

/**
 *  Obtiene el perfil de un usuario y si lo tiene en caché lo pasa, para que lo cargue más rápido.
 * @param {string} id
 * @returns {Promise<{displayName: string, photoURL: string, email: string, id: string}>}
 */
export async function getUserProfile(id) {
  let userData = fetchUserProfile(id);
  if (profilesCache[id]) {
    userData = profilesCache[id];
  }
  return userData;
}

async function fetchUserProfile(id) {
  const userSnap = await getDoc(getUserProfileRef(id));

  if (!userSnap.exists()) return null;

  const userData = {
    id,
    ...userSnap.data(),
  };

  profilesCache[id] = userData;

  return userData;
}

/**
 * Tomar el rol del usuario que está logueado.
 * @param {string || null} id
 * @returns {Promise<string>}
 */
export async function getUserRol(id) {
  const userData = await getDoc(getUserProfileRef(id));
  return userData.data().rol.toString();
}
