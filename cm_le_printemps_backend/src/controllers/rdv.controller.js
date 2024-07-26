import * as demandeServiceJs from "../services/demande.services.js";
import * as rdvServicesJs from "../services/rendezVous.services.js";

class createRdv{
    async create(req, res) {
        try {
          const rendezVous = req.body;
          const newRendezVous = await rdvServicesJs.createRdv(rendezVous);
          const demande = { ...req.body, rdvId: newRendezVous._id };
          const newDemande = await demandeServiceJs.createDemande(demande);
          res.status(201).json({ rendezVous: newRendezVous, demande: newDemande });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
    }
}

const createRdvController = new createRdv();
export default createRdvController;