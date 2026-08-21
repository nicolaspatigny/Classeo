# Introduction du projet (Nicolas)

Le projet consiste à développer une application web de **suivi pédagogique**, inspirée du fonctionnement de solutions telles que Pronote.
L’application permettra de centraliser la gestion des élèves, des professeurs, des cours, des emplois du temps, des notes, des absences et des parcours de formation.
L’objectif est de proposer une application **simple, intuitive et rapide à utiliser**, avec une interface adaptée au rôle de chaque utilisateur.
L'application a un front-end Angular, et un backend Java Spring Boot connecté à une base de données SQL.
L'application se scinde en 3 portails d'authentifications en fonction de l'utilisateur (eleve, prof, admin) qui implique 3 cas d'utilisation differents

# Exigences fonctionnels (Eric)

Pour cela, il y une autentification par token JWT, avec un systeme de login et mot de passe, crypter par l'algorithme BHash.

### Fonctionnel
#### Eleve:
- consulter ses cours
- emplois du temps
- notes
- abcenses (Pas réalisé)
#### Enseignant:
- Voir son calendrier
- Voir ses promotions (lui permetant de faire l'appel)
- Consulter & Créer des cours
- Assigner des notes aux Eleves
- Creer une sceance (pas réalisé)
#### Administrateur:
- Vue d'ensemble de l'application
- Gestion des Utilisateurs 
- Gestion des Promotions
- Gestion des Filières / Cursus / Cours
- Gestion des Séances

### Non fonctionnel
- Appel HTTP vers l'API minimal (Ex: on est passer de GetUsers à GetUsersByID)
- Protection des routes en frontend avec Guard
- Protection des droits en backend avec JWT et l'autorisation et les droits selon les roles
- Limitation du traitement des données en front grae à l'appel de endpoints spécialisés
- Popup et pages de redirection pour les Exceptions (Pas implémenter hormis login / et quelques formulaires qui affiches en rouge des messages d'erreurs)

- Pour l'accessibilité, design clair et épuré
- Pour l'accessibilité, avoir un design responsive pour mobille (Pas tester / Pas intégrer)


# Présentation des diagrammes

### Diagramme de cas d'utilisation (Nicolas)
![[Classeo_diag_utilisation.png|362]]
### Diagramme de séquences (Nicolas)
![[Classeo_diag_seq_login.png|363]]
### Diagramme de classes (ERIC)
![[Classeo_diag_classes.png|359]]
### Maquettage (Adrien)
![[classeo_login_sketch.jpg|355]]![[classeo_dashboard_sketch.png|311]]
![[classeo_calendrier_sketch 1.png|357]]![[classeo_cours_sketch.png|396]]

### MCD + MLD (ERIC)
![[MCD.png|421]]
![[MLD.png|424]]


# Démonstration de l'application  (Adrien)






# Démonstration d'une fonctionnalité (Adrien)
- Login
#### FrontEnd (Adrien)
-> Utilisateur Choix un portail
-> Utilisateur rentre ses login dans le formulaire
-> Component auth/login
-> Fonction loginForm() qui avec validators nous valide le format des données envoyé depuis le formulaire
-> Fonction onSubmit() qui trigger sur l'appui du bouton login du formulaire. Qui envoye au service auth (login,password,userType)
-> Le service auth envoye au endpoint de l'API la requete HTTP POST sur la route /api/auth/login avec pour body json (login,password,userType)


#### BackEnd (Nicolas)
-> Backend AuthController dans la classe LoginResponse 
2 choses en parralele :
- Qui envoye au authenticationManager qui permet de recuperer les detail de l'utilisateur pour generer le token                           |                    authRepository qui retourne un user
- Via le JWTService il cree le token grace à Jwts.builder                                                                                                                       |    Check si l'utilisateur est en BdD
-                                                                                                                                                                                 
-> Convertion des roles au cas où il y a missmatch entre les format d'ecrire des roles entre front et back
-> Genere un body de Response pour le Front avec buildUserResponse() [Token, User] (pour cela faut aller chercher prmoId,cursusId,filliereID, et l'user)
-> Il renvoye une reponse au frontend avec le Token ainsi que les information de l'User


#### FrontEnd (Adrien)
-> Le Front stocke en session le token
-> Deduire l'utilisateur & avec le token avec role
-> Ensuire a chaque appelle de route le auth_guard est appeler et verifie si l'Utilisateur est bien authentifié en verifiant si en session il y a bien le token
-> Ainsi les routes proteger par auth_guard peuvent uniquement etre acceder par un utilisateur authentifié
-> Ainsi a chaque appel suivant de notre utilisateur, notre intercepteur rajoute a chaque requete HTTP partant du front , dans le header le token.


#### BackEnd (Nicolas)
-> Le backend dans SecurityConfig ainsi recup le token en header de chaque requete HTTP lui provenant.
-> SecurityConfig autorise les routes si authentification


# Conclusion / Retour d'experience (Eric)

Se qu'il nous reste à faire:
- Absences / Sceance POST
- Design responsive pour mobille
- Page de redirection
- Implementer en front les routes DELETE PUT

Ce qu'on aurais pu faire mieux:
- Plus de test unitaires en cours de dev
- Trello pour les objectifs au jour le jour
- Plus de temps à réfléchir à la conception & analyse
		-> on a dû refactor un peu les tables



Sur comment ces 2 semaines se sont déroulé

