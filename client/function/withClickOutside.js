import React, { useState, useRef, useEffect } from "react";

export default function withClickOutside(WrappedComponent) {
  const Component = (props) => {
    const [open, setOpen] = useState(false);

    const ref = useRef(null); // Set initial value of ref to null

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) { // Check if ref.current exists before accessing its properties
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []); // Empty dependency array to ensure the effect runs only once

    return <WrappedComponent open={open} setOpen={setOpen} ref={ref} {...props} />;
  };

  return Component;
}
