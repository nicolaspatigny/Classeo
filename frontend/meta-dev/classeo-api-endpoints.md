# Classeo — Contrat API attendu par le Frontend Angular

**Projet :** Classeo  
**Client :** Angular  
**Backend cible :** API REST Spring Boot  
**Base URL prévue :** `/api`

> Les mocks JSON restent utilisés temporairement côté Angular pour les démonstrations.
> Ce document décrit les endpoints nécessaires lorsque le frontend sera branché sur l'API.

---

# 1. Authentification

## POST `/api/auth/login`

Connexion d'un utilisateur.

### Request

```json
{
  "login": "alice",
  "password": "password",
  "userType": "ELEVE"
}
```

### Response

```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Alice",
    "promotionId": 2,
    "filiereId": 1,
    "cursusId": 1
  }
}
```

Pour un enseignant, `userType` sera `ENSEIGNANT`.

### Erreur

`401 Unauthorized` si les identifiants sont incorrects.

---

# 2. Utilisateurs

## GET `/api/users`

Récupère les utilisateurs.

### Response

```json
[
  {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Alice",
    "promotionId": 2,
    "filiereId": 1,
    "cursusId": 1
  }
]
```

## GET `/api/users/{id}`

Retourne un utilisateur.

Exemple :

`GET /api/users/1`

---

# 3. Élèves

## GET `/api/promotions/{promotionId}/eleves`

Retourne les élèves d'une promotion.

Exemple :

`GET /api/promotions/2/eleves`

### Response

```json
[
  {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Alice",
    "promotionId": 2,
    "filiereId": 1,
    "cursusId": 1
  },
  {
    "id": 2,
    "nom": "Martin",
    "prenom": "Thomas",
    "promotionId": 2,
    "filiereId": 1,
    "cursusId": 1
  }
]
```

---

# 4. Promotions

## GET `/api/promotions`

Retourne toutes les promotions.

### Response

```json
[
  {
    "id": 1,
    "nom": "2025-2026",
    "dateDebut": "2025-09-01",
    "dateFin": "2026-06-30",
    "filiereId": 1
  },
  {
    "id": 2,
    "nom": "2026-2027",
    "dateDebut": "2026-09-01",
    "dateFin": "2027-06-30",
    "filiereId": 2
  }
]
```

## GET `/api/promotions/{id}`

Retourne une promotion.

---

# 5. Filières

## GET `/api/filieres`

Retourne toutes les filières.

## GET `/api/filieres/{id}`

Retourne une filière.

---

# 6. Cursus

## GET `/api/cursus`

Retourne tous les cursus.

## GET `/api/cursus/{id}`

Retourne un cursus.

---

# 7. Cours

## GET `/api/cours`

Retourne tous les cours.

### Response

```json
[
  {
    "id": 1,
    "nom": "Programmation Java"
  },
  {
    "id": 2,
    "nom": "Base de données"
  }
]
```

## GET `/api/cours/{id}`

Retourne un cours.

## POST `/api/cours`

Création d'un cours.

### Request

```json
{
  "nom": "Architecture Web",
  "promotionId": 2
}
```

### Response

```json
{
  "id": 5,
  "nom": "Architecture Web"
}
```

> Le frontend transmet actuellement `promotionId` lors de la création.
> Le backend devra donc créer également l'association cours → promotion.

---

# 8. Cours ↔ Promotions

## GET `/api/cours-promotions`

Retourne les associations cours/promotion.

### Response

```json
[
  {
    "coursId": 1,
    "promotionId": 2
  },
  {
    "coursId": 2,
    "promotionId": 2
  }
]
```

## GET `/api/promotions/{promotionId}/cours`

Retourne les cours d'une promotion.

> Endpoint pratique, mais pas strictement indispensable si le frontend utilise `/api/cours-promotions`.

---

# 9. Cours ↔ Enseignants

## GET `/api/cours-enseignants`

Retourne les associations cours/enseignant.

### Response

```json
[
  {
    "coursId": 1,
    "enseignantId": 4
  },
  {
    "coursId": 2,
    "enseignantId": 4
  }
]
```

## GET `/api/enseignants/{enseignantId}/cours`

Retourne directement les cours d'un enseignant.

> Endpoint pratique, mais pas strictement indispensable si le frontend utilise `/api/cours-enseignants`.

---

# 10. Séances / Emploi du temps

## GET `/api/seances`

Retourne toutes les séances.

### Response

```json
[
  {
    "id": 1,
    "coursId": 1,
    "date": "2026-08-13",
    "heureDebut": "14:00",
    "heureFin": "16:00",
    "salle": "B204"
  }
]
```

## GET `/api/seances/{id}`

Retourne une séance.

## GET `/api/cours/{coursId}/seances`

Retourne les séances d'un cours.

## GET `/api/eleves/{eleveId}/emploi-du-temps`

Retourne l'emploi du temps d'un élève.

## GET `/api/enseignants/{enseignantId}/emploi-du-temps`

Retourne l'emploi du temps d'un enseignant.

