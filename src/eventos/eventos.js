import {
    getFirestore,
    where,
    addDoc,
    collection,
    serverTimestamp,
    query,
    limit,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import { dateToString } from "../helpers/date";

const db = getFirestore();

function getCollectionReference(){
    return collection(db, "eventos");
}
/**
 * Crea un evento nuevo y agrega el usuario que lo creó a una subcollection que se llama players
 *
 * @param {string} title
 * @param {number} cantPlayers
 * @param {string} description
 * @param {Date} date
 * @param {string} location
 * @param {string} state
 * @return {Promise<string>}
 */
export function newEvent(user, {title, cantPlayers, description, date, location, state}) {
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
            return addDoc(collection(db, 'eventos', docRef.id, 'players'), {
                idU: user.id,
                email: user.email,
                created_at: serverTimestamp(),
            });
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}





export async function suscribeToEvents({idU}, callback) {
    const queryRef = query(
        collection(db, "eventos"),
        orderBy("created_at")
    );

    return onSnapshot(queryRef, (querySnapshot) => {
        const data = querySnapshot.docs.map(item => {
            console.log('%ceventos.js line:69 item.data()', 'color: #007acc;', item.data());
            return {
                cantPlayers: item.data().cantPlayers,
                created_at: item.data().created_at?.toDate(),
                date: new Date(item.data().date),
                description: item.data().description,
                id: item.id,
                location: item.data().location,
                state: item.data().state,
                title: item.data().title,
            }
        })
        callback(data);
    });
}