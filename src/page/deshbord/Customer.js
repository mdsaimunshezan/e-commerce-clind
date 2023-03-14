import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import ScreenHeader from '../../components/ScreenHeader';
import Spiner from '../../components/Spiner';
import { useGetCustomerQuery } from '../../store/services/authApi'
import Wraper from './Wraper';

const Customer = () => {
    const { data,isLoading } = useGetCustomerQuery();
    console.log(data)
  return (
   <Wraper>
   <ScreenHeader>
       <div className="btn-dark inline-block">
          cutomer list
          </div>
      </ScreenHeader>

      {/* show customer */}
      <div className="overflow-x-auto">
     <table className="w-full bg-gray-900 rounded-md mb-8">
        <thead>
          <tr className="border-b border-gray-800 text-left">
            <th className="px-5 py-4 text-base text-gray-500 uppercase font-medium">
              Name
            </th>
            <th className="px-5 py-4 text-base text-gray-500 uppercase font-medium">
              email
            </th>
            <th className="px-5 py-4 text-base text-gray-500 uppercase font-medium">
              role
            </th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? <Spiner/> : data?.length ? (
            data?.map((customer) => (
              <tr key={customer._id} className="odd:bg-gray-800">
                <td className="px-5 py-4 text-md text-gray-400 capitalize font-base">
                  {customer.name}
                </td>
                <td className="px-5 py-4 text-md text-gray-400 capitalize font-base">
                  {customer.email}
                </td>
                <td className="px-5 py-4 text-md text-gray-400 capitalize font-base">
                  {customer.admin ? <span className='bg-blue-500 px-3 py-1 text-black rounded'>admin</span>: <span className='bg-indigo-800 px-3 py-1 text-white rounded'>user</span>}
                </td>
               
               
              </tr>
            ))
          ) : (
            <div className="text-gary-500 text-lg font-semibold capitalize p-3">no category</div>
          )}
        </tbody>
      </table>
     </div>
   </Wraper>
  )
}

export default Customer