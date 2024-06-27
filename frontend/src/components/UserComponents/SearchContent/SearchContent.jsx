import React, { createContext, useState, useContext } from 'react';

const TeamSearchContext = createContext();

export const useTeamSearch = () => useContext(TeamSearchContext);

export const TeamSearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <TeamSearchContext.Provider value={{ searchTerm, updateSearchTerm, searchResults, updateSearchResults }}>
      {children}
    </TeamSearchContext.Provider>
  );
};
