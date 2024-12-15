import { useState, useContext, createContext, useEffect } from "react";

const ApplyContext = createContext();
const ApplyProvider = ({ children }) => {
  const [apply, setApply] = useState([]);

  useEffect(() => {
    let existingApplyItem = localStorage.getItem("apply");
    if (existingApplyItem) setApply(JSON.parse(existingApplyItem));
  }, []);

  return (
    <ApplyContext.Provider value={[apply, setApply]}>
      {children}
    </ApplyContext.Provider>
  );
};

// custom hook
const useApply = () => useContext(ApplyContext);

export { useApply, ApplyProvider };
