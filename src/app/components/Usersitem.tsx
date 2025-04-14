import React from "react";

const Usersitem = () => {
  return (
    <div>
      <div className="overflow-x-auto shadow-2xl ">
        <table className="min-w-full bg-white rounded-2xl ">
          <thead className="bg-[#FAFAFA] text-[#202020]">
            <tr className="text-md  font-bold border-gray-300">
              <th className="px-4 py-3 w-[150px]">User ID</th>
              <th className="px-6 py-3 text-left w-[255px]">Name</th>
              <th className="px-6 py-3 text-left w-[305px]">Mobile Number</th>
              <th className="px-4 py-3 text-left min-w-[500px]">Email</th>

              <th className="px-4 py-3 text-left w-[150px]">Status</th>
              {/* <th className="px-4 py-3 text-left">Actions</th> */}
            </tr>
          </thead>
          <tbody>{/* Content */}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Usersitem;
