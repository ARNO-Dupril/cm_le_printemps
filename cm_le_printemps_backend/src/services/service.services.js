import * as serviceModelJs from "../models/service.model.js";

  export async function createService(service) {
    try {
      const newService = new serviceModelJs.Services(service);
      await newService.save();
      return newService;
    } catch (error) {
      throw error;
    }
  }

  export async function getAllServices() {
    try {
      const services = await serviceModelJs.Services.find().populate("userId");
      return services;
    } catch (error) {
      throw error;
    }
  }

  export async function getServiceById(id) {
    try {
      const service = await serviceModelJs.Services.findById(id).populate("userId");
      return service;
    } catch (error) {
      throw error;
    }
  }

  export async function updateService(id, updates) {
    try {
      const service = await serviceModelJs.Services.findByIdAndUpdate(id, updates, { new: true }).populate("userId");
      return service;
    } catch (error) {
      throw error;
    }
  }

  export async function deleteService(id) {
    try {
      await serviceModelJs.Services.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
