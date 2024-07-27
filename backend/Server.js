const express = require('express');
const app = express();
const dontenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const mysql = require('mysql');
const bodyParser = require("body-parser");

const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser()); 
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST" , "GET" , "DELETE" , "PUT"],
    credentials:true
  }));
  app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized:false,
    cookie:{
      secure:false,
      maxAge:1000 * 60 * 60 * 24
    }
  }))

//Connexion BD
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database: "ihm"
});
                                       //LOGIN & SIGNUP
// Ajout d'un nouvel utilisateur
app.post('/inscription', (req, res) => {
    console.log("Requête d'inscription reçue");
    const { nom, email, password } = req.body;
    const sql = "INSERT INTO login (`nom`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [nom, email, password];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Erreur ajout utilisateur :", err);
            return res.status(500).json("Erreur ajout utilisateur");
        }
        return res.status(200).json("Utilisateur ajouté avec succès");
    });
});   
// Vérification des informations de connexion
/*app.post('/connexion', (req, res) => {
    const sql = "SELECT * FROM login WHERE id = ? AND mdp = ?";

    db.query(sql, [req.body.id, req.body.mdp,], (err, data) => {
        if (err) return res.json("Erreur");
        if (data.length > 0) {
          req.session.id=results[0].id;
            return res.status(200).json("Login Succes!!")
        } else {
            return res.status(500).json("Erreur Login!!!");
        }
    });
});   */         

app.post('/connexion', (req, res) => {
  const { idlog, mdp} = req.body;
  
  // Query to check if user exists with the given credentials
  const sql = `SELECT * FROM login WHERE idlog = ? AND mdp = ?`;
  db.query(sql, [idlog, mdp], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length > 0) {
      req.session.idlog=results[0].idlog;
    
      return res.json({login: true});
     
    
    } else {
      // User not found or invalid credentials, send error response
      return res.json({login: false})
    }
  });
});


                                       //PRODUIT//
//Donnée table produit
app.get ('/produit', (req, res)=>{
    const sql = "SELECT * FROM produit";
    db.query(sql, (err, data) => {
        if(err) return res.json("Erreur des donnée produit");
        return res.json(data);
    })
});



////////////////////////////////////////////////////////////////////ACHETER PRODUIT////////////////////////////////////////
app.get ('/produit1', (req, res)=>{
    const sql = "SELECT * FROM produit where prod='Aubergine'";
    db.query(sql, (err, data) => {
        if(err) return res.json("Erreur des donnée produit");
        return res.json(data);
    })
});

app.get ('/produit2', (req, res)=>{
    const sql = "SELECT * FROM produit where prod='Haricot vert'";
    db.query(sql, (err, data) => {
        if(err) return res.json("Erreur des donnée produit");
        return res.json(data);
    })
});


app.get('/produit0', (req, res) => {
  const sql = "SELECT * FROM produit WHERE prod IN ('Aubergine', 'Haricot vert','Tomate','Courgette','Choux','Carotte')";
  db.query(sql, (err, data) => {
      if (err) return res.json("Erreur des données produit");
      return res.json(data);
  });
});

app.get('/produit01', (req, res) => {
  const sql = "SELECT * FROM produit WHERE prod IN ('Orange', 'Pomme','Mangue','Poire','Paiso','Banane')";
  db.query(sql, (err, data) => {
      if (err) return res.json("Erreur des données produit");
      return res.json(data);
  });
});

