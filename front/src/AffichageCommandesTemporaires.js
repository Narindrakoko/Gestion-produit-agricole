import React, { useState } from 'react';

function AffichageCommandesTemporaires() {
  const [commandesTemporaires, setCommandesTemporaires] = useState([]);

  // Fonction pour afficher les commandes temporaires
  const afficherCommandesTemporaires = () => {
    return (
      <div>
        <h2>Commandes temporaires</h2>
        <ul>
          {commandesTemporaires.map((commande, index) => (
            <li key={index}>
              <strong>ID du produit:</strong> {commande.idproduit}, <strong>Produit:</strong> {commande.produit}, <strong>Quantité:</strong> {commande.quantite}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      {/* Afficher les commandes temporaires */}
      {afficherCommandesTemporaires()}
    </div>
  );
}

export default AffichageCommandesTemporaires;
