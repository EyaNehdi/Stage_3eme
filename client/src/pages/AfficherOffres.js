import { useEffect, useContext } from 'react';
import DetailOffres from '../components/DetailOffres';
import { saveAs } from 'file-saver';
import '../css/AfficherOffres.css';
import ExcelJS from 'exceljs';
import { OffresContext } from '../context/OffreContext'; // Import the context

function AfficherOffres() {
  const { state, dispatch } = useContext(OffresContext); // Use the context
  const { offres } = state; // Destructure the state to get the offres

  useEffect(() => {
    const fetchOffres = async () => {
      const response = await fetch('/offres');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_OFFRES', payload: json }); // Dispatch action to set offres
      }
    };

    fetchOffres();
  }, [dispatch]);


  return (
    <>
     
      <div className="container">
        <table>
          <thead>
            <tr>
            <th>Type</th>
            <th>FSI-ADSL</th>
              <th>FSI-ADSL hybride</th>
              <th>FSI-ADSL pop</th>
              <th>FSI-VDSL</th>
              <th>FSI-VDSL hybride</th>
              <th>FSI-VDSL pop</th>
              
              
              <th>Topnet</th>
              <th>Globalnet</th>
              <th>Hexabyte</th>
              <th>Orange</th>
              <th>ATI</th>
              <th>I2S</th>
              <th>Ooredoo</th>
              <th>CHIFCO</th>
              
              <th>4M</th>
              <th>8M</th>
              <th>10M</th>
              <th>12M</th>
              <th>20M</th>
              <th>30M</th>
              <th>50M</th>
              <th>100M</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offres && offres.map((offre) => (
              <DetailOffres key={offre._id} offre={offre} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AfficherOffres;