app.get('/produit02', (req, res) => {
  const sql = "SELECT * FROM produit WHERE prod IN ('Haricot', 'Maïs','Lentille','Arachide','Petit poid','Haricot Adzusi')";
  db.query(sql, (err, data) => {
      if (err) return res.json("Erreur des données produit");
      return res.json(data);
  });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Ajout nouveau produit
app.post ('/ajoutProduit', (req, res)=>{
    const currentDate = new Date();
    const sql = "INSERT INTO produit (`prod`,`descri`,`qt`,`daty`,`prix`) VALUES (?)";
    const values = [
       
        req.body.prod,
        req.body.descri,
        req.body.qt,
        currentDate ,
        req.body.prix,
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Erreur ajout Produit");
   
        return res.json({ Status: "succes"});
    })
});
//modification Produit
app.put('/modifieProduit/:idprod', (req, res) => {
    const currentDate = new Date();
    const values=[
      req.body.idprod, req.body.prod,req.body.descri, req.body.qt , currentDate , req.body.prix
    ]
  
    const sql = 'UPDATE produit SET idprod=?, prod=?, descri=? , qt=? , daty=? , prix=?  WHERE idprod=? ';
    const idprod=req.params.idprod;
    db.query(sql, [...values,idprod],(err, data)=>{
      if (err) {
        console.error(err);
      return  res.status(500).json({ message: 'Data failed' });
     
      
      } else {
        
        return res.json({Status:"succes"})
       
      }
    } )
});
// Supprimer produit
app.delete('/deleteProduit/:idpro', (req, res) => {
    const sql = "DELETE FROM produit WHERE idprod=?";
    const id = req.params.idpro;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression du produit :", err);
            return res.status(500).json({ error: "Erreur lors de la suppression du produit" });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Produit non trouvé" });
        }

        return res.status(200).json({ message: "Produit supprimé avec succès" });
    });
});


                                        //CLIENT
//Donnée table client
app.get ('/client', (req, res)=>{
    const sql = "SELECT * FROM client";
    db.query(sql, (err, data) => {
        if(err) return res.json("Erreur des donnée Client");
        return res.json(data);
    })
});
//Ajout nouveau client
app.post ('/ajoutClient', (req, res)=>{
    const sql = "INSERT INTO client (`idcli`,`nom`,`adresse`,`contact`) VALUES (?)";
    const values = [
        req.body.idcli,
        req.body.nom,
        req.body.adresse,
        req.body.contact,
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Erreur ajout Client");
        return res.json(data);
    })
});
//modification Client
app.put('/modifierClient/:idcli', (req, res) => {
    const sql = "UPDATE client SET nom=?, adresse=?, contact=? WHERE idcli=?";
    const values = [
        req.body.nom,
        req.body.adresse,
        req.body.contact,
        req.params.idcli 
    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.json("Erreur modifier client");
        return res.json(data);
    });
});
// Supprimer client
app.delete('/deleteClient/:idcli', (req, res) => {
    const sql = "DELETE FROM client WHERE idcli = ?";
    const id = req.params.idcli;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression du client :", err);
            return res.status(500).json({ error: "Erreur lors de la suppression du client" });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "client non trouvé" });
        }

        return res.status(200).json({ message: "client supprimé avec succès" });
    });
});



                                        //CULTURE
//Donnée table culture
app.get ('/culture', (req, res)=>{
    const sql = `SELECT c.*, p.idprod, p.prod 
                   FROM culture c 
                   JOIN produit p ON p.idprod = c.idprod`;
    db.query(sql, (err, data) => {
        if(err) return res.json("Erreur des donnée culture");
        return res.json(data);
    })
});
//Ajout nouveau Culture
app.post ('/ajoutCulture', (req, res)=>{
    const sql = "INSERT INTO culture (`idprod`,`nom`,`date_semi`,`date_recolte`) VALUES (?)";
    const values = [
        req.body.idprod,
        req.body.nom,
        req.body.date_semi,
        req.body.date_recolte,
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Erreur ajout Culture");
        return res.json(data);
    })
});
//modification Culture
app.put('/modifierCulture/:idcult', (req, res) => {
    const sql = "UPDATE client SET nom=?, date_semi=?, date_recolte=? WHERE idcult=?";
    const values = [
        req.body.nom,
        req.body.date_semi,
        req.body.date_recolte,
        req.params.idcult
    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.json("Erreur modifier culture");
        return res.json(data);
    });
});
//Supprimer culture
app.delete('/deleteCulture/:idcult', (req, res) => {
    const sql = "DELETE FROM culture WHERE idcult=?";
    const id = req.params.idcult; 

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Erreur Suppression Culture");
        return res.json(data);
    });
});

                                        //COMMANDE
