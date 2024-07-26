import * as commentaireServiceJs from "../services/commentaire.services.js";

class Commentaire{
  async createCommentaire (req, res) {
    try {
      const commentaire = req.body;
      const newCommentaire = await commentaireServiceJs.createCommentaire(commentaire);
      res.status(201).json(newCommentaire);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllCommentaires (req, res) {
    try {
      const commentaires = await commentaireServiceJs.getAllCommentaires();
      res.json(commentaires);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCommentaireById (req, res) {
    try {
      const { id } = req.params;
      const commentaire = await commentaireServiceJs.getCommentaireById(id);
      if (!commentaire) {
        return res.status(404).json({ message: "Commentaire not found" });
      }
      res.json(commentaire);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCommentaire (req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedCommentaire = await commentaireServiceJs.updateCommentaire(id, updates);
      if (!updatedCommentaire) {
        return res.status(404).json({ message: "Commentaire not found" });
      }
      res.json(updatedCommentaire);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteCommentaire (req, res) {
    try {
      const { id } = req.params;
      await commentaireServiceJs.deleteCommentaire(id);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

const commentaireController = new Commentaire();
export default commentaireController;