// import newsLetter from '../models/newsLetter.model.js';
import * as newsletterService from '../services/newsLetter.services.js';

class NewsLetter {

    async createNewsletter (req, res) {
      try {
        const { email } = req.body;
        const result = await newsletterService.createNewsletter(email);
        if (result.success) {
          res.status(201).json({
            message: result.message,
            data: result.data,
          });
        } else {
          res.status(400).json({
            message: result.error.general,
          });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: 'Une erreur est survenue lors de la création de l\'abonnement à la newsletter',
        });
      }
    };
    
    async getAllNewsletters (req, res) {
      try {
        const result = await newsletterService.getAllNewsletters();
        if (result.success) {
          res.status(200).json({
            data: result.data,
          });
        } else {
          res.status(404).json({
            message: result.error.general,
          });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: 'Une erreur est survenue lors de la récupération des abonnements à la newsletter',
        });
      }
    };
    
    async getNewsletterById (req, res) {
      try {
        const { id } = req.params;
        const result = await newsletterService.getNewsletterById(id);
        if (result.success) {
          res.status(200).json({
            data: result.data,
          });
        } else {
          res.status(404).json({
            message: result.error.general,
          });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: 'Une erreur est survenue lors de la récupération de l\'abonnement à la newsletter',
        });
      }
    };
    
    async updateNewsletter (req, res) {
      try {
        const { id } = req.params;
        const { email } = req.body;
        const result = await newsletterService.updateNewsletter(id, { email });
        if (result.success) {
          res.status(200).json({
            message: result.message,
            data: result.data,
          });
        } else {
          res.status(404).json({
            message: result.error.general,
          });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: 'Une erreur est survenue lors de la mise à jour de l\'abonnement à la newsletter',
        });
      }
    };
    
    async deleteNewsletter (req, res) {
      try {
        const { id } = req.params;
        const result = await newsletterService.deleteNewsletter(id);
        if (result.success) {
          res.status(200).json({
            message: result.message,
          });
        } else {
          res.status(404).json({
            message: result.error.general,
          });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: 'Une erreur est survenue lors de la suppression de l\'abonnement à la newsletter',
        });
      }
    };




    // async allEmail(req, res){
    //     try {
    //         let newsLetters = await getAllEmail();
    //         if(newsLetters)
    //             return res.json({
    //                 success: true,
    //                 message: `liste de tout les emails enregistrées dans la Newsletter`,
    //                 data: newsLetters,
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // async email(req, res){
    //     let { id } = req.body;
    //     if(!id){
    //         return res.json({
    //             success: false,
    //             error: true,
    //             message: `veillez remplir tout les champs`,
    //         });
    //     }else{
    //         try {
    //             let email = getEmail(id);
    //             if (email) {
    //                 return res.json({
    //                     success: true,
    //                     message: `la newsletter ayant pour id: ${id}:`,
    //                     data: email,
    //                 });
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }

    // async addEmail(req, res){
    //     let { email } = req.body;
    //     let error = {};
    //     if (!email) {
    //         error = {
    //             ...error,
    //             email: "Ce champ ne doit pas etre vide",
    //         };
    //         return res.json({
    //             success: false,
    //             error: true,
    //             message: `veillez remplir tout les champs`
    //         });
    //     } else {
    //         try {
    //             let save = await postAddEmail(email);
    //             if(save){
    //                 return res.json({
    //                     success: true,
    //                     message: `vous venez de souscrire a une nouvelle newsletter`,
    //                 });
    //             }
    //         } catch (error) {
    //             console.log("une erreur est survenu: ", error);
    //             return res.json({
    //                 success: false,
    //                 error: true,
    //                 message: `echec de la souscription`
    //             });
    //         }
    //     }
    // }

}

const newsLetterController = new NewsLetter();
export default newsLetterController;