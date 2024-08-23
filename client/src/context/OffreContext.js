import { createContext, useReducer } from 'react';

// Création du contexte
export const OffresContext = createContext();

// Réducteur avec état initial défini correctement
export const offresReducer = (state, action) => {
  switch (action.type) {
    case 'SET_OFFRES':
      return { 
        ...state,
        offres: action.payload 
      };
    case 'CREATE_OFFRE':
      return { 
        ...state,
        offres: [action.payload, ...state.offres] 
      };
    case 'DELETE_OFFRE':
      return { 
        ...state,
        offres: state.offres.filter(offre => offre._id !== action.payload)
      };
    default:
      return state;
  }
};

// Fournisseur de contexte avec état initial correct
export const OffresContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(offresReducer, { 
    offres: []  // Initialisé à un tableau vide, pas à null
  });
  
  return (
    <OffresContext.Provider value={{ state, dispatch }}>
      {children}
    </OffresContext.Provider>
  );
};

export default OffresContext;
