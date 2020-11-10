export function notifyMe(data) {
    // Vérifions si le navigateur prend en charge les notifications
    if (!('Notification' in window)) {
        alert('Ce navigateur ne prend pas en charge la notification de bureau')
    }

    // Vérifions si les autorisations de notification ont déjà été accordées
    else if (Notification.permission === 'granted') {
        // Si tout va bien, créons une notification
        new Notification(data.toString());
    }

    // Sinon, nous devons demander la permission à l'utilisateur
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            // Si l'utilisateur accepte, créons une notification
            if (permission === 'granted') {
                new Notification(data.toString());
            }
        })
    }

    // Enfin, si l'utilisateur a refusé les notifications, et que vous
    // voulez être respectueux, il n'est plus nécessaire de les déranger.
}

export function creerNotification(messageData) {
    // Vérifions si le navigateur prend en charge les notifications
    if (!('Notification' in window)) {
        alert('Ce navigateur ne prend pas en charge la notification de bureau')
    }

    // Vérifions si les autorisations de notification ont déjà été accordées
    else if (Notification.permission === 'granted') {
        // Si tout va bien, créons une notification
        envoyerNotification(messageData);
    }

    // Sinon, nous devons demander la permission à l'utilisateur
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            // Si l'utilisateur accepte, créons une notification
            if (permission === 'granted') {
                envoyerNotification(messageData);
            }
        })
    }

    // Enfin, si l'utilisateur a refusé les notifications, et que vous
    // voulez être respectueux, il n'est plus nécessaire de les déranger.
}

function envoyerNotification(messageData) {
    const messageJson = JSON.parse(messageData);

    if(messageJson.type_notification === "manche_terminee"){
        new Notification("Manche terminée !",
            {
                body:
                    "Partie " + messageJson.nom_joueur_1 + " vs " + messageJson.nom_joueur_2 + "\n"
                    + "Gagnée par " + (messageJson.score_joueur_1 > messageJson.score_joueur_2 ? messageJson.nom_joueur_1 : messageJson.nom_joueur_2) + "\n"
                    + messageJson.score_joueur_1 + " à " + messageJson.score_joueur_2
            }
        );
    } else if(messageJson.type_notification === "contestation") {
        new Notification("Contestation !",
            {
                body:
                    "Partie " + messageJson.nom_joueur_1 + " vs " + messageJson.nom_joueur_2 + "\n"
                    + "Contestation " + (messageJson.contestation_acceptee === true ? "gagnée" : "perdue") + " par " + (messageJson.conteste_par_joueur === 1 ? messageJson.nom_joueur_1 : messageJson.nom_joueur_2)
            }
        );
    } else {
        console.log("received SSE of unknown type_notification");
    }

}