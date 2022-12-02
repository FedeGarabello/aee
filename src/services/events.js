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
    updateDoc,
} from "firebase/firestore";

const db = getFirestore();

function getCollectionReference(){
    return collection(db, "events");
}



/**
 * Crea un evento nuevo y agrega el usuario que lo creó a una 
 * subcollection que se llama players
 *
 * @param {string} title
 * @param {number} cantPlayers
 * @param {string} description
 * @param {Date} date
 * @param {string} location
 * @param {string} state
 * @return {Promise<void>}
 */
export function newEvent(profile, {title, cantPlayers, description, date, location, state}) {
    const data = {
        title,
        cantPlayers,
        description,
        date,
        location,
        state,
        created_at: serverTimestamp(),
    };
    return addDoc(getCollectionReference(), data)
        .then((docRef) => {
            setDoc(doc(getCollectionReference(), docRef.id, "players", profile.id), {
                ...profile,
                joined_at: serverTimestamp(),
                go: true,
                updated_at: serverTimestamp(),
                admin: true,
            })
            return setDoc(doc(collection(db, "users"), profile.id, "events", docRef.id), {
                idE: docRef.id,
                joined_at: serverTimestamp(),
                go: true,
                ...data,
                updated_at: serverTimestamp(),
                admin: true,
            })
        })
}






/**
 * Suscripción para ver los eventos. Se usa en Inicio para listar todos los eventos 
 * @param {number} id del Usuario para ver sus eventos
 * @param {*} callback 
 * @returns Array  Eventos del usuario 
 */
export async function getEvents(idU, callback) {
    const queryRef = query(
        collection(db, "users", idU, "events"),
        orderBy("date", "asc")
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





export async function suscribeToEventChanges(idE, callback) {
    const docRef = doc(db, "events", idE);
    
    return onSnapshot(docRef, (doc) => {
        const data = {
            cantPlayers: doc.data().cantPlayers,
            created_at: doc.data().created_at?.toDate(),
            date: new Date(doc.data().date),
            description: doc.data().description,
            id: doc.id,
            location: doc.data().location,
            state: doc.data().state,
            title: doc.data().title,
        }
        callback(data);
    });
}



export function editEvent(user, id, data) {
    return updateDoc(doc(db, "events", id), data)
    .then(() => {
        return getDocs(collection(db, "events", id, "players"))
        .then((querySnapshot) => {
            querySnapshot.forEach((d) => {
                updateDoc(doc(collection(db, "users"), d.id, "events", id), data)
            });
        })
    })
}