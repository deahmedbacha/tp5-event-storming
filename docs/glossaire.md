# glossaire queenbee
on a repris les mots qu'on utilise souvent dans queenbee, histoire de pas mélanger les choses entre les différents contextes.

| Terme | Définition | Contexte | Dans le code | Source |
|---|---|---|---|---|
| Confiance | valeur entre 0 et 1 qui indique la confiance dans le risque détecté | Santé des colonies | `confiance` | UC-A02, TP5 Dev |
| Site | endroit où se trouvent les ruches | Référentiel apicole | `SiteRucher` | CDC 3, 7.1 |
| Coopérative | groupe local d'apicultrices et d'apiculteurs | Référentiel apicole | `Cooperative` | CDC 3.1, 7.1 |
| Escalade | une alerte passe en escalade après 48 h sans prise en charge | Santé des colonies | `Alerte.escalader()` | TP5 Dev |
| Mesure | valeur relevée par un capteur sur une ruche à un moment donné | Collecte et synchronisation | `Mesure` | UC-T02 |
| Validation | décision du coordinateur d'accepter une récolte | Production apicole | `Recolte.valider()` | UC-C02 |
| Risque | problème possible pour une colonie, comme l'essaimage ou l'affaiblissement | Santé des colonies | `risque` | UC-A02 |
| Passerelle | équipement LoRaWAN qui reçoit les données des capteurs puis les envoie au central | Collecte et synchronisation | `Passerelle` | UC-T02 |
| Alerte | signalement d'un risque sur une colonie qu'il faut traiter | Santé des colonies | `Alerte` | UC-A02, TP5 Dev |
| Récolte | quantité de miel déclarée pour une ruche et une date | Production apicole | `Recolte` | UC-A03 |
| Ruche | ruche suivie par QueenBee, liée à un site et une coopérative | Référentiel apicole | `Ruche` | CDC 7.1 |
| Écart de rendement | différence entre le miel déclaré et ce qui était prévu | Production apicole | `ecartRendement` | UC-A03, UC-C02 |
| Synchronisation | envoi des données locales vers le serveur quand la connexion revient | Collecte et synchronisation | `Synchronisation` | UC-A01, UC-T02 |
| Site | équipements d'un site qu'on surveille en cas de panne | Supervision et incidents | `EtatSite` | UC-CY01 |
| Trame | message envoyé par un capteur avec ses mesures et la date | Collecte et synchronisation | `TrameCapteur` | UC-T02, UC-CY02 |
| Alerte | signalement d'un souci technique, par exemple une passerelle hors ligne | Supervision et incidents | `AlerteTechnique` | UC-CY01 à UC-CY04 |
| Prédiction de rendement | estimation du miel qu'une ruche devrait produire | Production apicole | `PredictionRendement` | UC-A03, UC-C02 |
| Compte utilisateur | compte utilisé pour accéder à la plateforme | Identités et accès | `CompteUtilisateur` | UC-AD01 |
| Rapport d'impact | PDF avec les indicateurs qu'on peut envoyer aux bailleurs | Pilotage et impact | `RapportImpact` | UC-G02 |
| Prise en charge | quand une apicultrice est assignée à une alerte | Santé des colonies | `Alerte.assigner()` | TP5 Dev |
| Mesure validée | mesure acceptée après vérification des valeurs et des doublons | Collecte et synchronisation | `MesureValidee` | UC-CY02 |
| Rôle | rôle d'une personne sur QueenBee : apicultrice, coordinateur, gestionnaire ou admin | Identités et accès | `role` | UC-AD01, UC-T01 |
| Validation | vérification automatique d'une mesure avant de l'accepter | Collecte et synchronisation | `validerMesure()` | UC-CY02 |
| Visite | intervention sur le terrain organisée par le coordinateur | Interventions terrain | `Visite` | UC-C01 |
| Inspection | observations sur une ruche, avec photo si besoin, même hors ligne | Interventions terrain | `Inspection` | UC-A01 |
| Capteur | équipement qui mesure le poids, la température, l'humidité ou l'activité des abeilles | Collecte et synchronisation | `Capteur` | UC-T02 |

## mots qui changent de sens

- **alerte** : pour la santé des colonies, c'est un risque pour les abeilles. pour la supervision, c'est un problème technique. donc cest pas la même chose et on les a séparés.
- **site** : dans le référentiel, c'est le lieu où sont les ruches. dans la supervision, on parle surtout des équipements et de leur disponibilité.
- **validation** : une mesure est vérifiée automatiquement, alors qu'une récolte est validée par le coordinateur.

les noms dans le code sont des propositions pour notre architecture. sauf `Alerte` et ses méthodes qui viennent du kit Dev du prof.
