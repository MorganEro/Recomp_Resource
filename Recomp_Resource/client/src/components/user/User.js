import React from "react";

const User = ({ user }) => {
  return (
    <div className="card h-100" style={{ width: "85vw" }}>
      {/*--------------Image-------------*/}
      <div className="row g-0 align-items-center">
        <div className="col-4">
          <img
            className="img-fluid rounded p-2"
            src={user.imageAddress}
            alt="user"
          />
        </div>
        {/*--------------User Info-------------*/}
        <div className="col-8">
          <div className="card-body">
            <h1 className="card-title" title="Learn more about me">
              <a href={`../../user/details/${user.id}`}>
                <strong>{user.displayName}</strong>{" "}
              </a>
            </h1>
            <div className="card-text">
              <div>
                <strong>Current Focus</strong> {user.currentFocus}
              </div>
              <div>
                <strong>Goal</strong> {user?.category?.goal}
              </div>
              <div>
                <strong>Active</strong>{" "}
                {user?.deactivated?.toString() === "false"
                  ? "Account Active"
                  : "Account Deactivated"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;
