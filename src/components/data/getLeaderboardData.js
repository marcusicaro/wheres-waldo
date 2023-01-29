import { collection, query, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default async function getLeaderboardData() {
  const dataRef = collection(db, "leaderboard");
  const querySnapshot = await getDocs(dataRef);
  let leaderboardData = [];

  querySnapshot.forEach((doc) => {
    leaderboardData.push(doc.data());
  });

  return leaderboardData;
}
