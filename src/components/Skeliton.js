import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Skeliton = ({size}) => {
  return (
    <div className="grid md:grid-cols-6 gap-6 container mx-auto px-6 mt-[60px]">
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <Skeleton
        baseColor="#C0C0C0"
        highlightColor="#a7a6ba"
        height={size}
        key={item}
      />
    ))}
  </div>
  )
}

export default Skeliton