/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

class Erreur {
    constructor(messageErreur) {
        this.messageErreur = messageErreur;
    }

    toJSON () {
        return {
            'error': this.messageErreur,
        };
    }
}

module.exports = Erreur;