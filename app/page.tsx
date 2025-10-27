import React from "react";
import Hello from "./components/Hello";

const Home = () => {
  return (
    <>
      <div className="text-5xl underline">{`Welcome to Paradise`}</div>
      <br />

      <Hello />
    </>
  );
};

export default Home;
