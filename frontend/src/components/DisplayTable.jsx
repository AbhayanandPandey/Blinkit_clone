import React from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

const DisplayTable = ({data,column}) => {
    const table = useReactTable({
        data,
        columns: column,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="p-2 rounded">
      <table className=' py-0 px-0 border-collapse rounded w-full'>
        <thead className='bg-green-700 text-white'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
                {
                    <th className='px-3'>Sr.No</th>
                }
              {headerGroup.headers.map(header => (
                <th key={header.id} className='border p-2 whitespace-nowrap '>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className=''>
          {table.getRowModel().rows.map((row,index) => (
            <tr key={row.id}>
                <td className='border border-blue-200 shadow-md px-2 py-1 text-center '>{index+1}</td>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='border border-blue-200 shadow-md px-2 py-1 whitespace-nowrap '>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}

export default DisplayTable
