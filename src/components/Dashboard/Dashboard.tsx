import './style.css'
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { Card } from '../Card/Card';
import { useInsertDocument } from '../../hooks/useInstertDocuments';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase/config';

export function Dashboard(){

    const [name, setName] = useState('')
    const [valueR$, setValueR$] = useState('')
    const [typeEvent, setTypeEvent] = useState('')
    async function handleDeleteDoc<promise>(e:any, docId:string, docColection:string){
        e.preventDefault();
    
        await deleteDoc(doc(db, docColection, docId));
       }

    const {user} = useAuthValue() 
    const {logout} = useAuthentication()


    const { insertDocument, response } = useInsertDocument('events')


    const uid = user.uid
    const [error, setError] = useState<null | string>(null)
    const {documents, loading} = useFetchDocuments('events', null, uid)
    
    function handleSubmit(e:any){
        e.preventDefault()
        const post = {
            name: name,
            value: valueR$,
            type: typeEvent,
            uid
        }
        if(name === ''){
            setError('o evento precisa de um nome')
        }
        else if(valueR$ === ''){
            setError('digite o valor do evento')
        }
        else {
            insertDocument(post)
            setName('')
            setValueR$('')
            setError(null)
        }
        console.log(post)

    }

    function handleLogout(e:any){
        e.preventDefault();

        logout();
    }
    
    return(
        <div className='container'>
            <div className="title">
                <h1>seja bem vindo {user.displayName.toUpperCase()}</h1>
                <button className='btn-logout' onClick={(e) => handleLogout(e)}>sair</button>
            </div>

            <div className='subtitle'>
               <p className='subtitle-text'>este é um crud de que simula uma carteira digital </p>
            </div>
                <div className='workspace-mobile-add'>
                    <form className='flex flex-col w-full items-center gap-3'>
                    <input className='input' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Nome do novo evento financeiro'/>
                                <input className='input' value={valueR$} onChange={(e) => setValueR$(e.target.value)} type="number" placeholder='valor do evento financeiro em R$' />
                                <select className='select' onChange={(e) => setTypeEvent(e.target.value)}>
                                    <option value="entry">Entrada</option>
                                    <option value="exit">Saída</option>
                                </select>
                    <button onClick={(e) => handleSubmit(e)}  className='btn-submit'>Enviar</button>
                    <p className='w-72 h-10 text-center text-red-400'>error</p>
                    </form>
                </div>
                <div className='workspace-mobile-display'>
                {documents && documents.map((doc:any, i:number) => {
                            return(
                                <div className='flex gap-10 items-center'><Card key={i} cardTitle={doc.name} valueR$={doc.value} type={doc.type}/> <button onClick={(e) => handleDeleteDoc(e, doc.id, 'events')} className='w-20 h-10 rounded-md bg-zinc-500 text-xl text-white '>apagar</button></div>
                            )
                        })}
                </div>
               <div className='w-full md:hidden h-20 mt-72 text-xl text-center text-zinc-700
                relative'>
                    este Crud foi criado por Deyvid Tavares, desenvolvedor front-end, utilizando react, typescript, tailwindcss, firebase-auth e firestore  
               </div>
            
            <div className='workspace'>
                <div className='workspace-container'>
                    <div className='add'>
                        <div>
                            <form className='form-dashboard'>
                                <input className='input' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Nome do novo evento financeiro'/>
                                <input className='input' value={valueR$} onChange={(e) => setValueR$(e.target.value)} type="number" placeholder='valor do evento financeiro em R$' />
                                <select className='select' onChange={(e) => setTypeEvent(e.target.value)}>
                                    <option value="entry">Entrada</option>
                                    <option value="exit">Saída</option>
                                </select>
                                
                                <button onClick={(e) => handleSubmit(e)}  className='btn-submit' >Enviar</button>
                                {error && <p className={`${error ? 'opacity-100' : 'opacity-0' } duration-700 h-10 bg-red-400 rounded-md w-72 text-center text-white text-xl` }>{error}</p>}
                            </form>
                        </div>
                    </div>
                    
                    <div className='display'>
                        {loading && <p className='h-10 w-20'>Aguarde...</p>}
                        {documents && documents.map((doc:any, i:number) => {
                            return(
                                <div className='flex gap-10 items-center'><Card key={i} cardTitle={doc.name} valueR$={doc.value} type={doc.type}/> <button onClick={(e) => handleDeleteDoc(e, doc.id, 'events')} className='w-20 h-10 rounded-md bg-zinc-500 text-xl text-white '>apagar</button></div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}