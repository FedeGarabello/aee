import {
    getFirestore,
    collection,
    query,
    where,
    getDoc,
    getDocs,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    orderBy,
    limit,
    addDoc,
} from "firebase/firestore";
const db = getFirestore();

export function getUsersXEmail(email) {
    const queryRef = query(
        collection(db, "users"),
        where("email", "==", email.value)
    );

    return getDocs(queryRef)
    .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            let res = {
            id: doc.id,
            ...doc.data(),
            };
            data.push(res);
        });
        return data;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

export function getUsersXNombre(nombre) {
    const queryRef = query(
        collection(db, "users"),
        where("nombre", "==", nombre.value)
    );

    return getDocs(queryRef)
    .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            let res = {
            id: doc.id,
            ...doc.data(),
            };
            data.push(res);
        });
        return data;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

export function getUsersXApellido(apellido) {
    const queryRef = query(
        collection(db, "users"),
        where("apellido", "==", apellido.value)
    );

    return getDocs(queryRef)
    .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            let res = {
            id: doc.id,
            ...doc.data(),
            };
            data.push(res);
        });
        return data;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

export function suscribeToContacts(idU, callback) {
    const queryRef = query(
        collection(db, "users", idU, "contacts"),
        orderBy("nombre", "asc")
    );
    return onSnapshot(queryRef, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
        let res = {
            id: doc.id,
            ...doc.data(),
        };
        data.push(res);
        });
        callback(data);
    });
}

export function agregarContacto(idU, idC) {
    const contactosRef = collection(db, "users", idU.id, "contacts");

    return setDoc(doc(contactosRef, idC.id), {
        ...idC,
    });
}
