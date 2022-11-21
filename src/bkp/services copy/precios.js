import {
  addDoc,
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const db = getFirestore();

export function getPricing() {
  const priceRef = collection(db, "pricing");
  return getDocs(priceRef);
}


export function addPricing(producto) {
  const priceRef = collection(db, "pricing");
  return addDoc(priceRef, producto);
}

export async function subscribeToServices(callback) {
    const priceRef = collection(db, "pricing");
    return onSnapshot(priceRef, snapShot => {
        const services = snapShot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            }));
        callback(services);
    });
}

export function eliminarProducto(id) {
  const priceRef = collection(db, "pricing");
  return deleteDoc(doc(priceRef, id));
}

export function editProduct(price) {
  const priceRef = collection(db, "pricing");
  return updateDoc(doc(priceRef, price.id), price);
}