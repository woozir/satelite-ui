import React from "react";
import "./UsersCount.css";

interface IUsersCountProps {
  count: number;
}

const UsersCount: React.FC<IUsersCountProps> = ({ count }) => {
  return (
    <div className="container">
      <h1>{count}</h1>
    </div>
  );
};

export default UsersCount;
