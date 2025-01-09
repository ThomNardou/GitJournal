# GitJournal

## Languages et framework :
[![My Skills](https://skillicons.dev/icons?i=js,html,css,electron)](https://github.com/ThomNardou)

## Description : 
Cette application permet de générer automatiquement un journal de travail partir des commits d'un repos github.

## Format à respecter : 
Pour que l'application puisse fonctionner correctement un format doit être respecté :


### Titre :

```
<Ici vous pouvez mettre ce que vous voulez>
```


### Description :

```
<temps>-<état>-<issue> <commentaire>
```
> [!NOTE]  
> L'issue et le commentaire ne sont pas nécessaires au bon fonctionnement de l'application (le temps et l'état non plus, mais dans ce cas-là, on perd l'utilité d'un JDT 😁).

#### Exemples :
- temps : 18m ou 1h
- état : WIP ou DONE
- issue : #8
- commentaire : J'ai pris beaucoup de temps car ...

#### Exemple en command line : 
```git
git commit -m "<titre>" -m "<temps>-<état>-<issue> <commentaire>"
```

ou 

```
git commit -m "<titre>" -m "<temps>-<état>-<issue>" -m "<commentaire>"
```


### Fonctionnalités :

|      Nom      |      État     |
| ------------- | ------------- |
| Connexion avec Github  | ✅ |
| Système de recherche  | 🚧 |
| Affichage du temps total dans l'excel  | ❌ |


Des idées de fonctionnalité ? ouvrez une issue
