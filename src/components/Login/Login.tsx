import './style.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'



export function Login(){

    const { login } = useAuthentication()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    async function handleSubmit(e:any): Promise<void>{
        e.preventDefault(e);

        const user = {
            email,
            password
        }
        const res = await login(user)
        
        console.log(res)
        console.log(user)
        setEmail('')
        setPassword('')
    }

    return(
        <div className='login-container'>
            <div className='login-area'>
                <p className='w-full h-14 font-black text-zinc-700 text-center text-4xl mt-10'>Entre com email e senha</p>
                <form className='form-login'>
                    <input value={email} className='input-login' onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' />
                    <input value={password} className='input-login' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Senha' />
                    <button onClick={(e) => handleSubmit(e)} className='button-login'>Entrar</button>
                </form>
                <p className='w-full h-10 text-sm text-center text-zinc-700' > ainda não possui conta?</p>
                <NavLink className='w-full text-center h-10 text-sm text-blue-600' to="/Register">Crie sua conta</NavLink>
            </div>
        </div>
    )
}