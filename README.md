<div align="center">

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║        ✦  S Y N T A X I A  ✦  L ' Î L E   P Y T H O N  ✦    ║
║                                                              ║
║         « Où chaque ligne de code est un sort lancé »        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

![Version](https://img.shields.io/badge/version-0.1.0--alpha-8B4FD8?style=flat-square&labelColor=1a0f00)
![Stack](https://img.shields.io/badge/React_%2B_FastAPI-enchantée-C8960A?style=flat-square&labelColor=1a0f00)
![Statut](https://img.shields.io/badge/statut-en_forge-D85A30?style=flat-square&labelColor=1a0f00)
![Licence](https://img.shields.io/badge/licence-MIT-3B6D11?style=flat-square&labelColor=1a0f00)

</div>

---

## ✦ Le Lore

Dans les terres oubliées de **Syntaxia**, un archipel mystérieux émerge des brumes du code non compilé.  
Chaque île renferme un **Savoir Ancien** — Variables, Listes, Fonctions, Classes — gardé par des créatures légendaires.

Tu es un **Codex Apprenti**. Ton destin : traverser les îles, affronter les défis, collecter des **Cartes de Pouvoir**, et devenir le **Grand Architecte** de Syntaxia.

> *« Le code ne ment jamais. C'est le codeur qui se trompe. »*  
> — Lumi, Gardienne de la Première Flamme

---

## 🗺️ La Carte du Monde

```
          🌊 ～～～～～～～～～～～～～～～～～～～～ 🌊
         
    🏝️ ÎLE I          🏝️ ÎLE II         🏝️ ÎLE III
   L'Archipel des    Le Marais des      La Tour des
     Variables        Structures          Fonctions
   [ ✅ Validée ]    [ 🔒 Verrouillée ] [ 🔒 Verrouillée ]

          🌊 ～～～～～～～～～～～～～～～～～～～～ 🌊

                         🏔️ ÎLE FINALE
                      Le Sommet du Codex
                    [ 🔒 Légendaire · Boss ]

          🌊 ～～～～～～～～～～～～～～～～～～～～ 🌊
```

---

## ⚔️ Mécanique de Jeu

Chaque île contient des **Topics**. Chaque Topic contient **5 Étapes** :

```
📦 TOPIC
│
├── Étape 1 ── QCM Facile        →  +10 XP
├── Étape 2 ── QCM Moyen         →  +20 XP
├── Étape 3 ── QCM Difficile     →  +30 XP
├── Étape 4 ── Exercice de Code  →  +50 XP
└── Étape 5 ── Défi Chronométré  →  +100 XP  ⏱️
                    ↓
         ✅ Topic Validé → XP + 🃏 Carte Aléatoire
```

### 🃏 Cartes de Pouvoir

À chaque topic validé, une carte magique est forgée pour toi. Il en existe **4 raretés** :

| Rareté | Couleur | Effet |
|---|---|---|
| ⚪ Commune | Gris argent | Bonus XP mineur |
| 🔵 Rare | Bleu saphir | Relance 1 défi raté |
| 🟣 Épique | Violet mystique | Révèle un concept caché |
| 🟡 Légendaire | Or ancien | Déverrouille un bonus d'île |

### 🧿 Power-ups en Combat

| Symbole | Nom | Effet |
|---|---|---|
| 💡 | Hint | Indice sur la question en cours |
| 📖 | Réexplication | Réexplique le concept depuis le début |
| ⏪ | Retour | Revenir à l'étape précédente |
| ⏭️ | Skip | Passer cette question (pénalité XP) |
| 😴 | Pause | Pause + message d'encouragement de Lumi |
| ❓ | Solution | Affiche la réponse expliquée |
| 🌟 | Encouragement | Boost moral + bonus XP surprise |
| 🎲 | Joker | Réponse automatique validée (1 usage/topic) |

---

## 🏗️ Architecture de la Forteresse

```
codexia/
│
├── 🏰 frontend/                  ← React + TypeScript
│   ├── 🗺️ world/                 ← Carte du monde (SVG / Tiled)
│   ├── 🃏 cards/                 ← Composants cartes magiques
│   ├── ⚔️ game/                  ← QCM, exercices, timer
│   └── 🧙 lumi/                  ← Personnage guide Lumi
│
├── ⚗️ backend/                   ← FastAPI + Python
│   ├── 📜 islands/               ← Données des îles et topics
│   ├── 🧮 engine/                ← Logique XP, progression
│   └── ⚡ judge/                 ← Intégration Judge0 (exécution code)
│
├── 🗄️ database/                  ← PostgreSQL + SQLAlchemy
│   ├── users                     ← Profils joueurs
│   ├── progress                  ← Progression par île/topic
│   └── cards                     ← Collection de cartes
│
└── 🌐 shared/                    ← Types TypeScript partagés
```

---

## ⚗️ Stack Technique

| Couche | Technologie | Rôle |
|---|---|---|
| Frontend | React + TypeScript | UI du jeu |
| Styles | Tailwind CSS | Thème visuel |
| Animations | Framer Motion | Effets cartes, transitions |
| State | Zustand | XP, progression, cartes |
| Carte monde | SVG / Tiled + Phaser | Overworld interactif |
| Backend | FastAPI | API + logique métier |
| Base de données | PostgreSQL + SQLAlchemy | Persistance |
| Auth | Supabase Auth | Sessions joueurs |
| Exécution code | Judge0 API | Sandbox Python sécurisée |
| Temps réel | WebSockets (FastAPI) | Timer du défi |

---

## 🔮 Installation Rituelle

### Prérequis

- Node.js `>= 18`
- Python `>= 3.11`
- PostgreSQL `>= 15`

### Invoquer le projet

```bash
# Cloner l'artefact
git clone https://github.com/ton-pseudo/codexia.git
cd codexia

# ─── Backend ───────────────────────────────────────────
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows : .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env               # Configurer les variables
alembic upgrade head               # Migrations base de données
uvicorn main:app --reload          # Lancer le serveur ⚡

# ─── Frontend ──────────────────────────────────────────
cd ../frontend
npm install
npm run dev                        # Lancer l'interface 🗺️
```

### Variables d'Environnement

```env
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/codexia
JUDGE0_API_KEY=ta_clé_judge0
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=ta_clé_supabase
SECRET_KEY=une_clé_secrète_très_longue
```

---

## 📜 Feuille de Route

- [x] Architecture définie
- [x] Composant Carte Magique (avec effet 3D holographique)
- [ ] Carte du monde interactive (SVG)
- [ ] Système QCM + évaluation
- [ ] Intégration Judge0 (exécution Python)
- [ ] Système XP + niveaux
- [ ] Collection de cartes
- [ ] Personnage Lumi (guide animé)
- [ ] Boss de fin d'île
- [ ] Mode multijoueur (duels)

---

## 🧙‍♀️ Lumi te dit...

> *« L'aventurier qui ne commit pas son code régulièrement  
> est condamné à réécrire ses sorts depuis le début. »*  
>  
> — `git commit -m "feat: survived the swamp of variables"`

---

## 📜 Licence

Ce grimoire est distribué sous licence **MIT**.  
Utilise-le, forge-le, améliore-le — mais n'oublie pas de citer ses origines.

---

<div align="center">

*Forgé avec ✦ et beaucoup de café dans les terres de Syntaxia*

</div>
