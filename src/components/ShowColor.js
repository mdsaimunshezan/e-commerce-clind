import React from 'react'

const ShowColor = ({color,removeColor}) => {
  return (
   <div className="">
     {color?.length > 0 &&  <h3 className="text-gray-400 font-semibold mb-2 capitalize">colors list</h3>}
     {color?.length > 0 &&  <div className="flex flex-wrap gap-3 cursour-pointer">
        {color.map(color=>(
            <div className="w-[30px] h-[30px] rounded-full cursor-pointer" onClick={()=>removeColor(color)} style={{background:color.color}}></div>
        ))}
        </div>}
   </div>
  )
}

export default ShowColor