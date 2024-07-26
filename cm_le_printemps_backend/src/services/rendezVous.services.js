import * as rdvModelJs from "../models/rendezVous.model.js";

  export async function createRdv(rdv) {
    try {
      const newRdv = new rdvModelJs.Rdv(rdv);
      await newRdv.save();
      return newRdv;
    } catch (error) {
      throw error;
    }
  }

  export async function getAllRdvs() {
    try {
      const rdvs = await rdvModelJs.Rdv.find().populate("serviceId");
      return rdvs;
    } catch (error) {
      throw error;
    }
  }

  export async function getRdvById(id) {
    try {
      const rdv = await rdvModelJs.Rdv.findById(id).populate("serviceId");
      return rdv;
    } catch (error) {
      throw error;
    }
  }

  export async function updateRdv(id, updates) {
    try {
      const rdv = await rdvModelJs.Rdv.findByIdAndUpdate(id, updates, { new: true }).populate("serviceId");
      return rdv;
    } catch (error) {
      throw error;
    }
  }

  export async function deleteRdv(id) {
    try {
      await rdvModelJs.Rdv.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }