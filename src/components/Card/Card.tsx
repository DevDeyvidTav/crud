import './style.css'

export function Card({
    valueR$,
    cardTitle,
    type
}:any){
    return(
        <div className='w-3/4 h-14 flex justify-between text-white text-2xl hover:translate-x-2 hover:duration-300 '>
            <div className={`${type === 'exit'? 'bg-red-400' : 'bg-green-400'}  w-1/2 h-14 flex justify-center items-center rounded-md rounded-r-none`}>{cardTitle}</div>
            <div className={`${type === 'exit'? 'bg-red-400' : 'bg-green-400'}  w-1/2 h-14 flex justify-center items-center rounded-md rounded-l-none`} >R${valueR$}</div>
        </div>
    )
}