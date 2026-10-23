# points chauds

pendant l'event storming on a relevé quelques questions qui sont pas encore totalement claires dans le cahier des charges.
on les garde ici pour en discuter avec BeeAfrica et pour les prochaines décisions d'architecture.

| # | question | impact si on se trompe | qui peut répondre | adr ? |
|---|---|---|---|---|
| 1 | que faire si deux inspections hors ligne sont synchronisées sur la même ruche avec des infos différentes ? | on risque de perdre une inspection ou d'écraser des données | équipe dev et coordinateur | oui, gestion des conflits |
| 2 | qui décide des seuils d'alerte selon le type de ruche et le site ? | trop de fausses alertes ou des risques pas détectés | administrateur et BeeAfrica | non, plutôt une règle métier à préciser |
| 3 | comment envoyer une alerte importante à l'apicultrice si elle n'a pas de réseau ? | l'intervention peut arriver trop tard | équipe dev et BeeAfrica | oui, notification hors ligne |
| 4 | une récolte déjà validée peut-elle être corrigée ? et par qui ? | les chiffres des rapports risquent de devenir faux | coordinateur et BeeAfrica | non, décision métier |
| 5 | est-ce qu'une alerte de colonie et une alerte de passerelle doivent suivre les mêmes étapes ? | on mélange deux problèmes qui ont pas les mêmes responsables | BeeAfrica et équipe technique | non, frontière entre contextes |
| 6 | qui peut autoriser un déplacement de ruche avant qu'il soit considéré comme suspect ? | risque de fausse alerte de vol ou de vol non détecté | coordinateur et BeeAfrica | non, règle d'autorisation |
| 7 | où gérer l'escalade automatique d'une alerte après 48 h : dans une tâche planifiée ou une file de messages ? | une alerte oubliée peut ne jamais être escaladée | équipe dev | oui, politique d'escalade |
| 8 | combien de retard on accepte pour les mesures stockées sur une passerelle quand le réseau est coupé ? | les alertes peuvent se baser sur des données trop anciennes | BeeAfrica, dev et data | oui, synchronisation différée |
| 9 | comment traiter les trames invalides ou rejouées plusieurs fois par le même capteur ? | les prédictions peuvent utiliser des données non fiables | équipe cyber et data | oui, gestion de l'intégrité |

## ce qu'on garde pour la suite

les décisions qui touchent l'architecture seront reprises en séance 6 dans les adr.
par exemple la synchronisation hors ligne, les notifications et l'escalade après 48 h.

pour les seuils d'alerte, la validation des récoltes et les déplacements de ruches, il faut surtout confirmer les règles avec BeeAfrica.
