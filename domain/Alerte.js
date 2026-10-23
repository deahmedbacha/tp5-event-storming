
 // QueenBee · contexte « Santé des colonies »  —  KIT DE DÉPART (TP 5, parcours Dev)
 // AGRÉGAT Alerte : racine unique, invariants protégés, événements du domaine.
 // Le cycle de vie est géré avec le pattern State : AUCUN switch sur le statut.
 //
 //   LEVÉE ──assigner──▶ PRISE_EN_CHARGE ──résoudre──▶ RÉSOLUE
 //     │                        ▲
 //     └──escalader (≥ 48 h)──▶ ESCALADÉE ──assigner──┘
 //
 // Ce qui est fourni : la structure, l'état LEVÉE → PRISE_EN_CHARGE (exemple),
 // la collecte des événements. À vous : les TODO (numérotés dans l'ordre conseillé).
 // Vérification : npm run tp5  (12 tests ; 4 passent au départ).

export const TYPES_DE_RISQUE = ['ESSAIMAGE', 'AFFAIBLISSEMENT', 'STRESS_THERMIQUE', 'MORTALITE'];
export const DELAI_ESCALADE_MS = 48 * 60 * 60 * 1000;

const iso = d => new Date(d).toISOString();
const aFaire = n => { throw new Error(`TODO ${n} : à implémenter`); };

// ---------------------------------------------------------------- états
const Levee = {
  nom: 'LEVÉE',
  // Exemple fourni : une transition = changer d'état + enregistrer un événement
  assigner(alerte, apicultriceId, at) {
    alerte._passer(PriseEnCharge, { type: 'AlertePriseEnCharge', apicultriceId, at: iso(at) });
  },
  escalader(alerte, at) {
    // TODO 4 : refuser si l'alerte n'est pas en retard (message contenant « 48 h »),
    //          sinon passer à l'état Escaladee avec l'événement « AlerteEscaladée »
    if (!alerte.estEnRetard(at)) {
      throw new Error('Impossible d’escalader avant 48 h');
    }

    alerte._passer(Escaladee, {
      type: 'AlerteEscaladée',
      at: iso(at)
    });
  },
  resoudre() {
    // TODO 3 : refuser (message contenant « prise en charge »)
    throw new Error('Une alerte doit être prise en charge avant d’être résolue');
  },
};

const PriseEnCharge = {
  nom: 'PRISE_EN_CHARGE',
  assigner() {
    // TODO 5a : refuser (déjà prise en charge)
    throw new Error('Alerte déjà prise en charge');
  },
  escalader() {
    // TODO 5b : refuser
    throw new Error('Une alerte prise en charge ne peut pas être escaladée');
  },
  resoudre(alerte, inspectionId, at) {
    // TODO 5c : passer à Resolue, événement « AlerteRésolue »
    //           (exiger un inspectionId)
    if (!inspectionId) {
      throw new Error('Identifiant inspection obligatoire');
    }

    alerte._passer(Resolue, {
      type: 'AlerteRésolue',
      inspectionId,
      at: iso(at)
    });
  },
};

const Escaladee = {
  nom: 'ESCALADÉE',
  assigner(alerte, apicultriceId, at) {
    // TODO 6a : comme depuis LEVÉE
    alerte._passer(PriseEnCharge, {
      type: 'AlertePriseEnCharge',
      apicultriceId,
      at: iso(at)
    });
  },
  escalader() {
    // TODO 6b : refuser (déjà escaladée)
    throw new Error('Alerte déjà escaladée');
  },
  resoudre() {
    // TODO 6c : refuser
    throw new Error('Une alerte doit être prise en charge avant d’être résolue');
  },
};

const Resolue = {
  nom: 'RÉSOLUE',
  // TODO 7 : plus aucune transition possible (trois refus explicites)
  assigner() {
    throw new Error('Alerte déjà résolue');
  },
  escalader() {
    throw new Error('Alerte déjà résolue');
  },
  resoudre() {
    throw new Error('Alerte déjà résolue');
  },
};

// ---------------------------------------------------------------- agrégat
export class Alerte {
  #etat = Levee;
  #events = [];

  constructor({ id, hiveId, siteId, risque, confiance, leveeLe }) {
    Object.assign(this, { id, hiveId, siteId, risque, confiance, leveeLe: new Date(leveeLe) });
  }

  /** Fabrique : seul moyen de créer une alerte valide. */
  static lever({ id, hiveId, siteId, type, confiance, at }) {
    // TODO 1 : invariants — type présent dans TYPES_DE_RISQUE (message « Type de risque… »)
    if (!TYPES_DE_RISQUE.includes(type)) {
      throw new Error(`Type de risque inconnu : ${type}`);
    }

    // TODO 2 : invariants — confiance numérique entre 0 et 1 (message contenant « confiance »)
    if (typeof confiance !== 'number' ||
        !Number.isFinite(confiance) ||
        confiance < 0 ||
        confiance > 1) {
      throw new Error('La confiance doit être comprise entre 0 et 1');
    }

    const alerte = new Alerte({ id, hiveId, siteId, risque: type, confiance, leveeLe: at });
    alerte.#events.push({ type: 'AlerteLevée', alerteId: id, hiveId, siteId, risque: type, confiance, at: iso(at) });
    return alerte;
  }

  get statut() { return this.#etat.nom; }

  assigner(apicultriceId, at) { this.#etat.assigner(this, apicultriceId, at); }
  escalader(at) { this.#etat.escalader(this, at); }
  resoudre(inspectionId, at) { this.#etat.resoudre(this, inspectionId, at); }

  /** Règle métier : une alerte restée LEVÉE 48 h sans prise en charge est en retard. */
  estEnRetard(now) {
    // TODO 4 (suite) : vrai si l'état est Levee et si now - leveeLe >= DELAI_ESCALADE_MS
    return this.#etat === Levee &&
      new Date(now).getTime() - this.leveeLe.getTime() >= DELAI_ESCALADE_MS;
  }

  /** Événements produits depuis le dernier appel (consommés une seule fois). */
  pullEvents() {
    const e = this.#events;
    this.#events = [];
    return e;
  }

  /** Réservé aux objets état de ce module : change d'état et enregistre l'événement. */
  _passer(etat, event) {
    this.#etat = etat;
    this.#events.push({ ...event, alerteId: this.id, hiveId: this.hiveId });
  }
}
