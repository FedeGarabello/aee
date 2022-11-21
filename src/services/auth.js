import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  createUserProfile,
//   updateUserProfile as updateUserProfileInDatabase,
} from "./user-profiles.js";

// import {getFileURL, uploadFile} from "./storage.js";

import {extensionFromMIME} from "../helpers/strings.js";


export const AUTH_ERROR_MESSAGES = {
  "auth/wrong-password": "La contraseña es incorrecta.",
  "auth/user-not-found": "No existe un usuario con ese email.",
  "auth/invalid-email": "El email no es válido.",
  "auth/email-already-in-use": "Ya existe un usuario con ese email.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/internal-error": "Asegurate que el email y la contraseña están bien cargados.",
};

const auth = getAuth();

let userData = {
  id: null,
  email: null,
  displayName: null,
  photoURL: null,
};

if (localStorage.getItem("user") !== null) {
  userData = JSON.parse(localStorage.getItem("user"));
}

onAuthStateChanged(auth, (user) => {
  if (user) {
      userData = {
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      notifyAll();
  } else {
    userData = {
      id: null,
      email: null,
      displayName: null,
      photoURL: null,
    };
    localStorage.removeItem("user");
  }
  notifyAll();
});

export const login = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export function logout() {
  return signOut(auth);
};

export async function register({ nombre, apellido, email, password }) {
  const { user } = await createUserWithEmailAndPassword(auth,  email, password);
  return createUserProfile(user.uid, {
    nombre,
    apellido,
    email,
  });
}


export async function updateUserProfile({ displayName, photo=null }) {
  const profileData = {
    displayName,
  };

  if(photo !== null){
    const photoPath = `images/${userData.id}.${extensionFromMIME(photo.type)}`;
    const photoUpload = await uploadFile(photoPath, photo);
    profileData.photoURL = await getFileURL(photoPath);
  }
  
  const authPromise = updateProfile(auth.currentUser, profileData);

  const profilePromise = updateUserProfileInDatabase(userData.id, profileData);

  await Promise.all([authPromise, profilePromise]);

  userData = {
    ...userData,
    ...profileData,
  };
  notifyAll();
}


let observers = [];

export function subscribeToAuthChanges(callback) {
  observers.push(callback);
  notify(callback);
  return () => {
    observers = observers.filter((observer) => observer !== callback);
  };
}

function notify(callback) {
  callback({ ...userData });
}

function notifyAll() {
  observers.forEach((callback) => notify(callback));
}
