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
} from "firebase/firestore";
const db = getFirestore();

export function suscribeToPlayersEventChanges(idE, callback) {
    const queryRef = query(
        collection(db, 'events', idE, 'players'),
        orderBy('joined_at', 'asc'),
    );

    return onSnapshot(queryRef, snapshot => {
        const data = snapshot.docs.map(item => {
            return {
                apellido: item.data().apellido,
                displayName: item.data().displayName,
                email: item.data().email,
                go: item.data().go,
                id: item.data().id,
                joined_at: item.data().joined_at,
                nombre: item.data().nombre,
                photoURL: item.data().photoURL,
            }
        });
        callback(data);
    });
}


export function participation(idE, idP, go) {
    return updateDoc(doc(db, 'events', idE, 'players', idP), {
        go: go,
    }).then(() => {
        return { success: go };
    }).catch((error) => {
        return { error: error };
    });
}