# aikidoitinerant
une app pour lister les clubs d'aikido en France et leurs politiques d'accès aux itinérants

## les sources de données
Le site web de la FFAAA : https://www.aikido.com.fr/trouver-un-club/

Apparemment on peut construire les requêtes GET http avec les paramètres ( ? ) :
- rid_discipline [2 pour Aikido, 3 Aikibudo, 5 kinomichi, rien toutes les disciplines ]
- rid_region [un numéro par région classées dans l'ordre alphabétique ...  1 pour Auvergne Rhone Alpes, 18 pour Nouvelle Calédonie]
- ville prend en majuscule le nom de la ville
- enfant si égal 1 on cherche les clubs avec des cours enfants
- adulte si égal 1 on cherche les clubs avec des cours adultes
- n_page égal le numéro de page de résultat (  )
