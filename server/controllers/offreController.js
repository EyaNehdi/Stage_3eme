const Offre = require('../models/offreModel')
const mongoose= require('mongoose')




// Fonction d'ajout d'offre
const ajouterOffre = async (req, res) => {
  const { adslH, adslP, vdslH, vdslP, types, Topnet,Globalnet,Hexabyte,
    Orange,ATI,I2S,Ooredoo,CHIFCO, Mega4, Mega8, Mega10, Mega12, Mega20, Mega30, Mega50, Mega100 } = req.body;

  try {
    const FSI_Adsl = adslH + adslP;
    const FSI_Vdsl = vdslH + vdslP;

    // Obtenez la date actuelle
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Les mois sont de 0 à 11
    const currentYear = currentDate.getFullYear();

    // Filtrer les types pour REVENU et PARC_MOYEN par mois et année
    const revenuRecord = await Offre.findOne({
      'types.nom': 'REVENU',
      createdAt: {
        $gte: new Date(currentYear, currentMonth - 1, 1),
        $lt: new Date(currentYear, currentMonth, 1),
      }
    });

    const parcMoyenRecord = await Offre.findOne({
      'types.nom': 'PARC_MOYEN',
      createdAt: {
        $gte: new Date(currentYear, currentMonth - 1, 1),
        $lt: new Date(currentYear, currentMonth, 1),
      }
    });

    const revenu = revenuRecord?.types.find(t => t.nom === 'REVENU')?.valeur || 0;
    const parcMoyen = parcMoyenRecord?.types.find(t => t.nom === 'PARC_MOYEN')?.valeur || 0;

    // Créer l'offre avec les valeurs calculées
    const offre = new Offre({
      adslH,
      adslP,
      FSI_Adsl,
      vdslH,
      vdslP,
      FSI_Vdsl,
      types: types.map(type => {
        let valeur;
        if (type.nom === 'PARC') {
          valeur = FSI_Adsl + FSI_Vdsl;
        }else if (type.nom === 'REVENU') {
            valeur = FSI_Adsl + FSI_Vdsl;
          
        } else if (type.nom === 'GROSS_ADDS') {
          valeur = FSI_Adsl + FSI_Vdsl;
        
        }else if (type.nom === 'CHURN') {
          valeur = FSI_Adsl + FSI_Vdsl;
        
      }
        else if (type.nom === 'ARPU') {
          valeur = parcMoyen !== 0 ? revenu / parcMoyen : 0;
        } else {
          valeur = type.valeur;
        }
        return { nom: type.nom, valeur };
      }),
      Topnet,Globalnet,Hexabyte,
    Orange,ATI,I2S,Ooredoo,CHIFCO,
      Mega4,
      Mega8,
      Mega10,
      Mega12,
      Mega20,
      Mega30,
      Mega50,
      Mega100
    });

    const savedOffre = await offre.save();
    console.log("Offre sauvegardée:", savedOffre);

    // Gestion du type PARC_MOYEN après la sauvegarde de l'offre
    const parcType = savedOffre.types.find(t => t.nom === "PARC");
    if (parcType) {
      const previousMonth = new Date(currentDate);
      previousMonth.setMonth(currentDate.getMonth() - 1);
      const previousMonthStart = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1);
      const previousMonthEnd = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0);

      // Trouver le parc du mois précédent
      const previousOffre = await Offre.findOne({
        Date: { $gte: previousMonthStart, $lte: previousMonthEnd },
        "types.nom": "PARC"
      });

      let parcMoyenValue = parcType.valeur; // Valeur par défaut si aucun mois précédent
      if (previousOffre) {
        const previousParcType = previousOffre.types.find(t => t.nom === "PARC");
        if (previousParcType) {
          parcMoyenValue = (previousParcType.valeur + parcType.valeur) / 2;
        }
      }

      // Mettre à jour ou ajouter PARC_MOYEN
      let parcMoyenIndex = savedOffre.types.findIndex(t => t.nom === "PARC_MOYEN");
      if (parcMoyenIndex !== -1) {
        // Mettre à jour la valeur du type PARC_MOYEN existant
        savedOffre.types[parcMoyenIndex].valeur = parcMoyenValue;
      } else {
        // Ajouter un nouveau type PARC_MOYEN avec la valeur calculée
        savedOffre.types.push({ nom: "PARC_MOYEN", valeur: parcMoyenValue });
      }
      
      // Sauvegarder les modifications de l'offre avec le type PARC_MOYEN mis à jour
      await savedOffre.save();
    }

    // Envoyer la réponse avec l'offre sauvegardée
    res.status(201).json(savedOffre);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'offre:', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'offre' });
  }
};






//READ ALL (get)
const GetOffres = async (req,res) =>
  {
const offres = await Offre.find({}).sort({createdAt : -1})
res.status(200).json(offres)
  }


//READ 1 (get)
const GetOffre = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'ID d\'offre invalide' });
    }
    try {
      const offre = await Offre.findById(id);
      if (!offre) {
        return res.status(404).json({ error: 'Offre non trouvée' });
      }
      res.status(200).json(offre);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  




//DELETE offre
const DeleteOffre = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Pas d offres' });
    }
    const offre = await Offre.findOneAndDelete({ _id: id });
    if (!offre) {
      return res.status(404).json({ error: 'pas d offres' });
    }
    res.status(200).json(offre);
  };



//Update Offre
const UpdateOffre = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID d\'offre invalide' });
    }
  
    try {
      // Convertir les champs en nombres
      const updateData = {
        ...req.body,
        adslH: Number(req.body.adslH),
        adslP: Number(req.body.adslP),
        vdslH: Number(req.body.vdslH),
        vdslP: Number(req.body.vdslP),
        FSI_Adsl: Number(req.body.adslH) + Number(req.body.adslP),
        FSI_Vdsl: Number(req.body.vdslH) + Number(req.body.vdslP),
      };
  
      const offre = await Offre.findOneAndUpdate({ _id: id }, updateData, { new: true });
  
      if (!offre) {
        return res.status(404).json({ error: 'Offre non trouvée' });
      }
  
      res.status(200).json(offre);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'offre' });
    }
  };
  
  





module.exports =
{
    DeleteOffre,
    GetOffre,
    GetOffres,
    ajouterOffre,
    UpdateOffre

}