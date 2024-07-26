import * as demandeModelJs from "../models/demande.model.js";

  export async function createDemande (demande) {
    try {
      const newDemande = new demandeModelJs.Demandes(demande);
      await newDemande.save();
      return newDemande;
    } catch (error) {
      throw error;
    }
  }
  
  export async function getAllDemande () {
    try {
      const demandes = await demandeModelJs.Demandes.find().populate("rdvId", "userId");
      return demandes;
    } catch (error) {
      throw error;
    }
  }

  export async function getDemandeById (id) {
    try {
      const demande = await demandeModelJs.Demandes.findById(id).populate("rdvId", "userId");
      return demande;
    } catch (error) {
      throw error;
    }
  }

  export async function updateDemande (id, updates) {
    try {
      const demande = await demandeModelJs.Demandes.findByIdAndUpdate(id, updates, { new: true }).populate("rdvId", "userId");
      return demande;
    } catch (error) {
      throw error;
    }
  }

  export async function deleteDemande (id) {
    try {
      await demandeModelJs.Demandes.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }