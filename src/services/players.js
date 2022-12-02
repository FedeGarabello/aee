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
    serverTimestamp,
    Timestamp,
} from "firebase/firestore";
const db = getFirestore();

export function suscribeToPlayersEventChanges(idE, callback) {
    const queryRef = query(
        collection(db, 'events', idE, 'players'),
        orderBy("updated_at", "asc")
    );

    return onSnapshot(queryRef, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ 
                ...doc.data(),
                id: doc.id 
            });
        });
        callback(docs);
    });
}






export async function participation(idE, idP, state) {
    await updateDoc(doc(db, 'events', idE, 'players', idP), {
        go: state,
        updated_at: serverTimestamp()
    })
    .then(() => {
        updateDoc(doc(db, 'users', idP, 'events', idE), {
            go: state,
            updated_at:  serverTimestamp()
        })
        .then(() => {
            return {
                status: true,
                message: 'Participación actualizada',
            }
        })
    })
    .catch((error) => {
        return {
            status: false,
            message: error,
        }
    })
}


export function myParticipationFn(idE, idP, callback) {
    return onSnapshot(doc(db, "events", idE, "players", idP ), (doc) => {
    });
}




export function addPlayer(evento, player) {
    setDoc(doc(db, 'events', evento.id, 'players', player.id), {
        ...player,
        joined_at: serverTimestamp(),
        go: false,
        updated_at: serverTimestamp(),
        admin:false,
    })
    .then(() => {
        setDoc(doc(db, 'users', player.id, 'events', evento.id), {
            idE: evento.id,
            ...evento,
            date: evento.date.toISOString(),
            joined_at: serverTimestamp(),
            go: false,
            updated_at: serverTimestamp(),
            admin:false,
        })
        .then(() => {
            return {
                status: true,
                message: 'Participación actualizada',
            }
        })
    })
    .catch((error) => {
        return {
            status: false,
            message: error,
        }
    })
}