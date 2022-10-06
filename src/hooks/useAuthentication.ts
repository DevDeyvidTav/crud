import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'
import { app } from '../Firebase/config'
import { useState, useEffect } from 'react'

export function useAuthentication(){
   const [error, setError] = useState<null|string|any>(null)

   const [canceled, setCanceled] = useState<Boolean>(false)

   const auth = getAuth(app)

    const [loading, setLoading] = useState<boolean>(false)
   function checkIfIsCanceled(){
    if(canceled) {
        return;
    }
   }

   const login = async (data:any) => {
    checkIfIsCanceled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error:any) {
      console.log(error.message);
      console.log(typeof error.message);
      console.log(error.message.includes("user-not"));

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      console.log(systemErrorMessage);

      setError(systemErrorMessage);
    }

    console.log(error);

    setLoading(false);
  };
  const logout = () => {
   checkIfIsCanceled();

    signOut(auth);
  };

   async function createUser(data:any){
        checkIfIsCanceled()

        setLoading(true)
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth, data.email, data.password
            )
            await updateProfile(user, {displayName: data.name})
            return user
        }
        catch(error:any){
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage 

            if(error.message.includes("Password")){
                systemErrorMessage = 'a senha precisa ter ao menos 6 caracteres'
            }
            else if(error.message.includes('email-already')){
                systemErrorMessage = 'Esse email já existe'
            }
            else{
                systemErrorMessage = 'ocorreu um erro, tente novamente mais tarde'
            }
            setError(systemErrorMessage)
        }
        setLoading(false)
        useEffect(() => setCanceled(true) , [])
   }
   return {
    login,
    auth,
    createUser,
    error,
    loading,
    logout
   }
}