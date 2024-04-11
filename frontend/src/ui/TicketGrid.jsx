import React from 'react'

const TicketGrid = ({item}) => {
  return (
    <>
    {item.map((i, index) => (
    <div className="overflow-hidden rounded-lg border bg-white px-4 py-5 shadow sm:p-6">
    <dt className="truncate text-sm font-medium text-gray-500">
   {i.name}
    </dt>
    <dd className="mt-1 text-3xl font-semibold text-gray-900">
    {i.count} 
    </dd>
  </div>
    ))}</>
  )
}

export default TicketGrid
