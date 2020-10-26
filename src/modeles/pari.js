/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

class Pari {
    constructor(id_pari, montant, id_partie, id_utilisateur, id_joueur) {
        this.id_pari = id_pari;
        this.montant = montant;
        this.id_partie = id_partie;
        this.id_utilisateur = id_utilisateur;
        this.id_joueur = id_joueur;
    }

    toJSON () {
        return {
            'id_pari': this.id_pari,
            'montant': this.montant,
            'id_partie': this.id_partie,
            'id_utilisateur': this.id_utilisateur,
            'id_joueur': this.id_joueur
        };
    }
}

module.exports = Pari;