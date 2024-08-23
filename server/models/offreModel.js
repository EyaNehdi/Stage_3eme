const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  nom: { type: String, required: true },
  valeur: { type: Number, required: true },
  Parc_Moyen: { type: Number },
  ARPU: { type: Number },
});

const OffreSchema = new mongoose.Schema({
  adslH: { type: Number, required: true },
  adslP: { type: Number, required: true },
  FSI_Adsl: { type: Number },
  vdslH: { type: Number, required: true },
  vdslP: { type: Number, required: true },
  FSI_Vdsl: { type: Number },
  types: { type: [TypeSchema], required: true },
  Topnet:{type: Number},
  Globalnet:{type: Number},
  Hexabyte:{type: Number},
    Orange:{type: Number},
    ATI:{type: Number},
    I2S:{type: Number},
    Ooredoo:{type: Number},
    CHIFCO:{type: Number},
  Mega4: { type: Number },
  Mega8: { type: Number },
  Mega10: { type: Number },
  Mega12: { type: Number },
  Mega20: { type: Number },
  Mega30: { type: Number },
  Mega50: { type: Number },
  Mega100: { type: Number },
  Date: { type: Date, default: Date.now },
}, { timestamps: true });

// Middleware pre-save pour calculer les valeurs
OffreSchema.pre('save', async function(next) {
  try {
    this.FSI_Adsl = this.adslH + this.adslP;
    this.FSI_Vdsl = this.vdslH + this.vdslP;

    console.log('FSI_Adsl:', this.FSI_Adsl);
    console.log('FSI_Vdsl:', this.FSI_Vdsl);

    let parcType = this.types.find(t => t.nom === "PARC");
    let parcMoyenType = this.types.find(t => t.nom === "PARC_MOYEN");

    if (parcType) {
      parcType.valeur = this.FSI_Adsl + this.FSI_Vdsl;
      console.log('Parc Value:', parcType.valeur);

      const currentDate = this.Date;
      const previousMonth = new Date(currentDate);
      previousMonth.setMonth(currentDate.getMonth() - 1);

      const previousMonthStart = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1);
      const previousMonthEnd = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0);

      console.log('Previous Month Start:', previousMonthStart);
      console.log('Previous Month End:', previousMonthEnd);

      const previousOffre = await mongoose.model('Offre').findOne({
        Date: { $gte: previousMonthStart, $lte: previousMonthEnd },
        "types.nom": "PARC"
      });

      let parcMoyenValue = parcType.valeur;
      if (previousOffre) {
        const previousParcType = previousOffre.types.find(t => t.nom === "PARC");
        if (previousParcType) {
          parcMoyenValue = (previousParcType.valeur + parcType.valeur) / 2;
        }
      }

      console.log('Parc Moyen Value:', parcMoyenValue);

      // Conserver la valeur calculée dans `type.ParcMoyen` pour utilisation future
      if (parcMoyenType) {
        parcMoyenType.valeur = parcMoyenValue;
      } else {
        // Ne pas ajouter immédiatement un type PARC_MOYEN si absent
        this.ParcMoyen = parcMoyenValue;
      }

      // Calculer ARPU
      const revenu = this.clientValeur || 0;
      parcType.ARPU = parcMoyenValue ? revenu / parcMoyenValue : 0;
    }

    next();
  } catch (error) {
    console.error('Error in pre-save middleware:', error);
    next(error);
  }
});




OffreSchema.set('toObject', { virtuals: true });
OffreSchema.set('toJSON', { virtuals: true });

const Offre = mongoose.model('Offre', OffreSchema);

module.exports = Offre;
