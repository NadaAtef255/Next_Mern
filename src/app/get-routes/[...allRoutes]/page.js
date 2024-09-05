import React from "react";

function Params({ params }) {
  console.log(params);
  return (
    <div className="flex justify-center flex-col items-center min-h-screen">
      Params
      {params.allRoutes.map((param) => (
        <ul>
          <li>{param}</li>
        </ul>
      ))}
    </div>
  );
}

export default Params;
