import React from 'react'

const ShowSize = ({sizeList,removeSize}) => {
  return (
    <div className="mt-3 mb-3">
    {sizeList?.length > 0 &&  <h3 className="text-gray-400 font-semibold mb-2 capitalize">colors list</h3>}
    {sizeList?.length > 0 &&  <div className="flex flex-wrap gap-3 cursour-pointer">
       {sizeList.map(size=>(
           <div className="border border-gray-400 px-3 py-1 text-gray-400 rounded cursor-pointer" onClick={()=>removeSize(size.name)}>{size.name}</div>
       ))}
       </div>}
  </div>
  )
}

export default ShowSize