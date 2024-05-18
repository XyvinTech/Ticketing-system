import React from 'react';

const AdminTable = (props) => {
    const { header, selectAll, onHeaderCheckboxChange, children } = props;
  return (
    <div className="overflow-x-auto rounded-lg border shadow">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50 uppercase">
              <tr>
                {header.map((item, index) => (
                  <th
                    key={index}
                    className="px-3 py-4 text-left text-sm font-semibold text-gray-900"
                  >
                    {index === 0 && <input type="checkbox"checked={selectAll} 
                    onChange={onHeaderCheckboxChange}  className="mr-2 accent-purple-500" />}
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y px-3 py-4 divide-gray-200 bg-white">
              {props.children}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
