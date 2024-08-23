import '../css/Form.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ModifierForm() {
  const { id } = useParams();
  const [adslH, setAdslH] = useState("");
  const [adslP, setAdslP] = useState("");
  const [vdslH, setVdslH] = useState("");
  const [vdslP, setVdslP] = useState("");
  const [type, setType] = useState("");
  const [valeur, setValeur] = useState(0); // Ajout d'un état pour stocker la valeur existante
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
    const fetchOffre = async () => {
      try {
        const response = await fetch(`/offres/${id}`);
        const data = await response.json();
        if (response.ok) {
          setType(data.types ? data.types[0]?.nom || '' : '');
          setValeur(data.types ? data.types[0]?.valeur || 0 : 0); // Stockage de la valeur existante
          setAdslH(data.adslH || '');
          setAdslP(data.adslP || '');
          setVdslH(data.vdslH || '');
          setVdslP(data.vdslP || '');
          setTopnet(data.Topnet || '');
          setGlobalnet(data.Globalnet || '');
          setHexabyte(data.Hexabyte || '');
          setOrange(data.Orange || '');
          setATI(data.ATI || '');
          setI2S(data.I2S || '');
          setOoredoo(data.Ooredoo || '');
          setCHIFCO(data.CHIFCO || '');
          setMega4(data.Mega4 || '');
          setMega8(data.Mega8 || '');
          setMega10(data.Mega10 || '');
          setMega12(data.Mega12 || '');
          setMega20(data.Mega20 || '');
          setMega30(data.Mega30 || '');
          setMega50(data.Mega50 || '');
          setMega100(data.Mega100 || '');
          setIsChecked(data.isChecked || false);
        } else {
          toast.error('Erreur de chargement de l\'offre');
        }
      } catch (error) {
        toast.error('Erreur lors de la récupération de l\'offre');
      }
    };
    fetchOffre();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedOffre = {
      adslH: parseFloat(adslH),
      adslP: parseFloat(adslP),
      vdslH: parseFloat(vdslH),
      vdslP: parseFloat(vdslP),
      types: [{ nom: type, valeur: valeur }], // Utilisation de la valeur existante stockée dans l'état
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
      const response = await fetch(`/offres/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedOffre),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        toast.success('Offre modifiée avec succès');
        navigate('/Afficher');
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.error });
        toast.error('Échec de la modification de l\'offre');
      }
    } catch (error) {
      toast.error('Erreur lors de la modification de l\'offre');
    }
  };

  return (
    <div className="form-body">
    <div className="row">
      <div className="form-holder">
        <div className="form-content">
          <div className="form-items">
            <h3>Modifier vos informations</h3>
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
                    Modifier
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

export default ModifierForm;
