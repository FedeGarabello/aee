import {
    getFirestore,
    where,
    addDoc,
    collection,
    serverTimestamp,
    query,
    doc,
    limit,
    orderBy,
    onSnapshot,
    setDoc,
    getDoc,
    getDocs,
    Timestamp,
} from "firebase/firestore";

const db = getFirestore();

function getCollectionReference(idEvento){
    return collection(db, "events", idEvento, "chats");
}

/**
 * Obtener los mensajes del chat de un evento
 * @param {string} idEvento
 * @return {Promise<QuerySnapshot<Doc>>}
**/
export function subscribeToChatChanges(idEvento, callback) {

    const q = query(getCollectionReference(idEvento), 
    orderBy("created_at", "asc"));
    
    return onSnapshot(q, (querySnapshot) => {
        const messages = {};
        querySnapshot.forEach((doc) => {
            messages[doc.id] = doc.data();
        });
        callback(messages);
    });
}


export function addMessage(idE, user, form) {
    const data = {
        ...form,
        ...user,
        created_at: serverTimestamp(),
    };
    return addDoc(getCollectionReference(idE), data);
}