import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase/config";

export  function useDeleteDoc(){

   async function handleDeleteDoc<promise>(e:any, docId:string, docColection:string){
    e.preventDefault();

    await deleteDoc(doc(db, docColection, docId));
   }
       return handleDeleteDoc
}