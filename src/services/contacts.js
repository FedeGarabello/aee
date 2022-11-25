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

export function getUsersXEmail( email ) {
    const queryRef = query(
        collection(db, 'users'),
        where('email', '==', email.value),
    );

    return getDocs(queryRef)
        .then((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                let res =  {
                    id: doc.id,
                    ...doc.data()
                }
                data.push(res);
            });
            return data;
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
}

export function getUsersXNombre( nombre ) {
    const queryRef = query(
        collection(db, 'users'),
        where('nombre', '==', nombre.value),
    );

    return getDocs(queryRef)
        .then((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                let res =  {
                    id: doc.id,
                    ...doc.data()
                }
                data.push(res);
            });
            return data;
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
}

export function getUsersXApellido( apellido ) {
    const queryRef = query(
        collection(db, 'users'),
        where('apellido', '==', apellido.value),
    );

    return getDocs(queryRef)
        .then((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                let res =  {
                    id: doc.id,
                    ...doc.data()
                }
                data.push(res);
            });
            return data;
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
}






export function suscribeToContacts(idU, callback) {
    console.log('%ccontacts.js line:40 idU', 'color: #007acc;', idU.value);
    // const queryRef = query(
    //     collection(db, 'users'),
    //     where('id', 'in', idU.value.contacts),
    // );
    const queryRef = query(
        collection(db, 'users', idU.value.id, 'contacts'),
    );

    return onSnapshot(queryRef, snapshot => {
        const data = snapshot.docs.map(item => {
            console.log('%ccontacts.js line:50 item', 'color: #007acc;', item.data());
            return {
                id: item.data().id,
                nombre: item.data().nombre,
                apellido: item.data().apellido,
                email: item.data().email,
                displayName: item.data().displayName,
                photoURL: item.data().photoURL,
            }
        });
        callback(data);
    });
}

