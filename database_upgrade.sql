-- Optionnel : Si vous voulez ajouter une colonne 'name' à votre table existante
-- Exécutez cette commande dans l'éditeur SQL de Supabase

ALTER TABLE public.waiting_list 
ADD COLUMN name text;

-- Cela permettra de stocker séparément le nom et l'email
-- sans avoir besoin de les concaténer dans le champ email