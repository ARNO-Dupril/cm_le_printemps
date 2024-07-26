import * as commentaireModelJs from "../models/commentaire.model.js";

  export async function createCommentaire (commentaire) {
    try {
      const newCommentaire = new commentaireModelJs.Commentaire(commentaire);
      await newCommentaire.save();
      return newCommentaire;
    } catch (error) {
      throw error;
    }
  }

  export async function getAllCommentaires () {
    try {
      const commentaires = await commentaireModelJs.Commentaire.find().populate("userId");
      return commentaires;
    } catch (error) {
      throw error;
    }
  }

  export async function getCommentaireById (id) {
    try {
      const commentaire = await commentaireModelJs.Commentaire.findById(id).populate("userId");
      return commentaire;
    } catch (error) {
      throw error;
    }
  }

  export async function updateCommentaire (id, updates) {
    try {
      const commentaire = await commentaireModelJs.Commentaire.findByIdAndUpdate(id, updates, { new: true }).populate("userId");
      return commentaire;
    } catch (error) {
      throw error;
    }
  }

  export async function deleteCommentaire (id) {
    try {
      await commentaireModelJs.Commentaire.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
