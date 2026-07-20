# Revue de littérature — fondements et limites du produit
*Livrable Lot 2 (EV-2 du cahier des charges) — note de synthèse à visée opérationnelle*
*Version 1.0 — Juillet 2026*

> **But de ce document.** Donner au produit une colonne vertébrale théorique et documenter honnêtement ses angles morts, de façon à alimenter directement le prompt système et les garde-fous. Ce n'est pas une revue exhaustive : ~10 sources structurantes, retenues parce qu'elles changent une décision de conception. Chaque section se termine par un « Ce que ça change pour le produit ».

---

## Thème 1 — Cadres validés de l'orientation (RIASEC, Super, SCCT, Gottfredson)

### 1.1 Holland / RIASEC
Holland (*Making Vocational Choices*, 1997) modélise personnes et environnements sur 6 types (Réaliste, Investigateur, Artistique, Social, Entreprenant, Conventionnel) et pose l'hypothèse de **congruence** : plus l'adéquation personne-environnement est forte, plus la satisfaction et la stabilité sont élevées. C'est le cadre le plus utilisé au monde en orientation et il structure déjà le référentiel du produit (mapping RIASEC des facettes et des univers).

**Nuance cruciale, souvent oubliée.** Les méta-analyses sur le lien congruence → satisfaction trouvent des corrélations **modestes** (de l'ordre de r ≈ 0,15–0,25 ; Tsabari, Tziner & Meir, 2005 ; voir aussi la synthèse de Nauta, 2010, *Journal of Counseling Psychology*). Autrement dit : la congruence RIASEC est un **bon langage de description et de dialogue**, pas un prédicteur fort du bien-être professionnel individuel. L'utiliser pour *structurer une conversation* est légitime ; l'utiliser pour *prédire* qu'une personne « sera épanouie » dans tel métier ne l'est pas.

### 1.2 Super — développement de carrière sur la vie entière
Super (life-span, life-space) rappelle que le choix professionnel n'est pas un événement ponctuel à 16 ans mais un **processus** qui se construit et se révise. À l'adolescence, l'identité vocationnelle est en *exploration*, pas figée. Prolongé par Savickas (*career construction theory*) : on construit du sens, on ne « découvre » pas un métier préexistant caché en soi.

### 1.3 SCCT — théorie sociale cognitive de carrière (Lent, Brown & Hackett, 1994)
La SCCT introduit deux variables décisives que l'observation comportementale brute ignore :
- **Le sentiment d'efficacité personnelle** (self-efficacy) : « est-ce que je me crois capable ? »
- **Les attentes de résultat** : « qu'est-ce que ça m'apporterait ? »

Ces deux médiateurs expliquent pourquoi **intérêt ne suffit pas** : un jeune peut s'intéresser à un domaine mais s'en exclure parce qu'il ne se croit pas capable (autocensure), souvent pour des raisons sociales ou de genre. La SCCT est le pont théorique entre le Thème 1 et le Thème 2.

### 1.4 Gottfredson — circonscription et compromis (1981)
Théorie directement pertinente pour le risque central du produit. Gottfredson montre que, très tôt, les enfants **éliminent** (circumscribe) des pans entiers de métiers jugés incompatibles avec leur genre perçu, puis leur classe sociale perçue, **avant même** de considérer leurs intérêts. Les intérêts n'interviennent qu'en dernier, sur l'espace déjà rétréci. Un outil qui lit les intérêts *tels qu'ils s'expriment aujourd'hui* lit donc un espace **déjà censuré** par le genre et la classe.

### Ce que ça change pour le produit
1. **Raisonner en dimensions RIASEC** comme langage partagé avec les conseillers — c'est fait (prompt v2), mais **sans jamais présenter la congruence comme une prédiction de bien-être**. Formuler « profil à dominante R-A » et non « tu seras épanoui en X ».
2. **Distinguer intérêt / aptitude / (sentiment d')efficacité / adéquation** — la distinction intérêt/aptitude/adéquation du prompt v2 gagnerait à intégrer explicitement le *sentiment d'efficacité* (SCCT) : « ce n'est pas parce que tu ne t'en crois pas capable que tu ne l'es pas ».
3. **Posture développementale (Super)** : ne jamais présenter un domaine comme une essence figée. Le vocabulaire « portes d'entrée, pas destinations » du produit est aligné — le maintenir fermement.
4. **Gottfredson justifie la fonctionnalité "fenêtre"** : proposer activement des métiers hors de l'espace déjà circonscrit n'est pas un gadget, c'est une réponse théorisée à un mécanisme documenté d'autocensure précoce.

---

## Thème 2 — Reproduction sociale et autocensure dans l'orientation

### 2.1 Bourdieu & Passeron — *La Reproduction* (1970), *La Distinction* (1979)
L'école et les institutions culturelles reproduisent les inégalités sous couvert de méritocratie. Les **goûts** eux-mêmes (ce qu'on aime, ce qu'on regarde) sont socialement construits (habitus) : ils portent la trace de l'origine sociale. Conséquence directe pour le produit : **les « données comportementales » ne sont pas un accès neutre à un "vrai soi"** — elles sont en partie le produit d'une position sociale. Prendre le goût observé pour une vérité intérieure, c'est risquer de **naturaliser** l'origine sociale (« il est comme ça ») au lieu de l'ouvrir.

### 2.2 Autocensure et aspirations
La sociologie de l'orientation documente l'**autocensure** : des élèves de milieux populaires, à résultats équivalents, s'orientent vers des voies moins ambitieuses parce qu'ils intègrent les filières « qui ne sont pas pour eux ». Le risque produit est symétrique et grave : à un jeune décrocheur, dire « t'es manuel, pas scolaire » à partir d'un déclaratif négatif sur l'école **entérine** l'autocensure au lieu de la desserrer.

### Ce que ça change pour le produit
1. **Ne jamais traiter le goût observé comme une essence.** Le prompt v2 pose déjà « le feed n'est pas la personne » (GF1) et interdit « profil manuel, pas scolaire » (GF3) — bon, à conserver et tester.
2. **La situation de formation adapte les voies, jamais l'ambition** (règle R5) — c'est la traduction opérationnelle directe de la lutte contre la reproduction. Un profil SEGPA passionné d'aéronautique reçoit la *voie* CAP→MC→évolution, pas un domaine au rabais.
3. **Mesurer le biais, pas seulement l'affirmer.** Le comité d'experts (sociologue) devra vérifier sur des cas réels si les recommandations renvoient statistiquement les profils populaires vers des métiers d'exécution. À intégrer au protocole d'évaluation.

---

## Thème 3 — Biais algorithmiques : le signal est pollué à la source

### 3.1 Bulle de filtre et chambres d'écho
Pariser (*The Filter Bubble*, 2011) et Sunstein (*#Republic*, 2017) : les systèmes de recommandation enferment l'utilisateur dans ce qui maximise l'engagement, réduisant la diversité de l'exposition. Le feed n'est pas ce que la personne *est*, c'est ce que l'algorithme a **appris à lui montrer pour la retenir**. Nuance empirique (Bakshy, Messing & Adamic, 2015, *Science*) : le tri algorithmique **et** les choix individuels réduisent tous deux la diversité — l'effet est réel même s'il se combine à l'homophilie sociale.

### 3.2 Homophilie
McPherson, Smith-Lovin & Cook (2001), « Birds of a Feather » : les réseaux sociaux sont massivement homophiles (on est connecté à des semblables sur le genre, l'âge, la classe, l'origine). Les comptes suivis reflètent donc en partie **l'entourage social**, pas seulement les intérêts propres.

### 3.3 Biais de genre dans la diffusion algorithmique
Preuve empirique directement transposable : Lambrecht & Tucker (2019, *Management Science*) montrent qu'une publicité **neutre** pour des emplois STEM est délivrée à **moins de femmes** — non par intention, mais par optimisation économique (les femmes jeunes sont une audience publicitaire plus chère, donc l'algo les évite). Noble (*Algorithms of Oppression*, 2018) documente comment les moteurs encodent des stéréotypes racisés et genrés. Conséquence : **une jeune fille peut ne jamais voir passer un contenu de mécanique ou d'ingénierie**, non parce que ça ne l'intéresserait pas, mais parce que l'algorithme ne le lui a pas poussé. Lire « aucun intérêt pour la mécanique » dans son feed serait une **erreur d'inférence**.

### Ce que ça change pour le produit
1. **L'absence dans le feed n'est jamais une absence d'intérêt.** Principe déjà posé (GF1). À marteler et à tester.
2. **La "fenêtre" est la réponse produit à la bulle de filtre** (GF2). Théoriquement fondée par Pariser/Sunstein + Gottfredson. Au moins une piste hors feed par rapport — implémenté.
3. **Vigilance genre explicite** (GF3) : ne pas déduire du feed des métiers stéréotypés de genre ; au contraire, tester activement les angles morts genrés. Lambrecht & Tucker en donne la justification empirique à citer devant les experts et le DPO.
4. **L'indicateur d'homogénéité du feed** (GF4, implémenté) matérialise ce thème : plus le feed est concentré, plus la bulle est serrée, plus il faut chercher ce qui n'apparaît pas.

---

## Thème 4 — L'effet Barnum : pourquoi « ça marche en test » ne prouve rien

Forer (1949), « The fallacy of personal validation » : des sujets notent 4,3/5 la justesse d'un profil de personnalité **générique et identique pour tous**. L'adhésion subjective (« c'est trop moi ») est produite par des énoncés suffisamment universels, flatteurs et vagues — exactement ce que produit aussi un horoscope. **La réaction enthousiaste d'un jeune ne valide donc pas le rapport.** C'est le principal piège de validation du produit : le succès ressenti des premiers tests est *attendu* même si le moteur ne fait pas mieux qu'un texte générique.

### Ce que ça change pour le produit
- **Le test décisif est le test Barnum à l'aveugle** (voir `protocole_test_barnum.md`) : le rapport personnalisé doit être distingué d'un rapport générique flatteur, à l'aveugle, significativement au-dessus du hasard. Tant que ce test n'est pas passé, aucune montée en charge (Lot 3 conditionné au Lot 2 dans le cahier des charges).
- **La granularité de reconnaissance** (nommer « la moto », pas « la mobilité ») est précisément ce qui devrait faire la différence avec un rapport Barnum : un texte générique ne peut pas citer les preuves comportementales spécifiques. Le test Barnum vérifie donc directement la valeur ajoutée revendiquée.

---

## Bibliographie de démarrage (~10 sources structurantes)

**Orientation / psychologie vocationnelle**
1. Holland, J. L. (1997). *Making Vocational Choices: A Theory of Vocational Personalities and Work Environments* (3ᵉ éd.). PAR.
2. Nauta, M. M. (2010). The development, evolution, and status of Holland's theory of vocational personalities. *Journal of Counseling Psychology*, 57(1), 11–22.
3. Lent, R. W., Brown, S. D., & Hackett, G. (1994). Toward a unifying social cognitive theory of career and academic interest, choice, and performance. *Journal of Vocational Behavior*, 45(1), 79–122.
4. Gottfredson, L. S. (1981). Circumscription and compromise: A developmental theory of occupational aspirations. *Journal of Counseling Psychology*, 28(6), 545–579.
5. Guichard, J., & Huteau, M. (2006). *Psychologie de l'orientation*. Dunod.

**Reproduction sociale**
6. Bourdieu, P., & Passeron, J.-C. (1970). *La Reproduction*. Éditions de Minuit.
7. Bourdieu, P. (1979). *La Distinction*. Éditions de Minuit.

**Biais algorithmiques**
8. Pariser, E. (2011). *The Filter Bubble*. Penguin. — et Sunstein, C. (2017). *#Republic*. Princeton UP.
9. McPherson, M., Smith-Lovin, L., & Cook, J. M. (2001). Birds of a feather: Homophily in social networks. *Annual Review of Sociology*, 27, 415–444.
10. Lambrecht, A., & Tucker, C. (2019). Algorithmic bias? An empirical study of apparent gender-based discrimination in the display of STEM career ads. *Management Science*, 65(7). — compl. Noble, S. U. (2018). *Algorithms of Oppression*. NYU Press.

**Validation / effet Barnum**
11. Forer, B. R. (1949). The fallacy of personal validation. *Journal of Abnormal and Social Psychology*, 44(1), 118–123.

> **Note d'honnêteté intellectuelle.** Cette synthèse a été rédigée pour outiller la conception, pas comme article scientifique. Les références et résultats (notamment les ordres de grandeur des corrélations) doivent être re-vérifiés à la source par le comité d'experts avant toute communication publique ou institutionnelle. Voir `comite_experts_mandat.md`.
