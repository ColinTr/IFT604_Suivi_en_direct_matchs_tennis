/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

exports.verifierChampsValide = function verifierChampsValide(jsonObject) {
    return this.toutLesChampsSontPresents(jsonObject) && this.estUneAnneeValide(jsonObject.annee) && this.estUnMoisValide(jsonObject.mois) && this.estUnJourValide(jsonObject.jour) && this.estUneHeureValide(jsonObject.heure) && this.estUneMinuteValide(jsonObject.minute);
};

exports.formaterJsonEnTimeStamp = function formaterJsonEnTimeStamp(jsonObject) {
    let sec = jsonObject.seconde;
    if(sec === undefined){
        sec = 0;
    }
    return (new Date(jsonObject.annee, jsonObject.mois, jsonObject.jour, jsonObject.heure, jsonObject.minute, sec, 0)).getTime();
};

exports.formaterTimeStampEnJson = function formaterTimeStampEnJson(UNIX_timestamp){
    const a = new Date(UNIX_timestamp);
    const year = a.getFullYear();
    const month = a.getMonth();
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    return JSON.parse("{ \"annee\" : " + year + ", \"mois\" : " + month + ", \"jour\" : " + date + ", \"heure\" : "  + hour + ", \"minute\" : " + min + ", \"seconde\" : " + sec + " }");
};

exports.toutLesChampsSontPresents = function toutLesChampsSontPresents(jsonObject) {
    const champsDate = ["annee", "mois", "jour", "heure", "minute"];
    let tousLesChampsSontPresents = true;
    champsDate.forEach(champ => {
        if (!jsonObject.hasOwnProperty(champ)) {
            tousLesChampsSontPresents = false;
        }
    });
    return tousLesChampsSontPresents;
};

exports.estUneAnneeValide = function estUneAnneeValide(annee) {
    return this.estUnNombreEntier(annee);
};

exports.estUnMoisValide = function estUnMoisValide(mois) {
    return this.estUnNombreEntier(mois) && mois >= 0 && mois <= 11;
};

exports.estUnJourValide = function estUnJourValide(jour) {
    return this.estUnNombreEntier(jour) && jour >= 1 && jour <= 31;
};

exports.estUneHeureValide = function estUneHeureValide(heure) {
    return this.estUnNombreEntier(heure) && heure >= 0 && heure <= 23;
};

exports.estUneMinuteValide = function estUneMinuteValide(minute) {
    return this.estUnNombreEntier(minute) && minute >= 0 && minute <= 60;
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