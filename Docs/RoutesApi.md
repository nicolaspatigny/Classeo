POST /api/auth/login
```json
{
  "login": "jdoe",
  "password": "Password123!",
  "userType": "ELEVE"
}
```

GET /api/promotions/{promotionId}/eleves
GET /api/promotions
POST /api/promotions
GET /api/promotions/{id}
GET /api/promotions/{promotionId}/cours
PUT /api/promotions/{id}
DELETE /api/promotions/{id}

GET /api/filieres
POST /api/filieres
GET /api/filieres/{id}
PUT /api/filieres/{id}
DELETE /api/filieres/{id}

GET /api/cursus
POST /api/cursus
GET /api/cursus/{id}
PUT /api/cursus/{id}
DELETE /api/cursus/{id}

GET /api/cours
GET /api/cours/{id}
POST /api/cours
GET /api/cours-promotions
GET /api/cours/{coursId}/seances
GET /api/cours/{coursId}/notes
GET /api/cours-eleves
GET /api/cours-enseignant
PUT /api/cours/{id}
DELETE /api/cours/{id}

GET /api/seances
GET /api/seances/{id}
POST api/seances
DELETE /api/seances/{id}

GET /api/enseignants/{enseignantId}/cours

GET /api/notes
POST /api/notes
PUT /api/notes/{id}
DELETE /api/notes/{id}
GET /api/eleves/{eleveId}/notes
POST /api/notes

GET /api/users
GET /api/users/{id}
POST /api/users
PUT /api/users/{id}
DELETE /api/users/{id}

GET /api/salles
GET /api/salles/{id}