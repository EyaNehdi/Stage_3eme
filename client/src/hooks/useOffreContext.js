import { useContext } from 'react';
import { OffresContext } from '../context/OffreContext'; // Vérifiez que le chemin est correct

export const useOffreContext = () => {
  const context = useContext(OffresContext);

  if (!context) {
    throw new Error('useOffreContext must be used within an OffresContextProvider');
  }

  return context;
};
