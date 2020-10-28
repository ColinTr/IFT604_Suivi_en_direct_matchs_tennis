/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

exports.verifierChampsValide = function verifierChampsValide(jsonObject) {
    return toutLesChampsSontPresents() && estUneAnneeValide(jsonObject.annee) && estUnMoisValide(jsonObject.mois) && estUnJourValide(jsonObject.jour) && estUneHeureValide(jsonObject.heure) && estUneMinuteValide(jsonObject.minute);
};

exports.toutLesChampsSontPresents = function toutLesChampsSontPresents(jsonObject) {
    const champsDate = ["annee", "mois", "jour", "heure", "minute"];
    champsDate.forEach(champ => {
        if (!jsonObject.hasOwnProperty(champ)) {
            return false;
        }
    });
    return true;
};

exports.estUneAnneeValide = function estUneAnneeValide(annee) {
    return estUnNombreEntier(annee);
};

exports.estUnMoisValide = function estUnMoisValide(mois) {
    return estUnNombreEntier(mois) && mois >= 1 && mois <= 12;
};

exports.estUnJourValide = function estUnJourValide(jour) {
    return estUnNombreEntier(jour) && jour >= 1 && jour <= 31;
};

exports.estUneHeureValide = function estUneHeureValide(heure) {
    return estUnNombreEntier(heure) && heure >= 0 && heure <= 23;
};

exports.estUneMinuteValide = function estUneMinuteValide(minute) {
    return estUnNombreEntier(minute) && minute >= 0 && minute <= 60;
};

exports.estUnNombreEntier = function estUnNombreEntier(n) {
    //Force à mettre en string, si n'en est pas un
    n = n.toString();

    //Verifie premier caractere est un 0, exemple mois janvier 01
    if (n.charAt(0) === '0') {
        n.substring(1);
    }

    const n1 = Math.abs(n),
          n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
};