/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

    exports.verifierChampsValide = function verifierChampsValide(jsonObject){

        if(this.toutLesChampsSontPresents() && this.estUneAnneeValide(jsonObject.annee) && this.estUnMoisValide(jsonObject.mois) && this.estUnJourValide(jsonObject.jour) && this.estUneHeureValide(jsonObject.heure) && this.estUneMinuteValide(jsonObject.minute)){
            return true
        }

        return false
    }


    exports.toutLesChampsSontPresents = function toutLesChampsSontPresents()
    {
        const champsDate = ["annee", "mois", "jour", "heure", "minute"];
        champsDate.forEach(champ => {
            if(!this.jsonObject.hasOwnProperty(champ))
            {
                return false;
            }
        })
        return true;
    }

    exports.estUneAnneeValide = function estUneAnneeValide(annee){

        if(this.estUnNombreEntier(annee))
        {
            return true
        }

        return false
    }

    exports.estUnMoisValide = function estUnMoisValide(mois){

        if(!this.estUnNombreEntier(mois) || mois < 1 || mois > 12)
        {
            return false
        }

        return true

    }

    exports.estUnJourValide = function estUnJourValide(jour){

        if(!this.estUnNombreEntier(jour) || jour < 1 || jour > 31)
        {
            return false
        }

        return true
    }

    exports.estUneHeureValide = function estUneHeureValide(heure){

        if(!this.estUnNombreEntier(heure) || heure < 0 || heure > 23)
        {
            return false
        }

        return true
    }

    exports.estUneMinuteValide = function estUneMinuteValide(minute){

        if(!this.estUnNombreEntier(minute) || minute < 0 || minute > 60)
        {
            return false
        }

        return true

    }

     exports.estUnNombreEntier = function estUnNombreEntier(n) {
        //Force à mettre en string, si n'en est pas un
        n = n.toString();

        //Verifie premier caractere est un 0, exemple mois janvier 01
        if(n.charAt(0) === '0')
        {
            n.substring(1)
        }

        var n1 = Math.abs(n),
            n2 = parseInt(n, 10);
        return !isNaN(n1) && n2 === n1 && n1.toString() === n;
    }


