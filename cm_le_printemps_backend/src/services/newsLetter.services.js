import * as newsLetterModel from "../models/newsLetter.model.js";
import { isValidEmail } from '../utils/verification.utils.js';

export async function createNewsletter(email) {
    if(!isValidEmail){
        return {
            succes: false, 
            error: {
                general: 'Cet email n\'est pas valide',
            },
        }
    }
  try {
    const newsletter = await newsLetterModel.NewsLetter.create({ email });
    return {
      success: true,
      message: 'Abonnement à la newsletter créé avec succès',
      data: newsletter,
    };
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return {
        success: false,
        error: {
          general: 'Cet email est déjà abonné à la newsletter',
        },
      };
    } else {
      return {
        success: false,
        error: {
          general: 'Une erreur est survenue lors de la création de l\'abonnement à la newsletter',
        },
      };
    }
  }
}

export async function getAllNewsletters() {
  try {
    const newsletters = await newsLetterModel.NewsLetter.find();
    return {
      success: true,
      data: newsletters,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: {
        general: 'Une erreur est survenue lors de la récupération des abonnements à la newsletter',
      },
    };
  }
}

export async function getNewsletterById(id) {
  try {
    const newsletter = await newsLetterModel.NewsLetter.findById(id);
    if (!newsletter) {
      return {
        success: false,
        error: {
          general: 'Abonnement à la newsletter non trouvé',
        },
      };
    }
    return {
      success: true,
      data: newsletter,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: {
        general: 'Une erreur est survenue lors de la récupération de l\'abonnement à la newsletter',
      },
    };
  }
}

export async function updateNewsletter(id, updates) {
  try {
    const newsletter = await newsLetterModel.NewsLetter.findByIdAndUpdate(id, updates, { new: true });
    if (!newsletter) {
      return {
        success: false,
        error: {
          general: 'Abonnement à la newsletter non trouvé',
        },
      };
    }
    return {
      success: true,
      message: 'Abonnement à la newsletter mis à jour avec succès',
      data: newsletter,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: {
        general: 'Une erreur est survenue lors de la mise à jour de l\'abonnement à la newsletter',
      },
    };
  }
}

export async function deleteNewsletter(id) {
  try {
    const result = await newsLetterModel.NewsLetter.findByIdAndDelete(id);
    if (!result) {
      return {
        success: false,
        error: {
          general: 'Abonnement à la newsletter non trouvé',
        },
      };
    }
    return {
      success: true,
      message: 'Abonnement à la newsletter supprimé avec succès',
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: {
        general: 'Une erreur est survenue lors de la suppression de l\'abonnement à la newsletter',
      },
    };
  }
}



// export async function postAddEmail(email){
//     let error = {};
//     if(isValidEmail(email))
//         return await newsLetter.save({email: email});
//     return false;
// }

// export async function getEmail(id){
//     return await newsLetter.findById(id);
// }

// export async function getAllEmail(){
//     return await newsLetter.find({}).sort({_id: -1});
// }