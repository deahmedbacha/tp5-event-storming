# bounded contexts

on a regroupé les événements du mur selon ce que chaque partie de QueenBee doit gérer. on a retenu 8 contextes.

une section du mur montre **quand** les choses arrivent. un bounded context montre plutôt **qui gère quoi** et avec quelles règles.

## 1. santé des colonies

- **responsabilité :** suivre les risques pour les abeilles et gérer les alertes jusqu'à leur résolution.
- **type :** cœur. **spécialités :** Dev / Data.
- **agrégat :** `Alerte`.
- **règles :** une alerte ne peut pas être résolue avant sa prise en charge ; si elle n'est pas prise en charge après 48 h, elle peut être escaladée. une alerte résolue ne change plus d'état.
- **événements du mur :** 17 à 24, et 32 (`Alerte résolue après inspection`).
- **publie :** `AlerteLevée`, `AlertePriseEnCharge`, `AlerteEscaladée`, `AlerteRésolue`.
- **consomme :** `MesureValidée` (Collecte et synchronisation) et les informations d'inspection (Interventions terrain). le modèle de prédiction apporte aussi ses résultats.
- **sources :** UC-A02, UC-A01, UC-C01, TP5 Dev.
- **mots utilisés :** risque, confiance, alerte, prise en charge, escalade.

## 2. collecte et synchronisation

- **responsabilité :** recevoir les données des ruches, contrôler les trames et envoyer les mesures au central, même après une coupure.
- **type :** support. **spécialités :** Dev / Data.
- **agrégat :** `Mesure`.
- **règles :** chaque mesure est liée à une ruche ; une trame invalide ou déjà reçue est rejetée.
- **événements du mur :** 7 à 16.
- **publie :** `MesureValidée`, `MesuresSynchronisées`, `TrameInvalideRejetée`.
- **consomme :** les trames des capteurs et passerelles, ainsi que les identifiants de ruches et sites du Référentiel apicole.
- **sources :** UC-T02, UC-CY01, UC-CY02.
- **mots utilisés :** capteur, mesure, trame, cache local, synchronisation.

## 3. interventions terrain

- **responsabilité :** organiser les visites et enregistrer les inspections réalisées par les apicultrices, même hors ligne.
- **type :** cœur. **spécialité :** Dev.
- **agrégats :** `Visite` et `Inspection`.
- **règles :** une visite doit avoir un intervenant et une ruche concernée ; une inspection doit rester disponible localement jusqu'à sa synchronisation.
- **événements du mur :** 25 à 31. l'événement 32 concerne la résolution d'une alerte, donc il appartient à Santé des colonies.
- **publie :** `VisitePlanifiée`, `VisiteAttribuée`, `InspectionEnregistrée`, `InspectionSynchronisée`, `AnomalieInspectionSignalée`.
- **consomme :** les alertes venant de Santé des colonies et les références des ruches.
- **sources :** UC-A01, UC-C01, UC-A02.
- **mots utilisés :** visite, inspection, observation, affectation.

## 4. production apicole

- **responsabilité :** enregistrer les récoltes, comparer les rendements et permettre leur validation par le coordinateur.
- **type :** cœur. **spécialités :** Dev / Data.
- **agrégat :** `Recolte`.
- **règles :** le volume déclaré doit être positif ; une récolte validée ne peut plus être modifiée directement.
- **événements du mur :** 33 à 40.
- **publie :** `RecolteDéclarée`, `EcartRendementCalculé`, `RecolteValidée`, `EcartRecolteSignalé`.
- **consomme :** les poids mesurés (Collecte et synchronisation), le référentiel des ruches et les prévisions du modèle.
- **sources :** UC-A03, UC-C02.
- **mots utilisés :** récolte, rendement, écart, validation.

## 5. supervision et incidents

- **responsabilité :** suivre les passerelles et repérer les problèmes techniques : panne, brouillage ou déplacement suspect.
- **type :** support. **spécialités :** Cyber / Dev.
- **agrégat envisagé :** `Passerelle` ; on peut l'ajouter au mur si notre groupe le valide.
- **règles :** une passerelle est rattachée à un site ; les données en attente doivent être conservées jusqu'à leur envoi réussi.
- **événements du mur :** 41 à 45. en pratique, ils arrivent pendant la collecte, pas seulement en fin de période.
- **publie :** `PasserelleHorsLigne`, `AlerteSiteLevée`, `BrouillageRadioDétecté`, `DéplacementAnormalDétecté`.
- **consomme :** l'état des passerelles et la position des ruches reçue avec les trames.
- **sources :** UC-CY01, UC-CY02, UC-CY03, UC-CY04.
- **mots utilisés :** incident, panne, passerelle, site, alerte technique.

## 6. identités et accès

- **responsabilité :** gérer les utilisateurs, leurs rôles, leurs permissions et la connexion à QueenBee.
- **type :** générique. **spécialités :** Dev / Cyber.
- **agrégat :** `CompteUtilisateur`.
- **règles :** un compte désactivé ne peut plus se connecter ; les permissions dépendent du rôle et du site.
- **événements du mur :** 1 à 6.
- **publie :** `CompteUtilisateurCréé`, `RoleAttribué`, `CompteDésactivé`.
- **consomme :** aucun événement obligatoire dans notre mur ; utilise les sites du référentiel pour attribuer les accès.
- **sources :** UC-AD01, UC-T01.
- **mots utilisés :** compte, rôle, permission, authentification.

## 7. pilotage et impact

- **responsabilité :** regrouper les indicateurs des sites et préparer les rapports pour les bailleurs.
- **type :** support. **spécialités :** Data / Dev.
- **agrégat :** `RapportImpact`.
- **règles :** un rapport doit préciser sa période et les sites concernés ; les indicateurs doivent correspondre à cette sélection.
- **événements du mur :** 46 à 48.
- **publie :** `IndicateursConsolidés`, `RapportImpactGénéré`, `RapportEnvoyé`.
- **consomme :** les récoltes validées, les données de santé des colonies et les infos de disponibilité des sites.
- **sources :** UC-G01, UC-G02.
- **mots utilisés :** indicateur, bilan, rendement, rapport d'impact.

## 8. référentiel apicole

- **responsabilité :** garder les informations de base sur les ruches, les sites et les coopératives.
- **type :** support. **spécialités :** Dev / Data.
- **agrégat :** `Ruche`.
- **règles :** chaque ruche a un identifiant unique ; elle appartient à un site.
- **événements du mur :** aucun événement dédié parmi nos 48 post-it. les autres contextes utilisent surtout ses informations.
- **publie :** pas encore d'événement sur le mur ; il met à disposition les informations des ruches et des sites.
- **consomme :** aucun événement défini pour le moment.
- **sources :** CDC 7.1, UC-A01, UC-A03, UC-C01.
- **mots utilisés :** ruche, site rucher, coopérative, rattachement.

## pourquoi on les a séparés ?

- une **alerte pour une colonie** et une **alerte technique** ne sont pas traitées de la même manière. donc on les a mises dans deux contextes.
- **valider une mesure** se fait automatiquement, tandis que **valider une récolte** est une décision du coordinateur.
- une **inspection** se passe sur le terrain, mais c'est le contexte Santé des colonies qui décide si l'alerte peut être résolue.
- les données de **ruche** sont partagées, mais chaque contexte garde ses propres règles. comme ça on évite de tout mélanger.

les noms d'événements sont ceux qu'on propose pour l'architecture. on n'a pas codé tous ces contextes, le travail demandé ici est de les définir.
