import React from "react";
import LeftShowcase from "./LeftShowcase";
import RightSignUp from "./RightShowcase";

function Signup() {
  return (
    <div className="w-screen min-h-screen flex">
      <LeftShowcase />
      <RightSignUp />
    </div>
  );
}

export default Signup;
