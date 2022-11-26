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
        where("go", "==", true),
    );

    return onSnapshot(queryRef, snapshot => {
        const data = snapshot.docs.map(item => {
            return {
                id: item.data().id,
                nombre: item.data().nombre,
                apellido: item.data().apellido,
                email: item.data().email,
                displayName: item.data().displayName,
                photoURL: item.data().photoURL,
                go: item.data().go,
                joined_at: item.data().joined_at,
            }
        });
        callback(data);
    });
}


export async function participation(idE, idP, state) {
    await updateDoc(doc(db, 'events', idE, 'players', idP), {
        go: state,
    })
    .then(() => {
        updateDoc(doc(db, 'users', idP, 'events', idE), {
            go: state,
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
        console.log("Current data: ", doc.data());
    });
}


    
    // return getDoc(doc(db, 'events', idE, 'players', idP))
    // .then((doc) => {
    //     if (doc.exists()) {
    //         return {
    //             status: true,
    //             message: 'Participación obtenida',
    //             go: doc.data().go,
    //         }
    //     } else {
    //         return {
    //             status: false,
    //             message: 'No existe participación',
    //         }
    //     }
    // })
    // .catch((error) => {
    //     return {
    //         status: false,
    //         message: error,
    //     }
    // })
    // }