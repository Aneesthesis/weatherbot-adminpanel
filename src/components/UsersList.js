import React, { useEffect } from "react";

function UsersList({ usersList, toggleBlockHandler }) {
  const hasValidData = usersList && Array.isArray(usersList.users);
  return (
    hasValidData && (
      <div>
        <table className="min-w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Date Created</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.users.map((user) => (
              <tr key={user.userId} className="border-b">
                <td className="px-4 py-2 text-center">{user.userId}</td>
                <td className="px-4 py-2 text-center">
                  {user.username || "Hidden"}
                </td>
                <td className="px-4 py-2 text-center">{user.dateCreated}</td>
                <td className="flex items-center justify-center gap-x-2 px-4 py-2">
                  <button
                    onClick={() => toggleBlockHandler(user.userId)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Toggle Blocking
                  </button>
                  <div
                    className={`px-16 py-2 text-white rounded ${
                      user.isBlocked ? "bg-rose-400" : "bg-green-400"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

export default UsersList;
