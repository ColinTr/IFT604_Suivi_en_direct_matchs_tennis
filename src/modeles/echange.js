/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

class Echange {
    constructor(id_echange, id_jeu, gagne_par_joueur, conteste_par_joueur, contestation_acceptee, etat_echange ) {
        this.id_echange = id_echange;
        this.id_jeu = id_jeu;
        this.gagne_par_joueur = gagne_par_joueur;
        this.conteste_par_joueur = conteste_par_joueur;
        this.contestation_acceptee = contestation_acceptee;
        this.etat_echange = etat_echange;
    }

    toJSON () {
        return {
            'id_echange': this.id_echange,
            'id_jeu': this.id_jeu,
            'gagne_par_joueur': this.gagne_par_joueur,
            'conteste_par_joueur': this.conteste_par_joueur,
            'contestation_acceptee': this.contestation_acceptee,
            'etat_echange': this.etat_echange
        };
    }
}

module.exports = Echange;