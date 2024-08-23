import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useOffreContext } from '../hooks/useOffreContext';

function Form() {
  const { dispatch } = useOffreContext();

  const [adslH, setAdslH] = useState("");
  const [adslP, setAdslP] = useState("");
  const [vdslH, setVdslH] = useState("");
  const [vdslP, setVdslP] = useState("");
  const [type, setType] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [varParc, setVarParc] = useState(0);
  const [varGrossAdds, setGrossAdds] = useState(0);
  const [varChurn, setChurn] = useState(0);
  const [varRevenu, setRevenu] = useState(0);
  const [offres, setOffres] = useState([]);
  const [parcMoyen, setParcMoyen] = useState(0);
  const [arpu, setArpu] = useState(0);
  const [Mega4, setMega4] = useState("");
  const [Mega8, setMega8] = useState("");
  const [Mega10, setMega10] = useState("");
  const [Mega12, setMega12] = useState("");
  const [Mega20, setMega20] = useState("");
  const [Mega30, setMega30] = useState("");
  const [Mega50, setMega50] = useState("");
  const [Mega100, setMega100] = useState("");
  const [Topnet, setTopnet] = useState("");
  const [Globalnet, setGlobalnet] = useState("");
  const [Hexabyte, setHexabyte] = useState("");
  const [Orange, setOrange] = useState("");
  const [ATI, setATI] = useState("");
  const [I2S, setI2S] = useState("");
  const [Ooredoo, setOoredoo] = useState("");
  const [CHIFCO, setCHIFCO] = useState("");

  const handleTypeChange = (e) => setType(e.target.value);
  const handleCheckboxChange = (e) => setIsChecked(e.target.checked);
  const handleTopnet = (e) => setTopnet(e.target.value);
  const handleGlobalnet = (e) => setGlobalnet(e.target.value);
  const handleHexabyte = (e) => setHexabyte(e.target.value);
  const handleOrange = (e) => setOrange(e.target.value);
  const handleATI = (e) => setATI(e.target.value);
  const handleI2S = (e) => setI2S(e.target.value);
  const handleOoredoo = (e) => setOoredoo(e.target.value);
  const handleCHIFCO = (e) => setCHIFCO(e.target.value);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await fetch('/offres');

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
        }

        const text = await response.text();
        const data = JSON.parse(text);

        setOffres(data);

        if (data.length > 0) {
          const firstOffer = data[0];
          setVarParc(firstOffer.varParc || 0);

          const parcMoyenType = firstOffer.types.find((type) => type.nom === 'PARC_MOYEN');
          if (parcMoyenType) {
            setParcMoyen(parcMoyenType.valeur || 0);
          }

          const arpuType = firstOffer.types.find((type) => type.nom === 'ARPU');
          if (arpuType) {
            setArpu(arpuType.valeur || 0);
          }

          setGrossAdds(firstOffer.varGrossAdds || 0);
          setChurn(firstOffer.varChurn || 0);
          setRevenu(firstOffer.varRevenu || 0);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des offres:', error);
      }
    };

    fetchOffres();
  }, []);

  const calculateValue = (type) => {
    switch (type) {
      case 'PARC':
        return varParc;
      case 'PARC_MOYEN':
        return parcMoyen;
      case 'GROSS_ADDS':
        return varGrossAdds;
      case 'CHURN':
        return varChurn;
      case 'REVENU':
        return varRevenu;
      case 'ARPU':
        const arpu = offres.reduce((total, offre) => total + (offre.ARPU || 0), 0);
        return arpu || 0;
      default:
        return 0;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!adslH) newErrors.adslH = 'FSI-ADSL hybride est requis';
    if (!adslP) newErrors.adslP = 'FSI-ADSL pop est requis';
    if (!vdslH) newErrors.vdslH = 'FSI-VDSL hybride est requis';
    if (!vdslP) newErrors.vdslP = 'FSI-VDSL pop est requis';
    if (!type) newErrors.type = 'Type est requis';

    if (!isChecked) newErrors.isChecked = 'Veuillez confirmer vos informations';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const selectedType = {
      nom: type,
      valeur: calculateValue(type),
    };

    const offre = {
      adslH: parseFloat(adslH),
      adslP: parseFloat(adslP),
      vdslH: parseFloat(vdslH),
      vdslP: parseFloat(vdslP),
      types: [selectedType],
      Topnet: parseFloat(Topnet),
      Globalnet: parseFloat(Globalnet),
      Hexabyte: parseFloat(Hexabyte),
      Orange: parseFloat(Orange),
      ATI: parseFloat(ATI),
      I2S: parseFloat(I2S),
      Ooredoo: parseFloat(Ooredoo),
      CHIFCO: parseFloat(CHIFCO),
      Mega4,
      Mega8,
      Mega10,
      Mega12,
      Mega20,
      Mega30,
      Mega50,
      Mega100,
    };

    try {
      const response = await fetch('/offres', {
        method: 'POST',
        body: JSON.stringify(offre),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.error || "Erreur lors de l'ajout de l'offre");
        }

        toast.success('Offre ajoutée avec succès');

        setAdslH('');
        setAdslP('');
        setVdslH('');
        setVdslP('');
        setType('');
        setTopnet('');
        setGlobalnet('');
        setHexabyte('');
        setOrange('');
        setATI('');
        setI2S('');
        setOoredoo('');
        setCHIFCO('');
        setMega4('');
        setMega8('');
        setMega10('');
        setMega12('');
        setMega20('');
        setMega30('');
        setMega50('');
        setMega100('');
        setIsChecked(false);
        dispatch({ type: 'CREATE_OFFRE', payload: json });

        navigate('/Afficher');
      } else {
        throw new Error('Réponse du serveur non JSON');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast.error("Erreur lors de l'ajout de l'offre: " + error.message);
    }
  };

  return (
    <div className="form-body">
      <div className="row">
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Ajouter vos informations</h3>
              <p>Remplissez les champs obligatoires.</p>
              <form className="requires-validation" noValidate onSubmit={handleSubmit}>
                <div className="formulaire">
                  <div className="label-input">
                    <div className="col-md-12">
                      <label htmlFor="type">Type</label>
                      <select
                        id="type"
                        className="form-select mt-3"
                        value={type}
                        onChange={handleTypeChange}
                        required
                      >
                        <option disabled value="">
                          Choisissez un type
                        </option>
                        <option value="PARC">PARC</option>
                        <option value="PARC_MOYEN">PARC Moyen</option>
                        <option value="GROSS_ADDS">Gross adds</option>
                        <option value="CHURN">Churn</option>
                        <option value="REVENU">Revenu</option>
                        <option value="ARPU">ARPU</option>
                      </select>
                      {errors.type && <div className="error">{errors.type}</div>}
                    </div>
                  </div>

                  <div className="table">
                  <div className="tr">
                    <div className="td">
                    <div className="col-md-12">
                      <label htmlFor="adslH">FSI-ADSL hybride</label>
                      <input
                        className="form-control"
                        type="number"
                        name="adslH"
                        id="adslH"
                        placeholder="FSI-ADSL hybride"
                        value={adslH}
                        onChange={(e) => setAdslH(e.target.value)}
                      />
                      {errors.adslH && <div className="error">{errors.adslH}</div>}
                    </div>
                    </div>
                  

                  
                    <div className="td">
                    <div className="col-md-12">
                      <label htmlFor="adslP">FSI-ADSL pop</label>
                      <input
                        className="form-control"
                        type="number"
                        name="adslP"
                        id="adslP"
                        placeholder="FSI-ADSL pop"
                        value={adslP}
                        onChange={(e) => setAdslP(e.target.value)}
                      />
                      {errors.adslP && <div className="error">{errors.adslP}</div>}
                    </div>
                    
                  
                  </div>
                    
                  <div className='td'>
                    <div className="col-md-12">
                      <label htmlFor="vdslH">FSI-VDSL hybride</label>
                      <input
                        className="form-control"
                        type="number"
                        name="vdslH"
                        id="vdslH"
                        placeholder="FSI-VDSL hybride"
                        value={vdslH}
                        onChange={(e) => setVdslH(e.target.value)}
                      />
                      {errors.vdslH && <div className="error">{errors.vdslH}</div>}
                    </div>
                    </div>

                  <div className="label-input">
                    <div className="col-md-12">
                      <label htmlFor="vdslP">FSI-VDSL pop</label>
                      <input
                        className="form-control"
                        type="number"
                        name="vdslP"
                        id="vdslP"
                        placeholder="FSI-VDSL pop"
                        value={vdslP}
                        onChange={(e) => setVdslP(e.target.value)}
                      />
                      {errors.vdslP && <div className="error">{errors.vdslP}</div>}
                    </div>
                  </div>
                  </div>
                  <hr></hr>
                  <div className='tr'>
                      <div className="td">
                         <div className="col-md-12">
                      <label htmlFor="Topnet">Topnet</label>
                      <input
                        className="form-control"
                        type="number"
                        name="Topnet"
                        id="Topnet"
                        placeholder="Topnet"
                        value={Topnet}
                        onChange={handleTopnet}
                      />
                    </div>
                  </div>

                  <div className="td">
                    <div className="col-md-12">
                      <label htmlFor="Globalnet">Globalnet</label>
                      <input
                        className="form-control"
                        type="number"
                        name="Globalnet"
                        id="Globalnet"
                        placeholder="Globalnet"
                        value={Globalnet}
                        onChange={handleGlobalnet}
                      />
                    </div>
                  </div>

                  <div className="td">
                    <div className="col-md-12">
                      <label htmlFor="Hexabyte">Hexabyte</label>
                      <input
                        className="form-control"
                        type="number"
                        name="Hexabyte"
                        id="Hexabyte"
                        placeholder="Hexabyte"
                        value={Hexabyte}
                        onChange={handleHexabyte}
                      />
                    </div>
                  </div>
                  
                  
                  <div className="td">
                    <div className="col-md-12">
                      <label htmlFor="Orange">Orange</label>
                      <input
                        className="form-control"
                        type="number"
                        name="Orange"
                        id="Orange"
                        placeholder="Orange"
                        value={Orange}
                        onChange={handleOrange}
                      />
                    </div>
                  </div>
                  </div>
                  <div className='tr'>
                  <div className="td">
                    <div className="col-md-12">
                      <label htmlFor="ATI">ATI</label>
                      <input
                        className="form-control"
                        type="number"
                        name="ATI"
                        id="ATI"
                        placeholder="ATI"
                        value={ATI}
                        onChange={handleATI}
                      />
                    </div>
                  </div>

                  <div className="td">
                    <div className="col-md-12">
                      <label htmlFor="I2S">I2S</label>
                      <input
                        className="form-control"
                        type="number"
                        name="I2S"
                        id="I2S"
                        placeholder="I2S"
                        value={I2S}
                        onChange={handleI2S}
                      />
                    </div>
                  </div>
                  

                  <div className="td">
                    <div className="col-md-12">
                      <label htmlFor="Ooredoo">Ooredoo</label>
                      <input
                        className="form-control"
                        type="number"
                        name="Ooredoo"
                        id="Ooredoo"
                        placeholder="Ooredoo"
                        value={Ooredoo}
                        onChange={handleOoredoo}
                      />
                    </div>
                  </div>

                  <div className="td">
                    <div className="col-md-12">
                      <label htmlFor="CHIFCO">CHIFCO</label>
                      <input
                        className="form-control"
                        type="number"
                        name="CHIFCO"
                        id="CHIFCO"
                        placeholder="CHIFCO"
                        value={CHIFCO}
                        onChange={handleCHIFCO}
                      />
                    </div>
                  </div>
                  </div>
                  </div>
                  


                  < div className="tr">
                  <div className="td">
                  <div className="col-md-12">
                    <label htmlFor="Mega4">Mega4</label>
                    <input
                      id="Mega4"
                      type="text"
                      className="form-control"
                      value={Mega4}
                      placeholder='4M'
                      onChange={(e) => setMega4(e.target.value)}
                    />
                  </div>
                  </div>
                
                <div className="td">
                <div className="col-md-12">
                    <label htmlFor="Mega8">Mega8</label>
                    <input
                      id="Mega8"
                      type="text"
                      className="form-control"
                      value={Mega8}
                      placeholder='8M'
                      onChange={(e) => setMega8(e.target.value)}
                    />
                  </div>
                </div>
                
                  <div className="td">
                  <div className="col-md-12">
                    <label htmlFor="Mega10">Mega10</label>
                    <input
                      id="Mega10"
                      type="text"
                      className="form-control"
                      value={Mega10}
                      placeholder='10M'
                      onChange={(e) => setMega10(e.target.value)}
                    />
                  </div>
                  </div>
                  
                <div className="td">
                <div className="col-md-12">
                    <label htmlFor="Mega12">Mega12</label>
                    <input
                      id="Mega12"
                      type="text"
                      className="form-control"
                      value={Mega12}
                      placeholder='12M'
                      onChange={(e) => setMega12(e.target.value)}
                    />
                  </div>
                </div>
                </div>
                <div className="tr">
                  <div className="td">
                  <div className="col-md-12">
                    <label htmlFor="Mega20">Mega20</label>
                    <input
                      id="Mega20"
                      type="text"
                      className="form-control"
                      value={Mega20}
                      placeholder='20M'
                      onChange={(e) => setMega20(e.target.value)}
                    />
                  </div>
                  </div>
                
                
                  <div className="td">
                  <div className="col-md-12">
                    <label htmlFor="Mega30">Mega30</label>
                    <input
                      id="Mega30"
                      type="text"
                      className="form-control"
                      value={Mega30}
                      placeholder='30M'
                      onChange={(e) => setMega30(e.target.value)}
                    />
                  </div>
                  </div>
                
                
                  <div className="td">
                  <div className="col-md-12">
                    <label htmlFor="Mega50">Mega50</label>
                    <input
                      id="Mega50"
                      type="text"
                      className="form-control"
                      value={Mega50}
                      placeholder='50M'
                      onChange={(e) => setMega50(e.target.value)}
                    />
                  </div>
                </div>
                
                  <div className="td">
                  <div className="col-md-12">
                    <label htmlFor="Mega100">Mega100</label>
                    <input
                      id="Mega100"
                      type="text"
                      className="form-control"
                      value={Mega100}
                      placeholder='100M'
                      onChange={(e) => setMega100(e.target.value)}
                    />
                    </div>
                  
                </div>
                </div>
                
<div className="form-check mt-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="checkbox">
                      Je confirme que les informations sont correctes
                    </label>
                    {errors.isChecked && <div className="error">{errors.isChecked}</div>}
                  </div>
                  
                  <div className="form-button mt-3">
                    <button id="submit" type="submit" className="btn btn-primary">
                      Ajouter
                    </button>
                  
                  </div>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Form;
