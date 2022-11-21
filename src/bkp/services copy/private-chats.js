import {
    getFirestore,
    getDocs,
    where,
    addDoc,
    collection,
    serverTimestamp,
    query,
    limit,
    orderBy,
    onSnapshot,
} from "firebase/firestore";

const db = getFirestore();

async function getPrivateChatRef({from}) {
    const queryChat = query(
        collection(db, "private-chats"),
        where("users", "==", {
        [from]: true,
        }),
        limit(1)
    );

    const querySnap = await getDocs(queryChat);

    if (querySnap.empty) {
        return await addDoc(collection(db, "private-chats"), {
            users: {
                [from]: true,
            },
        });
    } else {
        return querySnap.docs[0];
    }

}


/**
 * Graba un mensaje de chat privado entre los usuarios.
 *
 * @param {string} from
 * @param {string} text
 * @returns {Promise<DocumentReference<DocumentData>>}
 */
export async function sendPrivateMessage({ from, text }) {
    const chatRef = await getPrivateChatRef({ from });
    return addDoc(collection(db, "private-chats", chatRef.id, "messages"), {
        from,
        text,
        created_at: serverTimestamp(),
    });
}

export async function sendPrivateMessageAdmin({ from, to, text }) {
    const chatRef = await getPrivateChatRef( { from: to } );
    return addDoc(collection(db, "private-chats", chatRef.id, "messages"), {
        from,
        text,
        created_at: serverTimestamp(),
    });
}

export async function subscribeToPrivateChat({from}, callback) {
    const chatRef = await getPrivateChatRef({ from });

    const queryRef = query(
        collection(db, "private-chats", chatRef.id, "messages"),
        orderBy("created_at")
    );

    return onSnapshot(queryRef, (querySnapshot) => {
        const data = querySnapshot.docs.map(item => {
            return {
                from: item.data().from,
                text: item.data().text,
                created_at: item.data().created_at?.toDate(),
            }
        })
        callback(data);
    });
}


export async function subscribeToPrivateChatAdmin(callback) {
    const chatRef = collection(db, "private-chats")
    getDocs(chatRef).then((querySnapshot) => {
        const data = querySnapshot.docs.map(item => {
            return {
                id: item.id,
                users: item.data().users,
            }
        })
        callback(data);
    });
}




// export async function subscribeToPrivateChatMessagesAdmin({id}, callback) {
//     const chatRef = collection(db, "private-chats")
//     getDocs(chatRef).then((querySnapshot) => {
//         const data = querySnapshot.docs.map(item => {
//             return {
//                 id: item.id,
//                 users: item.data().users,
//             }
//         })
//         callback(data);
//     });

//     // return onSnapshot(chatRef, (querySnapshot) => {
//     //     const msgData = []
//     //     querySnapshot.docs.map(item => {
//     //         console.log('%cprivate-chats.js line:84 item.data()', 'color: #007acc;', item.data());
//     //         console.log('%cprivate-chats.js line:84 item.data()', 'color: #007acc;', item.data().uid);
//     //         // msgData.push(item.data().users)
//     //     })
//     //     console.log('%cprivate-chats.js line:87 msgData', 'color: #007acc;', msgData);
//     //     callback(msgData);
//     // });
// }