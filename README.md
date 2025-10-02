# Projet Next.js - Cours

Ce projet Next.js a été créé avec TypeScript et Tailwind CSS.

## Technologies utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique pour JavaScript
- **Tailwind CSS** - Framework CSS utilitaire
- **ESLint** - Linter pour maintenir la qualité du code
- **Supabase** - Base de données et backend-as-a-service

## Installation et lancement

Avant de pouvoir lancer le projet, vous devez installer Node.js sur votre système.

### 1. Installer Node.js

```bash
# Avec Homebrew (recommandé pour macOS)
brew install node

# Ou télécharger depuis https://nodejs.org/
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer Supabase

- Copiez `.env.example` vers `.env.local`
- Remplissez vos variables d'environnement Supabase
- Créez une table `waiting_list` dans votre base Supabase (voir structure ci-dessous)

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

## Configuration Supabase

### Structure de la table `waiting_list` existante

Votre table `waiting_list` a déjà cette structure :

```sql
CREATE TABLE public.waiting_list (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  email text,
  CONSTRAINT waiting_list_pkey PRIMARY KEY (id)
);
```

Le code est adapté pour fonctionner avec votre schéma existant :
- `id` : Clé primaire auto-incrémentée (bigint)
- `created_at` : Timestamp automatique
- `email` : Stockage de l'email (et nom si fourni)

### Politique de sécurité (IMPORTANT)

Votre table a Row Level Security (RLS) activé. Vous devez créer une politique pour permettre les insertions publiques :

```sql
-- Permettre les insertions publiques
CREATE POLICY "Allow public inserts" ON public.waiting_list
  FOR INSERT TO anon
  WITH CHECK (true);

-- Optionnel: Permettre la lecture publique
CREATE POLICY "Allow public reads" ON public.waiting_list
  FOR SELECT TO anon
  USING (true);
```

**⚠️ ERREUR COMMUNE:** Si vous obtenez l'erreur `"new row violates row-level security policy"`, cela signifie que vous devez exécuter la commande SQL ci-dessus dans votre dashboard Supabase.

### Variables d'environnement

Créez un fichier `.env.local` avec :

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production  
- `npm run start` - Lance l'application en mode production
- `npm run lint` - Vérifie le code avec ESLint

## Structure du projet

```
src/
  app/
    layout.tsx     # Layout principal
    page.tsx       # Page d'accueil
    globals.css    # Styles globaux
  components/
    NewsletterForm.tsx  # Formulaire d'inscription
    ContactForm.tsx     # Formulaire de contact
    Modal.tsx          # Composant modal
  lib/
    supabase.ts        # Configuration Supabase
```

## Déploiement

La façon la plus simple de déployer votre app Next.js est d'utiliser [Vercel](https://vercel.com/), la plateforme des créateurs de Next.js.

Consultez la [documentation de déploiement Next.js](https://nextjs.org/docs/deployment) pour plus de détails.