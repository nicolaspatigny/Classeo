
# Règles métier

## 1. Gestion des utilisateurs

- Chaque utilisateur possède un compte et un rôle : **Élève, Professeur ou Administratif**.
- Les fonctionnalités accessibles dépendent du rôle de l’utilisateur.
- Un élève est associé à une promotion.
- Un professeur peut être affecté à plusieurs cours.

## 2. Promotions et filières

- Une promotion regroupe plusieurs élèves.
- Une promotion est rattachée à une filière.
- Un élève ne peut appartenir qu'à une promotion à la fois.
- Une promotion peut être associée à plusieurs cours.

## 3. Cursus

- Un cursus est rattaché à une filière.
- Un cursus est composé de plusieurs cours.
- Les cours d'un cursus suivent un ordre défini afin de respecter la progression pédagogique.
- Certains cours peuvent nécessiter des prérequis.

## 4. Cours

- Un cours peut être attribué à une promotion entière ou à des élèves individuellement.
- Un cours est associé à un ou plusieurs professeurs.
- Un cours possède des informations telles qu'une date, une heure et un emplacement ou une modalité.
- Les cours attribués apparaissent dans le calendrier des utilisateurs concernés.

## 5. Emploi du temps

- Un cours programmé apparaît dans l'emploi du temps des utilisateurs concernés.
- L'emploi du temps dépend des cours et des affectations définis dans l'application.
- Les modifications de cours ou d'affectations doivent être répercutées dans les calendriers concernés.

## 6. Gestion administrative

- Seul le personnel administratif peut gérer les éléments structurants de l'application : élèves, professeurs, promotions, filières, cursus et affectations.
- Les suppressions ou modifications doivent respecter les relations existantes entre les différents éléments.
- Un élément utilisé par d'autres données ne doit pas pouvoir être supprimé sans prendre en compte ses dépendances.

## 7. Notes (Optionnel)

- Une note est associée à un élève et à un cours.
- Seuls les professeurs autorisés peuvent saisir ou modifier les notes.
- Les élèves peuvent consulter leurs propres notes.
- Un élève ne peut pas modifier ses notes.

## 8. Absences (Optionnel)

- Une absence est associée à un élève et à un cours.
- Les professeurs peuvent enregistrer les absences des élèves présents à leur cours.
- Les élèves peuvent consulter leurs informations d'absence.
