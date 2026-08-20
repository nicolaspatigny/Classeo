## Auth
### POST /api/auth/login
```json
{
  "login": "jdoe",
  "password": "Password123!",
  "userType": "ELEVE"
}
```
## Promotions
### GET /api/promotions   -   GET /api/promotions/{id}
```json
{
  "id": 1,
  "nom": "Promotion Java 2026",
  "dateDebut": "2026-09-01",
  "dateFin": "2027-06-30",
  "cursusId": 10,
  "filiereId": 2
}
```
### GET /api/promotions/{promotionId}/eleves (eleves d'une promo)
```json
{
  "id": 1,
  "nom": "Dupont",
  "prenom": "Jean",
  "promotionId": 5,
  "cursusId": 12,
  "filiereId": 3
}
```
### POST /api/promotions  -  PUT /api/promotions/{id}
```json
{
  "nom": "Promotion CDA 2026",
  "dateDebut": "2026-09-01",
  "dateFin": "2027-06-30",
  "cursusId": 1
}
```
### GET /api/promotions/{promotionId}/cours (les cours d'une promo)
```json
{
  "id": 1,
  "nom": "Développement Java",
  "duree": 35
}
```
### DELETE /api/promotions/{id}

## FILIERE
### GET /api/filieres -  GET /api/filieres/{id}
```json
{
  "id": 1,
  "nom": "Développement Web"
}
```
### POST /api/filieres  -  PUT /api/filieres/{id}
```json
{
  "nom": "Développement Web"
}
```
### DELETE /api/filieres/{id}

## CRSUS
### GET /api/cursus  -  GET /api/cursus/{id}
```json
{
  "nom": 1,
  "filiere": "Développement"
}
```
## POST /api/cursus  -  PUT /api/cursus/{id}
```json
{
  "nom": "Informatique",
  "filiereId": 1
}
```
### DELETE /api/cursus/{id}

## COURS
### GET /api/cours  -  GET /api/cours/{id}
```json
{
  "id": 1,
  "nom": "Algorithmique",
  "duree": 35
}
```
### POST /api/cours  -  PUT /api/cours/{id}
```json
{
  "nom": "Concepteur Développeur d'Applications",
  "promotionId": 2 // nullable
}
```
### GET /api/cours-promotions
```json
{
  "coursId": 10,
  "promotionId": 2
}
```
### GET /api/cours/{coursId}/seances
```json
{
  "id": 1,
  "coursId": 10,
  "date": "2026-10-15",
  "formateurId": 5,
  "promotionId": 2,
  "heureDebut": "09:00:00",
  "heureFin": "12:30:00",
  "salleId": 1
}
```
### GET /api/cours/{coursId}/notes
```json
{
  "id": 1,
  "note": 15.5,
  "eleveId": 42,
  "coursId": 10
}
```
### GET /api/cours-eleves
```json
{
  "coursId": 10,
  "eleveId": 42
}
```
### GET /api/cours-enseignant
```json
{
  "coursId": 10,
  "enseignantId": 5
}
```
### DELETE /api/cours/{id}

## SEANCES
### GET /api/seances  -  GET /api/seances/{id}
```json
{
  "id": 1,
  "coursId": 12,
  "date": "2026-10-15",
  "formateurId": 4,
  "promotionId": 2,
  "heureDebut": "09:00:00",
  "heureFin": "12:30:00",
  "salleId": 2
}
```
### POST api/seances
```json
{
  "coursId": 12,
  "date": "2026-10-15",
  "formateurId": 4,
  "promotionId": 2,
  "heureDebut": "09:00:00",
  "heureFin": "12:30:00",
  "salleId": 3
}
```
### DELETE /api/seances/{id}

## ENSEIGNANT
### GET /api/enseignants/{enseignantId}/cours
```json
{
  "id": 1,
  "nom": "Architecture Logicielle",
  "duree": 35
}
```

## NOTES
### GET /api/notes
```json
{
  "id": 1,
  "note": 16.5,
  "eleveId": 42,
  "coursId": 10
}
```
### POST /api/notes  -  PUT /api/notes/{id}
```json
{
  "note": 14.5,
  "eleveId": 42,
  "coursId": 10
}
```
### DELETE /api/notes/{id}
### GET /api/eleves/{eleveId}/notes
```json
{
  "id": 1,
  "note": 15.0,
  "eleveId": 42,
  "coursId": 10
}
```

## UTILISATEUR
### GET /api/users  -  GET /api/users/{id}
```json
{
  "id": 1,
  "nom": "Martin",
  "prenom": "Alice",
  "dateNaissance": "2001-05-14",
  "role": "ELEVE",
  "filiereId": 1,
  "cursusId": 2,
  "promotionId": 3
}
```
### POST /api/users  -  PUT /api/users/{id}
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "dateNaissance": "1998-04-12",
  "role": "ELEVE",
  "login": "jdupont",
  "password": "Password123!",
  "promotionId": 2
}
```
### DELETE /api/users/{id}

## SALLES
### GET /api/salles  -  GET /api/salles/{id}
```json
    {
  "id": 6,
  "nom": "Amphi A"
}
```