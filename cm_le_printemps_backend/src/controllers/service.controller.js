import * as serviceServiceJs from "../services/service.services.js";

class Service{

    async createService (req, res) {
        try {
          const { code, nom, description, actif, userId } = req.body;
          let image = "uploads/users/service.png";
          
          if (req.file) {
            image = `uploads/services/${req.file.filename}`;
          }
          
          const newService = await serviceServiceJs.createService({ code, nom, description, image, actif, userId });
          res.status(201).json(newService);
        } catch (error) {
          res.status(400).json({ message: error });
        }
      }
    
      async getAllServices (req, res) {
        try {
          const services = await serviceServiceJs.getAllServices();
          res.json(services);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
    
      async getServiceById (req, res) {
        try {
          const { id } = req.params;
          const service = await serviceServiceJs.getServiceById(id);
          if (!service) {
            return res.status(404).json({ message: "Service not found" });
          }
          res.json(service);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
    
      async updateService (req, res) {
        try {
          const { id } = req.params;
          // const updates = req.body;
          const { code, nom, description, actif, userId } = req.body;
          let image = "uploads/users/service.png";
          
          if (req.file) {
            image = `uploads/services/${req.file.filename}`;
          }
          console.log("image: ",image);
          const updatedService = await serviceServiceJs.updateService(id, { code, nom, description, actif, image, userId, updatedAt: Date.now() });
          if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
          }
          res.json(updatedService);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }
    
      async deleteService (req, res) {
        try {
          const { id } = req.params;
          await serviceServiceJs.deleteService(id);
          res.status(204).json({ success: true });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
}
const serviceController = new Service();
export default serviceController;