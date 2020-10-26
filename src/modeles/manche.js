/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

class Manche {
    constructor(id_manche, id_partie, score_jeux_joueur_1, score_jeux_joueur_2, nb_contestations_joueur_1, nb_contestations_joueur_2, etat_manche) {
        this.id_manche = id_manche;
        this.id_partie = id_partie;
        this.score_jeux_joueur_1 = score_jeux_joueur_1;
        this.score_jeux_joueur_2 = score_jeux_joueur_2;
        this.nb_contestations_joueur_1 = nb_contestations_joueur_1;
        this.nb_contestations_joueur_2 = nb_contestations_joueur_2;
        this.etat_manche = etat_manche;
    }

    toJSON () {
        return {
            'id_manche': this.id_manche,
            'id_partie': this.id_partie,
            'score_jeux_joueur_1': this.score_jeux_joueur_1,
            'score_jeux_joueur_2': this.score_jeux_joueur_2,
            'nb_contestations_joueur_1': this.nb_contestations_joueur_1,
            'nb_contestations_joueur_2': this.nb_contestations_joueur_2,
            'etat_manche': this.etat_manche
        };
    }
}

module.exports = Manche;