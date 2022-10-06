import './style.css'

export function Card({
    valueR$,
    cardTitle
}:any){
    return(
        <div className='w-3/4 h-14 flex justify-between text-white text-2xl hover:translate-x-2 hover:duration-300 '>
            <div className="w-1/2 h-14 flex justify-center items-center bg-red-500 rounded-md rounded-r-none">{cardTitle}</div>
            <div className="w-1/2 h-14 flex justify-center items-center bg-red-500 rounded-md rounded-l-none" >R${valueR$}</div>
        </div>
    )
}