// src/context/FrogContext.js
import { createContext, useState } from 'react';

export const FrogContext = createContext();

export const FrogProvider = ({ children }) => {
  const [frogs, setFrogs] = useState([
    { id: 1, name: "Лягушка 1", description: "Описание 1", image: "/images/small-image1.png" }
  ]);

  const addFrog = (newFrog) => {
    setFrogs(prev => [...prev, {
      ...newFrog,
      id: Date.now()
    }]);
  };

  return (
    <FrogContext.Provider value={{ frogs, addFrog }}>
      {children}
    </FrogContext.Provider>
  );
};