//Donnée table commande
app.get ('/commande', (req, res)=>{
    const sql = `SELECT * FROM com`;
    db.query(sql, (err, data) => {
        if(err) return res.json("Erreur des donnée commande");
        return res.json(data);
    })
});
//Ajout nouveau commande
app.post ('/ajoutCommande', (req, res)=>{
    const sql = "INSERT INTO commande (`idcli`,`idprod`,`qt`,`daty`) VALUES (?)";
    const values = [
        req.body.idcli,
        req.body.idprod,
        req.body.qt,
        req.body.daty,
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Erreur ajout Commande");
        return res.json(data);
    })
});
//modification Commande
app.put('/modifierCommande/:idcom', (req, res) => {
    const sql = "UPDATE commande SET idcli=?, idprod=?, qt=?, daty=? WHERE idcom=?";
    const values = [
        req.body.idcli,
        req.body.idprod,
        req.body.qt,
        req.body.daty,
        req.params.idcom
    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.json("Erreur modifier commande");
        return res.json(data);
    });
});
//Supprimer commande
app.delete('/deleteCommande/:id', (req, res) => {
    const sql = "DELETE FROM com WHERE id=?";
    const id = req.params.id; 

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Erreur Suppression Commande");
        return res.json(data);
    });
});

                                       //FOURNISSEUR
//Donnée table fournisseur
app.get ('/fournisseur', (req, res)=>{
    const sql = "SELECT * FROM fournisseur";
    db.query(sql, (err, data) => {
        if(err) return res.json("Erreur des donnée fournisseur");
        return res.json(data);
    })
});
//Ajout nouveau fournisseur
app.post ('/ajoutCommande', (req, res)=>{
    const sql = "INSERT INTO fournisseur (`idfourni`,`nom`,`adresse`,`contact`) VALUES (?)";
    const values = [
        req.body.idfourni,
        req.body.nom,
        req.body.adresse,
        req.body.contact,
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Erreur ajout Commande");
        return res.json(data);
    })
});
//modification Fournisseur
app.put('/modifierFournisseur/:idcom', (req, res) => {
    const sql = "UPDATE fournisseur SET nom=?, adresse=?, contact=? WHERE idfourni=?";
    const values = [
        req.body.idfourni,
        req.body.nom,
        req.body.adresse,
        req.body.contact,
        req.params.idfourni
    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.json("Erreur modifier Fournisseur");
        return res.json(data);
    });
});
//Supprimer fournisseur
app.delete('/deleteFournisseur/:idfourni', (req, res) => {
    const sql = "DELETE FROM fournisseur WHERE idcom=?";
    const id = req.params.idfourni; 

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Erreur Suppression Fournisseur");
        return res.json(data);
    });
});




///////////////////////////////////////////////////////////////////LOG////////////////




