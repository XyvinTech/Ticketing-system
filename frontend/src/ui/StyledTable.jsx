import React from 'react';

const StyledTable = (props) => {
  const { header } = props;
  return (
    <div className="overflow-x-auto rounded-lg border shadow">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50 uppercase">
              <tr>
                {header.map((i, index) => (
                  <th
                    key={index} // Add a unique key prop here
                    className="px-3 py-4 text-left text-sm font-semibold text-gray-900"
                  >
                    {i}
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

export default StyledTable;
