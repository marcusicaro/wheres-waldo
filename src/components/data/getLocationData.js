import { collection, query, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default async function getLocationData() {
  const dataRef = collection(db, "locations");
  const querySnapshot = await getDocs(dataRef);
  let locationData = [];

  querySnapshot.forEach((doc) => {
    locationData.push(doc.data());
  });

  return locationData;
}
