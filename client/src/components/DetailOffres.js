import React from 'react';
import '../css/DetailOffres.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useOffreContext } from '../hooks/useOffreContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function DetailOffres({ offre }) {
  const { dispatch } = useOffreContext();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Date invalide";
      }
      return format(date, 'MMMM yyyy', { locale: fr });
    } catch (error) {
      return "Erreur de formatage";
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/offres/${offre._id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur de suppression:', errorData);
        toast.error('Échec de la suppression');
        return;
      }

      dispatch({ type: 'DELETE_OFFRE', payload: offre._id });
      toast.success('Offre supprimée avec succès');
    } catch (error) {
      console.error('Erreur de réseau ou serveur:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleEdit = () => {
    navigate(`/Modifier/${offre._id}`);
  };


   // Fonction pour déterminer si le type est un enregistrement de type PARC
   const isParc = (type) => type.nom === 'PARC';

   // Fonction pour afficher les types
   const renderTypes = () => {
     return offre.types.map((type, index) => {
       // Afficher PARC_MOYEN seulement si ce n'est pas un enregistrement PARC
       if (type.nom === 'PARC_MOYEN') {
         const isInParcContext = offre.types.some(t => t.nom === 'PARC');
         if (isInParcContext) {
           return null; // Ne pas afficher PARC_MOYEN si c'est un enregistrement PARC
         }
       }
       return <div key={index}>{`${type.nom}: ${type.valeur}`}</div>;
     });
   };


 
  return (
    <tr>
      <td>
        {renderTypes()}
      </td>
      <td>{offre.FSI_Adsl}</td>
      <td>{offre.adslH}</td>
      <td>{offre.adslP}</td>
      <td>{offre.FSI_Vdsl}</td>
      <td>{offre.vdslH}</td>
      <td>{offre.vdslP}</td>
      
      
      <td>{offre.Topnet}</td>
      <td>{offre.Globalnet}</td>
      <td>{offre.Hexabyte}</td>
      <td>{offre.Orange}</td>
      <td>{offre.ATI}</td>
      <td>{offre.I2S}</td>
      <td>{offre.Ooredoo}</td>
      <td>{offre.CHIFCO}</td>

      <td>{offre.Mega4}</td>
      <td>{offre.Mega8}</td>
      <td>{offre.Mega10}</td>
      <td>{offre.Mega12}</td>
      <td>{offre.Mega20}</td>
      <td>{offre.Mega30}</td>
      <td>{offre.Mega50}</td>
      <td>{offre.Mega100}</td>
      <td>{formatDate(offre.Date)}</td>
      <td className="icon-cell">
        <div className="icon-container">
          <FontAwesomeIcon icon={faEdit} className="icon" onClick={handleEdit} />
          <FontAwesomeIcon icon={faTrash} className="icon" onClick={handleDelete} />
        </div>
      </td>
    </tr>
  );
}

export default DetailOffres;
