/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

const modificateurVitesse = Math.max(process.argv[2], 1);

const listePartie = [];

let tick = 0;

exports.ajouterPartie = function ajouterPartie(partie) {
    partie.tick_debut = partie.tick_debut + tick;
    listePartie.push(partie);
};

const demarrer = function () {
    setInterval(function () {
        listePartie.forEach(function (partie) {
            if (partie.tick_debut === tick) {
                console.log('La partie d\'id', partie.id_partie, 'commence');
                partie.jouerPartie();
            }
        });

        tick += 1;
    }, Math.floor(1000 / modificateurVitesse));
};

module.exports.demarrer = demarrer;