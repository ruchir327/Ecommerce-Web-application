import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoadingGIF from "../../images/loading.gif";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && history.push("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "90vh" }}
  >
    <img src={LoadingGIF} alt="Loading" style={{ width: "400px" }} />
  </div>
  );
};

export default LoadingToRedirect;
