import * as demandeServiceJs from "../services/demande.services.js";
class Demande {
    async createDemande (req, res) {
        try {
          const demande = req.body;
          const newDemande = await demandeServiceJs.createDemande(demande);
          res.status(201).json(newDemande);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }

      async getAllDemande (req, res) {
        try {
          const demandes = await demandeServiceJs.getAllDemande();
          res.json(demandes);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }

      async getDemandeById (req, res) {
        try {
          const { id } = req.params;
          const demande = await demandeServiceJs.getDemandeById(id);
          if (!demande) {
            return res.status(404).json({ message: "demande introuvable" });
          }
          res.json(service);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }

      async updateDemande (req, res) {
        try {
          const { id } = req.params;
          const demandes = req.body;
          const updatedDemande = await demandeServiceJs.updateDemande(id, updates);
          if (!updatedDemande) {
            return res.status(404).json({ message: "la demande est introuvable" });
          }
          res.json(updatedDemande);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }

      async deleteDemande (req, res) {
        try {
          const { id } = req.params;
          await demandeServiceJs.deleteDemande(id);
          res.status(204).json();
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
}
const demandeController = new Demande();
export default demandeController;