app.get('/', (req, res) => {
    if (req.session.idcli) {
     
      const id = req.session.idcli;
      const sql = `SELECT * FROM client WHERE idcli = '${id}'`;
      db.query(sql, (err, results) => {
        if (err) {
          console.error('Erreur lors de la récupération des données depuis MySQL:', err);
          res.status(500).json({ error: 'Erreur interne du serveur' });
          return;
        }

        if (results.length === 0) {
          res.status(404).json({ error: 'Utilisateur non trouvé' });
          return;
        }

        const data = results[0]; // Première ligne de résultat car il devrait y avoir un seul utilisateur avec cet ID

        // Renvoyer les données de l'utilisateur
        res.json({ valid: true,idcli: req.session.idcli,nom: data.nom ,adresse: data.adresse,contact: data.contact,mdp: data.mdp    });
      //console.log(req.session.idcli)
      });
    } else {
      res.json({ valid: false });
    }
  });


  app.get('/admin', (req, res) => {
    if (req.session.idlog) {
      
      const id = req.session.idlog;
      const sql = `SELECT * FROM login WHERE idlog = '${id}'`;
      db.query(sql, (err, results) => {
        if (err) {
          console.error('Erreur lors de la récupération des données depuis MySQL:', err);
          res.status(500).json({ error: 'Erreur interne du serveur' });
          return;
        }

        if (results.length === 0) {
          res.status(404).json({ error: 'Utilisateur non trouvé' });
          return;
        }

        const data = results[0]; // Première ligne de résultat car il devrait y avoir un seul utilisateur avec cet ID

        // Renvoyer les données de l'utilisateur
        res.json({ valid: true,idlog: req.session.idlog,nom: data.nom ,mdp: data.mdp   });
      //console.log(req.session.idcli)
      });
    } else {
      res.json({ valid: false });
      console.log("erreur leka")
    }
  });



  app.post('/login', (req, res) => {
    const { idcli, mdp} = req.body;
    
    // Query to check if user exists with the given credentials
    const sql = `SELECT * FROM client WHERE idcli = ? AND mdp = ?`;
    db.query(sql, [idcli, mdp], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length > 0) {
        req.session.idcli=results[0].idcli;
      
        return res.json({login: true});
       
      
      } else {
        // User not found or invalid credentials, send error response
        return res.json({login: false})
      }
    });
  });



  
  app.get('/logout', (req, res) => {
    if (req.session.idcli) {
        // Déconnecter l'utilisateur en détruisant sa session
        req.session.destroy((err) => {
            if (err) {
                console.error('Erreur lors de la déconnexion de l\'utilisateur:', err);
                res.status(500).json({ error: 'Erreur interne du serveur' });
                return;
            }
            // Renvoyer une réponse indiquant que l'utilisateur a été déconnecté avec succès
            res.json({ success: true, message: 'Déconnexion réussie' ,valid: false});
           
        });
    } else {
     console.log("erreur")
        res.status(401).json({ error: 'Aucune session active. Impossible de se déconnecter.' });
    }
});

app.get('/logout2', (req, res) => {
  if (req.session.idlog) {
      // Déconnecter l'utilisateur en détruisant sa session
      req.session.destroy((err) => {
          if (err) {
              console.error('Erreur lors de la déconnexion de l\'utilisateur:', err);
              res.status(500).json({ error: 'Erreur interne du serveur' });
              return;
          }
          // Renvoyer une réponse indiquant que l'utilisateur a été déconnecté avec succès
          res.json({ success: true, message: 'Déconnexion réussie' ,valid: false});
         
      });
  } else {
   console.log("erreur")
      res.status(401).json({ error: 'Aucune session active. Impossible de se déconnecter.' });
  }
});






  

  app.post('/add_to_command', (req, res) => {
    const currentDate = new Date();
    const selectedProducts = req.body;
    const values = selectedProducts.map(product => [product.idcli,product.idproduit, product.produit, product.quantite,currentDate]);
    const sql = 'INSERT INTO com (idcli,idprod, prod, qt,daty) VALUES ?';
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'ajout à la commande :', err);
        res.status(500).send('Une erreur est survenue lors de l\'ajout à la commande.');
      } else {
        console.log(`${result.affectedRows} produits ajoutés à la commande.`);
        res.status(200).send(`${result.affectedRows} produits ajoutés à la commande.`);
      }
    });
  });


  const PORT = process.env.PORT || 3000;
  app.listen(8081, () =>{
    console.log("mande am port 8081");
})


//////////////////////////////////////////////////////////prod///////////////////////////////////////////////////////////////////////////

app.post('/list_pers', (req, res) => {
    const query = `SELECT * FROM produit where descri='légume'`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  });

  