---

# 11. Création de séances

## POST `/api/seances`

Création d'une séance.

### Request

```json
{
  "coursId": 1,
  "date": "2026-08-20",
  "heureDebut": "14:00",
  "heureFin": "16:00",
  "salle": "B204"
}
```

### Response

```json
{
  "id": 7,
  "coursId": 1,
  "date": "2026-08-20",
  "heureDebut": "14:00",
  "heureFin": "16:00",
  "salle": "B204"
}
```

---

# 12. Notes

## GET `/api/notes`

Retourne toutes les notes.

### Response

```json
[
  {
    "id": 1,
    "eleveId": 1,
    "coursId": 1,
    "note": 15.5
  },
  {
    "id": 2,
    "eleveId": 1,
    "coursId": 1,
    "note": 12
  }
]
```

## GET `/api/eleves/{eleveId}/notes`

Retourne toutes les notes d'un élève.

> Endpoint important pour la page Notes de l'élève.

## GET `/api/cours/{coursId}/notes`

Retourne les notes d'un cours.

> Utile pour l'enseignant.

## POST `/api/notes`

Création d'une note.

### Request

```json
{
  "eleveId": 3,
  "coursId": 1,
  "note": 5
}
```

### Response

```json
{
  "id": 10,
  "eleveId": 3,
  "coursId": 1,
  "note": 5
}
```

### Validation

La note doit être comprise entre `0` et `20`.

---

# 13. Dashboard élève

Le dashboard élève utilise actuellement :

- l'utilisateur ;
- la promotion ;
- la filière ;
- le cursus.

Les endpoints nécessaires sont :

```text
GET /api/users/{id}
GET /api/promotions/{id}
GET /api/filieres/{id}
GET /api/cursus/{id}
```

---

# 14. Dashboard enseignant

Les informations minimales nécessaires sont :

```text
GET /api/users/{id}
GET /api/enseignants/{id}/cours
GET /api/enseignants/{id}/emploi-du-temps
```

---

# 15. Récapitulatif

| Méthode | Endpoint | Priorité |
|---|---|---|
| POST | `/api/auth/login` | 🔴 Haute |
| GET | `/api/users` | 🔴 Haute |
| GET | `/api/users/{id}` | 🔴 Haute |
| GET | `/api/promotions` | 🔴 Haute |
| GET | `/api/promotions/{id}` | 🔴 Haute |
| GET | `/api/promotions/{id}/eleves` | 🔴 Haute |
| GET | `/api/filieres/{id}` | 🟠 Moyenne |
| GET | `/api/cursus/{id}` | 🟠 Moyenne |
| GET | `/api/cours` | 🔴 Haute |
| GET | `/api/cours/{id}` | 🟠 Moyenne |
| POST | `/api/cours` | 🟠 Moyenne |
| GET | `/api/cours-promotions` | 🟠 Moyenne |
| GET | `/api/cours-enseignants` | 🔴 Haute |
| GET | `/api/enseignants/{id}/cours` | 🔴 Haute |
| GET | `/api/seances` | 🔴 Haute |
| GET | `/api/cours/{id}/seances` | 🟠 Moyenne |
| GET | `/api/eleves/{id}/emploi-du-temps` | 🔴 Haute |
| GET | `/api/enseignants/{id}/emploi-du-temps` | 🔴 Haute |
| POST | `/api/seances` | 🟠 Moyenne |
| GET | `/api/notes` | 🟠 Moyenne |
| GET | `/api/eleves/{id}/notes` | 🔴 Haute |
| GET | `/api/cours/{id}/notes` | 🟠 Moyenne |
| POST | `/api/notes` | 🟠 Moyenne |

---

# 16. Priorité V1 API

Pour une première intégration avec le frontend actuel :

## Authentification

```text
POST /api/auth/login
```

## Utilisateurs / élèves

```text
GET /api/users
GET /api/users/{id}
GET /api/promotions/{id}/eleves
```

## Référentiels

```text
GET /api/promotions
GET /api/promotions/{id}
GET /api/filieres/{id}
GET /api/cursus/{id}
```

## Cours

```text
GET /api/cours
POST /api/cours
GET /api/cours-promotions
GET /api/cours-enseignants
```

## Séances

```text
GET /api/seances
POST /api/seances
```

## Notes

```text
GET /api/eleves/{id}/notes
GET /api/cours/{id}/notes
POST /api/notes
```

---

# Remarque importante

Le frontend actuel sait reconstruire certaines relations à partir de données brutes :

```text
cours.json
cours-promotions.json
cours-enseignants.json
users.json
```

Il n'est donc **pas obligatoire** que le backend fournisse immédiatement tous les endpoints spécialisés comme :

```text
GET /api/enseignants/{id}/cours
GET /api/promotions/{id}/cours
```

Ces endpoints sont proposés comme raccourcis REST et pourront être ajoutés progressivement.

L'objectif principal de la V1 est de fournir les endpoints nécessaires au fonctionnement des pages actuellement développées, tout en conservant une structure REST cohérente.
