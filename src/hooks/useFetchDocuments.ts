import { useState, useEffect } from "react";
import { db } from "../Firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore'

export const useFetchDocuments = (docCollection:any, search:any, uid:any) => {
  const [documents, setDocuments] = useState<null | any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<null | boolean>(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }

      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;

        if (search) {
          q = query(
            collectionRef,
            where("tags", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          q =  query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        } else {
          q =  query(collectionRef, orderBy("createdAt", "desc"));
        }

         onSnapshot(q, (querySnapshot:any) => {
          setDocuments(
            querySnapshot.docs.map((doc:any) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      } catch (error:any) {
        console.log(error);
        setError(error.message);
      }

      setLoading(false);
    }

    loadData();
  }, [docCollection, search, uid, cancelled]);

  console.log(documents);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};