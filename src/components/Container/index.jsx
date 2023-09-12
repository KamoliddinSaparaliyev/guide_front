import React from "react";

const Container = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: "1800px",
        paddingLeft: "10px",
        paddingRight: "10px",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );
};

export default Container;
