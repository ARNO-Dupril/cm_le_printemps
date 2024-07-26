import * as rdvServicesJs from "../services/rendezVous.services.js";

class Rdv{
  async createRdv (req, res) {
    try {
      const rdv = req.body;
      const newRdv = await rdvServicesJs.createRdv(rdv);
      res.status(201).json(newRdv);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllRdvs (req, res) {
    try {
      const rdvs = await rdvServicesJs.getAllRdvs();
      res.json(rdvs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getRdvById (req, res) {
    try {
      const { id } = req.params;
      const rdv = await rdvServicesJs.getRdvById(id);
      if (!rdv) {
        return res.status(404).json({ message: "Rendez-vous not found" });
      }
      res.json(rdv);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateRdv (req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedRdv = await rdvServicesJs.updateRdv(id, updates);
      if (!updatedRdv) {
        return res.status(404).json({ message: "Rendez-vous not found" });
      }
      res.json(updatedRdv);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteRdv (req, res) {
    try {
      const { id } = req.params;
      await rdvServicesJs.deleteRdv(id);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

const rdvController = new Rdv();
export default rdvController;