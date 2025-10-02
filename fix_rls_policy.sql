-- Solution définitive pour le problème RLS (Code d'erreur: 42501)
-- Exécutez ces commandes une par une dans l'éditeur SQL de Supabase

-- 1. SOLUTION RAPIDE: Désactiver RLS (Recommandé pour commencer)
ALTER TABLE public.waiting_list DISABLE ROW LEVEL SECURITY;

-- 2. SOLUTION SÉCURISÉE: Si vous voulez garder RLS, essayez ces politiques
-- D'abord, réactiver RLS
-- ALTER TABLE public.waiting_list ENABLE ROW LEVEL SECURITY;

-- Puis créer une politique permissive pour tous les utilisateurs
-- DROP POLICY IF EXISTS "Allow all operations" ON public.waiting_list;
-- CREATE POLICY "Allow all operations" ON public.waiting_list
--     FOR ALL 
--     TO public
--     USING (true) 
--     WITH CHECK (true);

-- 3. ALTERNATIVE: Politique spécifique pour les insertions anonymes
-- DROP POLICY IF EXISTS "Enable insert for anon" ON public.waiting_list;
-- CREATE POLICY "Enable insert for anon" ON public.waiting_list
--     FOR INSERT 
--     TO anon, authenticated
--     WITH CHECK (true);

-- 4. Vérifier le statut RLS après modification
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'waiting_list';

-- 5. Vérifier les politiques existantes
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies 
WHERE tablename = 'waiting_list';