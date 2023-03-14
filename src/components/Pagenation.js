import React from "react";

const Pagenation = ({ page, setPage, pageCount,theme }) => {
  const hanldePrev = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  const hanldeNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };
  return (
    <div>
      <button
        onClick={hanldePrev}
        className={`px-5 py-1 ${theme === "light" ? "bg-white border border-gray-400" :"bg-gray-900 border border-gray-600"}   text-gray-500 inline-block `}
      >
        PREV
      </button>
      {Array(pageCount)
        .fill(null)
        .map((item, index) => (
          <button
            className={`px-4 py-1  text-gray-500 ${theme === "light" ? "bg-gray-300 border text-black border-gray-400" :"bg-gray-900"}  ${
              page === index + 1 ? `${theme === "light" ? "text-black bg-black/20 " :"text-white bg-indigo-500"}  ` : null
            }`}
            onClick={()=>setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      <button
        onClick={hanldeNext}
        className={`px-5 py-1 ${theme === "light" ? "bg-white border border-gray-400" :"bg-gray-900 border border-gray-600"}   text-gray-500 inline-block `}
      >
        NEXT
      </button>
    </div>
  );
};

export default Pagenation;
