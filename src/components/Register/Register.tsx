import './style.css'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

export function Register(){
    const [name, setName] = useState<string>('')
    const [ email, setEmail] = useState<string>('')
    const [ password, setPassword] = useState<string>('')
    const [ password2, setPassword2] = useState<string>('')
    const [error, setError] = useState<string>('')


    const { createUser, error: authError, loading} = useAuthentication()



    async function handleSubmit(e:any): Promise<void>{
        e.preventDefault();

        const user = {
            name,
            email,
            password
        }
        const res = await createUser(user)
        
        console.log(res)

        if (password !== password2){
            setError('As senhas estão diferentes')
            return
        }
        else{
            setError('')
        }

        console.log(user)
        setEmail('')
        setName('')
        setPassword('')
        setPassword2('')
    }

useEffect(() => setError(authError), [authError])


    return(
        <div className='register-container'>
            <div className='register-area'>
                 <form className='form'>
                    <h1 className='h-14 w-full text-center text-zinc-700 text-4xl font-black'>Crie sua Conta</h1>
                    <input value={name} className='input' onChange={(e) => setName(e.target.value)} type="text" placeholder='Nome' />
                    <input value={email} className='input' onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' />
                    <input value={password} className='input' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Senha' />
                    <input value={password2} className='input' onChange={(e) => setPassword2(e.target.value)} type="password" placeholder='Confirme Sua Senha' />
                    <button onClick={(e) => handleSubmit(e)} className='button-register'>Registre-se</button>
                    <p className={`${error? '' : 'hidden'} bg-red-400 w-72 h-10 text-sm text-center text-white rounded-md transition-all duration-300 py-2`}>{error}</p>
                    <p className='w-full text-sm text-center h-10 mt-10 text-zinc-700'>Já possui conta?</p>
                    <NavLink className='w-full text-center text-sm h-10 text-blue-500' to="/login">Entre com Email e senha</NavLink>
                </form>
                
            </div>
            
        </div>
    )
}