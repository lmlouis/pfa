# Pfa - Communauté PME
Conception et développement d'une plateforme web pour la communauté des PMEs (Petites-Moyennes Entreprise)  .
 mon PFA [voir le site]()
 
## Sujet du PFA 


Nous souhaitons regrouper sur une plateforme Web  les adhérents de la communauté, 
qui sont des PMEs, où chaque type d'adhérent (STE industriel, STE de service ou STE commercial) peut exposer sa 
carte de visite, son domaine d'activité et la liste de ses produits / services. Nous voulons avoir une carte map 
sur laquelle les membres apparaissent, avec possibilité de rechercher par domaine d'activité, par type ou par région sur map.

## Environement de Dévéloppement
Exécuter: `ng --version`
- Angular CLI: v13.3.4
- Node: v16.15.0
- Package Manager: npm v8.8.0
- OS: linux x64
- Editeur IDE: Webstorm
- Déploiemment: git v2.25.1 ([github](https://github.com/lmlouis/))
- Base de données : Firebase (noSQl)

***
## Initialisation du projet

### Projet Angular 

```
$ ng new pfa
```
- Would you like to add Angular routing? `Yes`
- Which stylesheet format would you like to use? `SCSS`
- Angular CLI initialise un dossier `.git` lors de la création du projet

### Depot Github

```
$ git add .
$ git commit -m 'Initialisation du projet'
$ git branch -M main`
$ git remote add origin https://githubusername:<Token/Password>@github.com/githubusername/ ripository.git
$ git push origin main
```

### Pipline d'Integration-Déploiement Continue

```
$ mkdir .github
$ mkdir .github/workflows
$ touch .github/workflows/github-ci.yml
$ touch .github/workflows/nodejs-ci.yml
```
`github-ci.yml`
```
name: Integration Continue - Github Action
on: [push]
jobs:
  Explore-GitHub-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "🎉 Le travail a été automatiquement déclenché par un ${{ github.event_name }} évènement."
      - run: echo "🐧 Ce travail est maintenant exécuté sur un ${{ runner.os }} server hosted by GitHub!"
      - run: echo "🔎 Le nom de votre branche est  ${{ github.ref }} and le repository est ${{ github.repository }}."
      - name: Vérifier le code du Ripository
        uses: actions/checkout@v3
      - run: echo "💡 Le ${{ github.repository }} a été cloné vers le runner."
      - run: echo "🖥️ The workflow est maintenant prêt à tester votre code sur le runner."
      - name:  Lister les fichiers dans le repository
        run: |
          ls ${{ github.workspace }}
      - run: echo "🍏 Le statut de ce travail est  ${{ job.status }}."
```

`nodejs-ci.yml`

```
name: Node.js CI

on:
  [push]
jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version:  [16.15.0]

    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      ## - run: npm run build --if-present
      ## - run: npm test
```

***

## Mise en place de l'environnement de Développement

### Coté Front-End 

- Bootstrapp 
- Angular Material UI

#### Bootstrapp 

```
$ npm install bootstrap@latest
```
- Ajouter de bootstrapp dans `angular.json` => `"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.css",
  "src/styles.scss"
  ],`

#### Angular Material

```
$ ng add @angular/material
```
- Choose a prebuilt theme name, or "custom" for a custom theme: `Custom`
- Set up global Angular Material typography styles? `Yes`
- Set up browser animations for Angular Material? `Yes`

#### Module Material Angular 

```
$ ng g m material
$ touch src/app/material/custom-theme.scss
```
- ajouter dans angular.json => styles : `"./src/app/material/custom-theme.scss",`
- ajouter le theme customsié dans style.scsc `@import "app/material/custom-theme"; //ajout du theme`

#### installation de firebase 
```
$ npm install firebase @angular/fire
$ ng g m firebase
```
*** 
### Back-end

### Mise en place Router 
 
```
$ ng g m router
```
- Ajouter le SDK Firebase dans `environnements/environnement.ts`

```
export const environment = {
  production: false,
  /* Ajouter le SDK Firebase */
  firebase:{
    apiKey: "AIzaSyDZfWl6fBLTU7QPuCTjVw1KRVLe9O01xCU",
    authDomain: "pfa-angular.firebaseapp.com",
    projectId: "pfa-angular",
    storageBucket: "pfa-angular.appspot.com",
    messagingSenderId: "124082511456",
    appId: "1:124082511456:web:5c29b58d5da9c368d76d05"
  }


};
```

***
## Authentification

```
$ ng g c auth
$ ng g c auth/register
$ ng g c auth/login
$ ng g s auth/services/auth
$ ng g s auth/model/user

$ ng g c auth/forgotPassword
$ ng g c auth/verifyEmail
$ ng g c dashboard

$ ng g i auth/model/user
$ ng g s firebase/services/auth
```

## Guard 

```
$ ng g guard router/guard/auth

{path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent},
```