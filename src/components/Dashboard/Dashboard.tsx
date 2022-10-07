import './style.css'
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { Card } from '../Card/Card';
import { useInsertDocument } from '../../hooks/useInstertDocuments';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

export function Dashboard(){

    const [name, setName] = useState('')
    const [valueR$, setValueR$] = useState('')
    const [typeEvent, setTypeEvent] = useState('')


    const {user} = useAuthValue() 
    const {logout} = useAuthentication()


    const { insertDocument, response } = useInsertDocument('events')


    const uid = user.uid
    
    const {documents} = useFetchDocuments('events', null, uid)
    
    function handleSubmit(e:any){
        e.preventDefault()
        const post = {
            name: name,
            value: valueR$,
            type: typeEvent,
            uid
        }
        insertDocument(post)
        console.log(post)
    }

    function handleLogout(e:any){
        e.preventDefault();

        logout();
    }
    
    return(
        <div>
            <div className="title">
                <h1>seja bem vindo {user.displayName}</h1>
                <button className='btn-logout' onClick={(e) => handleLogout(e)}>sair</button>
            </div>

            <div className='subtitle'>
               <p className='subtitle-text'>este é um crud de que simula uma carteira digital </p>
            </div>
            <div className='workspace'>
                <div className='workspace-container'>
                    <div className='add'>
                        <div>
                            <form className='form-dashboard'>
                                <input className='input' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Nome do novo evento financeiro'/>
                                <input className='input' value={valueR$} onChange={(e) => setValueR$(e.target.value)} type="text" placeholder='valor do evento financeiro em R$' />
                                <select className='select' onChange={(e) => setTypeEvent(e.target.value)}>
                                    <option value="entry">Entrada</option>
                                    <option value="exit">Saída</option>
                                </select>
                                <button onClick={(e) => handleSubmit(e)}  className='btn-submit' >Enviar</button>
                            </form>
                        </div>
                    </div>
                    <div className='display'>
                        {documents && documents.map((doc:any, i:number) => {
                            return(
                                <Card key={i} cardTitle={doc.name} valueR$={doc.value}/>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}