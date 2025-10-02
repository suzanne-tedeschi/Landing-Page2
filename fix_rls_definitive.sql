-- 🔧 SOLUTION DÉFINITIVE POUR LE PROBLÈME RLS RÉCURRENT
-- Exécutez ces commandes dans l'ordre dans votre Supabase SQL Editor

-- 1. Vérifier l'état actuel
SELECT 
    schemaname, 
    tablename, 
    rowsecurity as "RLS_Enabled",
    CASE 
        WHEN rowsecurity THEN 'RLS est ACTIVÉ ⚠️' 
        ELSE 'RLS est DÉSACTIVÉ ✅' 
    END as status
FROM pg_tables 
WHERE tablename = 'waiting_list';

-- 2. Voir toutes les politiques existantes
SELECT 
    policyname as "Nom_Politique",
    cmd as "Type_Operation", 
    roles as "Rôles",
    permissive as "Permissive"
FROM pg_policies 
WHERE tablename = 'waiting_list';

-- 3. SOLUTION 1: Désactiver complètement RLS (Recommandé pour une landing page)
ALTER TABLE public.waiting_list DISABLE ROW LEVEL SECURITY;

-- 4. SOLUTION 2: Si vous voulez garder RLS mais autoriser les insertions
-- (Décommentez les lignes ci-dessous si vous préférez cette approche)
/*
-- Activer RLS
ALTER TABLE public.waiting_list ENABLE ROW LEVEL SECURITY;

-- Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Enable insert for anon users" ON public.waiting_list;
DROP POLICY IF EXISTS "Allow public inserts" ON public.waiting_list;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.waiting_list;
DROP POLICY IF EXISTS "Allow all operations" ON public.waiting_list;

-- Créer une politique permissive pour toutes les opérations
CREATE POLICY "waiting_list_policy" ON public.waiting_list
    FOR ALL 
    USING (true) 
    WITH CHECK (true);

-- Accorder les permissions à tous les rôles
GRANT ALL ON public.waiting_list TO anon;
GRANT ALL ON public.waiting_list TO authenticated;
*/

-- 5. Vérification finale
SELECT 
    'RLS Status:' as info,
    CASE 
        WHEN rowsecurity THEN 'ACTIVÉ - Vérifiez les politiques' 
        ELSE 'DÉSACTIVÉ - Insertions autorisées ✅' 
    END as status
FROM pg_tables 
WHERE tablename = 'waiting_list';

-- 6. Test d'insertion pour vérifier
-- INSERT INTO public.waiting_list (email) VALUES ('test-sql-' || extract(epoch from now()) || '@example.com');

-- 7. Pour éviter que le problème revienne, vous pouvez créer cette fonction
CREATE OR REPLACE FUNCTION ensure_waiting_list_access()
RETURNS void AS $$
BEGIN
    -- S'assurer que RLS est désactivé
    ALTER TABLE public.waiting_list DISABLE ROW LEVEL SECURITY;
    
    -- Accorder les permissions
    GRANT INSERT, SELECT ON public.waiting_list TO anon;
    GRANT INSERT, SELECT ON public.waiting_list TO authenticated;
END;
$$ LANGUAGE plpgsql;

-- Exécuter la fonction
SELECT ensure_waiting_list_access();