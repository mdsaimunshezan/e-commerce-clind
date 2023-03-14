import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagenation from "../../components/Pagenation";
import ScreenHeader from "../../components/ScreenHeader";
import Spiner from "../../components/Spiner";
import { useDeleteProdectMutation, useGetProdectQuery } from "../../store/services/prodectApi";
import Wraper from "./Wraper";
import Swal from 'sweetalert2'

const Prodects = () => {
  const [page,setPage] = useState(1);
  const { data,isLoading } = useGetProdectQuery(page);
  const [removeItem] = useDeleteProdectMutation();

  const handleProdectDelete = (id)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        removeItem(id)
      }
    })
      
  }
  return (
    <Wraper>
      <ScreenHeader>
        <Link to="/deshbord/create-products" className="btn-dark">
          products list
        </Link>
      </ScreenHeader>
      
    <div className="overflow-x-auto">
    <table className="w-full text-left bg-gray-900 mb-10">
        <thead>
          <tr>
            <th className="p-3 text-gray-500 uppercase font-medium">name</th>
            <th className="p-3 text-gray-500 uppercase font-medium">PRICE</th>
            <th className="p-3 text-gray-500 uppercase font-medium">STOCK</th>
            <th className="p-3 text-gray-500 uppercase font-medium">IMAGE</th>
            <th className="p-3 text-gray-500 uppercase font-medium">VIEW</th>
            <th className="p-3 text-gray-500 uppercase font-medium">EDIT</th>
            <th className="p-3 text-gray-500 uppercase font-medium">DELETE</th>
          </tr>
        </thead>

        <tbody>
         {isLoading ? <Spiner/> : data?.prodect?.length ?  data?.prodect?.map(item =>(
          <tr key={item._id} className="odd:bg-gray-800">
            <td className="p-3 text-gray-400 capitalize font-normal text-md">{item.title?.slice(0,30)}...</td>
            <td className="p-3 text-gray-400 capitalize font-normal text-md">$ {item.price}</td>
            <td className="p-3 text-gray-400 capitalize font-normal text-md">{item.stock}</td>
            <td className="p-3 text-gray-400 capitalize font-normal text-md"><img className="w-12 h-12 rounded object-cover" src={`http://localhost:5050/${item.image1}`} alt="img" /></td>
            <td className="p-3 text-gray-400 capitalize font-normal text-md"><button className="indigo-btn bg-green-700"><Link to={`/deshbord/view-products/${item._id}`}>View</Link> </button></td>
            <td className="p-3 text-gray-400 capitalize font-normal text-md"><button className="indigo-btn"> <Link to={`/deshbord/update-products/${item._id}`}>Edit</Link> </button></td>
            <td className="p-3 text-gray-400 capitalize font-normal text-md"><button className="red-btn" onClick={()=>handleProdectDelete(item._id)}>Delete</button></td>
          </tr>
         )): <div className="text-lg text-gray-300 font-semibold capitalize p-3">no prodect</div>}
        </tbody>
      </table>
    </div>

     {data?.prodect?.length ?  <Pagenation page={page} setPage={setPage} pageCount={data?.pageCount}/>:null}
    </Wraper>
  );
};

export default Prodects;
