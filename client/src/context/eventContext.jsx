import React, { createContext, useState, useContext } from 'react';

const EventContext = createContext(); 

export const SelectedEvent = () => useContext(EventContext); 

export const EventProvider = ({ children }) => {
  const [event, setEvent] = useState([]);

  return (
    <EventContext.Provider value={{ event,setEvent}}>
      {children}
    </EventContext.Provider>
  );
};
