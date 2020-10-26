/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

class Jeu {
    constructor(id_jeu, id_manche, id_joueur_au_service, score_echanges_joueur_1, score_echanges_joueur_2, etat_Jeu) {
        this.id_jeu = id_jeu;
        this.id_manche = id_manche;
        this.id_joueur_au_service = id_joueur_au_service;
        this.score_echanges_joueur_1 = score_echanges_joueur_1;
        this.score_echanges_joueur_2 = score_echanges_joueur_2;
        this.etat_Jeu = etat_Jeu;
    }

    toJSON () {
        return {
            'id_jeu': this.id_jeu,
            'id_manche': this.id_manche,
            'id_joueur_au_service': this.id_joueur_au_service,
            'score_echanges_joueur_1': this.score_echanges_joueur_1,
            'score_echanges_joueur_2': this.score_echanges_joueur_2,
            'etat_Jeu': this.etat_Jeu
        };
    }
}

module.exports = Jeu;