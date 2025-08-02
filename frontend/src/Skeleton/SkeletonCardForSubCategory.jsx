import React from 'react';

const SkeletonCardForSubCategory = () => {
  return (
    <div className="w-full animate-pulse">
      <table className="w-full border-collapse">
        <tbody>
          {Array(5).fill(0).map((_, i) => (
            <tr key={i} className="border-t border-blue-200">
              <td className="p-2 text-center">
                <div className="h-4 w-6 bg-gray-200 rounded mx-auto" />
              </td>
              <td className="p-2">
                <div className="h-4 w-40 bg-gray-200 rounded" />
              </td>
              <td className="p-2">
                <div className="h-10 w-10 bg-gray-200 rounded mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonCardForSubCategory;