app.post('/list_fruit', (req, res) => {
    const query = `SELECT * FROM produit where descri='fruit'`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  });


  app.post('/list_legumineuse', (req, res) => {
    const query = `SELECT * FROM produit where descri='légumineuse'`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  });


  app.post('/list_autre', (req, res) => {
    const query = `SELECT * FROM produit where descri='autre'`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  });

  ////////////////////////////////////////////////CLIENT ////////////////////////////////////////////////////////////////////////////////////////

  app.get('/dropdown_cli', (req, res) => {
    const query = 'SELECT idcli FROM com group by daty';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      const options = results.map(result => result.idcli);
      res.json(options); 
    });
  });


  ///////////////////////////////////////////////////////////////////////NOMBRE DE LIGNE////////////////////////////////////////////////////////////////

  app.get('/nombrelegume', (req, res) => {
   db.query('SELECT COUNT(*) AS rowCount FROM produit where descri="légume"', (error, results) => {
      if (error) {
        console.error('Erreur lors de l\'exécution de la requête : ', error);
        res.status(500).send('Erreur lors de la récupération du nombre de lignes');
        return;
      }
      res.json({ rowCount: results[0].rowCount });
    });
  });
  
 
  app.get('/nombrefruit', (req, res) => {
    db.query('SELECT COUNT(*) AS rowCount1 FROM produit where descri="fruit"', (error, results) => {
       if (error) {
         console.error('Erreur lors de l\'exécution de la requête : ', error);
         res.status(500).send('Erreur lors de la récupération du nombre de lignes');
         return;
       }
       res.json({ rowCount1: results[0].rowCount1 });
     });
   });
   
 
   app.get('/nombrelegumineuse', (req, res) => {
    db.query('SELECT COUNT(*) AS rowCount2 FROM produit where descri="légumineuse"', (error, results) => {
       if (error) {
         console.error('Erreur lors de l\'exécution de la requête : ', error);
         res.status(500).send('Erreur lors de la récupération du nombre de lignes');
         return;
       }
       res.json({ rowCount2: results[0].rowCount2 });
     });
   });
   
 
   app.get('/nombreautre', (req, res) => {
    db.query('SELECT COUNT(*) AS rowCount3 FROM produit where descri="autre"', (error, results) => {
       if (error) {
         console.error('Erreur lors de l\'exécution de la requête : ', error);
         res.status(500).send('Erreur lors de la récupération du nombre de lignes');
         return;
       }
       res.json({ rowCount3: results[0].rowCount3 });
     });
   });
   
  
   /////////////////////////////////////////changer mot de passe ////////////////////////////

   app.post('/changement-mot-de-passe', (req, res) => {
    const { idUtilisateur, motDePasseActuel, nouveauMotDePasse } = req.body;

    // Vérifier si le mot de passe actuel est correct pour l'utilisateur donné
    const sql = `SELECT * FROM login WHERE idlog = ? AND mdp = ?`;
    db.query(sql, [idUtilisateur, motDePasseActuel], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erreur lors de la vérification du mot de passe actuel' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ message: 'Mot de passe actuel incorrect' });
            return;
        }

        // Mettre à jour le mot de passe de l'utilisateur
        const updateSql = `UPDATE login SET mdp = ? WHERE idlog = ?`;
        db.query(updateSql, [nouveauMotDePasse, idUtilisateur], (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Erreur lors de la mise à jour du mot de passe' });
                return;
            }
            res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
        });
    });
});


app.post('/changement-mot-de-passe1', (req, res) => {
  const { idUtilisateur, motDePasseActuel, nouveauMotDePasse } = req.body;

  // Vérifier si le mot de passe actuel est correct pour l'utilisateur donné
  const sql = `SELECT * FROM client WHERE idcli = ? AND mdp = ?`;
  db.query(sql, [idUtilisateur, motDePasseActuel], (err, results) => {
      if (err) {
          res.status(500).json({ message: 'Erreur lors de la vérification du mot de passe actuel' });
          return;
      }

      if (results.length === 0) {
          res.status(401).json({ message: 'Mot de passe actuel incorrect' });
          return;
      }

      // Mettre à jour le mot de passe de l'utilisateur
      const updateSql = `UPDATE client SET mdp = ? WHERE idcli = ?`;
      db.query(updateSql, [nouveauMotDePasse, idUtilisateur], (err, results) => {
          if (err) {
              res.status(500).json({ message: 'Erreur lors de la mise à jour du mot de passe' });
              return;
          }
          res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
      });
  });
});