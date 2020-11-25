import React from "react";

interface IUsersCountProps {
  count: number;
}

const UsersCount: React.FC<IUsersCountProps> = ({ count }) => {
  return (
    <div className="bg-gradient-to-r from-gray-700 via-purple-700 to-pink-400 rounded-lg text-center pt-6 pb-6 mt-6">
      <h1 className="text-7xl text-white">{count}</h1>
      <div className="text-white">{count === 1 ? "Nomade présent" : "Nomades présents"}</div>
    </div>
  );
};

export default UsersCount;
