-- =============================================
-- ROLSENSHOP — Schéma Base de Données Supabase
-- =============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLE: profiles (utilisateurs)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT,
  telephone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'acheteur' CHECK (role IN ('acheteur', 'vendeur', 'admin')),
  ville TEXT,
  quartier TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: boutiques (vendeurs)
CREATE TABLE boutiques (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  ville TEXT,
  quartier TEXT,
  localisation_lat DECIMAL,
  localisation_lng DECIMAL,
  statut TEXT DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'active', 'suspendue')),
  plan TEXT DEFAULT 'essai' CHECK (plan IN ('essai', 'pro')),
  essai_debut TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  essai_fin TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '90 days'),
  abonnement_debut TIMESTAMP WITH TIME ZONE,
  abonnement_fin TIMESTAMP WITH TIME ZONE,
  total_ventes INTEGER DEFAULT 0,
  note_moyenne DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: categories
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nom TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icone TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO categories (nom, slug, icone) VALUES
  ('Mode & Vêtements', 'mode', '👗'),
  ('Téléphones & Tech', 'tech', '📱'),
  ('Maison & Déco', 'maison', '🏡'),
  ('Beauté & Santé', 'beaute', '💄'),
  ('Alimentation', 'alimentation', '🍎'),
  ('Artisanat', 'artisanat', '🎨'),
  ('Vente en Gros', 'gros', '📦'),
  ('Agriculture', 'agriculture', '🌱');

-- TABLE: produits
CREATE TABLE produits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  boutique_id UUID REFERENCES boutiques(id) ON DELETE CASCADE,
  categorie_id UUID REFERENCES categories(id),
  nom TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  prix DECIMAL NOT NULL,
  stock INTEGER DEFAULT 0,
  etat TEXT DEFAULT 'neuf' CHECK (etat IN ('neuf', 'occasion')),
  type_vente TEXT DEFAULT 'detail' CHECK (type_vente IN ('detail', 'gros')),
  quantite_minimum INTEGER DEFAULT 1,
  statut TEXT DEFAULT 'actif' CHECK (statut IN ('actif', 'inactif', 'brouillon')),
  vues INTEGER DEFAULT 0,
  total_vendus INTEGER DEFAULT 0,
  note_moyenne DECIMAL DEFAULT 0,
  total_avis INTEGER DEFAULT 0,
  badge TEXT CHECK (badge IN ('top_vente', 'nouveau', NULL)),
  delai_livraison TEXT,
  zones_livraison TEXT,
  frais_livraison DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: produit_medias
CREATE TABLE produit_medias (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  produit_id UUID REFERENCES produits(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  public_id TEXT,
  type TEXT DEFAULT 'photo' CHECK (type IN ('photo', 'video')),
  ordre INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: panier
CREATE TABLE panier (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  produit_id UUID REFERENCES produits(id) ON DELETE CASCADE,
  quantite INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, produit_id)
);

-- TABLE: commandes
CREATE TABLE commandes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  numero TEXT UNIQUE NOT NULL,
  acheteur_id UUID REFERENCES profiles(id),
  statut TEXT DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'confirmee', 'en_cours', 'livree', 'annulee')),
  montant_total DECIMAL NOT NULL,
  adresse_livraison TEXT,
  ville_livraison TEXT,
  telephone_livraison TEXT,
  methode_paiement TEXT DEFAULT 'mtn_momo' CHECK (methode_paiement IN ('mtn_momo', 'carte_virtuelle')),
  statut_paiement TEXT DEFAULT 'en_attente' CHECK (statut_paiement IN ('en_attente', 'paye', 'echoue', 'rembourse')),
  reference_paiement TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: commande_items
CREATE TABLE commande_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  commande_id UUID REFERENCES commandes(id) ON DELETE CASCADE,
  produit_id UUID REFERENCES produits(id),
  boutique_id UUID REFERENCES boutiques(id),
  quantite INTEGER NOT NULL,
  prix_unitaire DECIMAL NOT NULL,
  commission_taux DECIMAL DEFAULT 0,
  commission_montant DECIMAL DEFAULT 0,
  montant_vendeur DECIMAL NOT NULL,
  statut TEXT DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'confirmee', 'expediee', 'livree')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: avis
CREATE TABLE avis (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  produit_id UUID REFERENCES produits(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  commande_id UUID REFERENCES commandes(id),
  note INTEGER CHECK (note BETWEEN 1 AND 5),
  commentaire TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(produit_id, user_id)
);

-- TABLE: abonnements
CREATE TABLE abonnements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  boutique_id UUID REFERENCES boutiques(id) ON DELETE CASCADE,
  montant DECIMAL DEFAULT 5000,
  duree_mois INTEGER DEFAULT 2,
  statut TEXT DEFAULT 'actif' CHECK (statut IN ('actif', 'expire', 'annule')),
  debut TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fin TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '60 days'),
  reference_paiement TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLE: newsletter
CREATE TABLE newsletter (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nom TEXT,
  statut TEXT DEFAULT 'actif' CHECK (statut IN ('actif', 'desabonne')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TRIGGERS
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_produits_updated_at
  BEFORE UPDATE ON produits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_commandes_updated_at
  BEFORE UPDATE ON commandes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- TRIGGER: Créer profil automatiquement
CREATE OR REPLACE FUNCTION create_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, nom, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nom', 'Utilisateur'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'acheteur')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_profile_on_signup();

-- RLS POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profil visible par tous" ON profiles FOR SELECT USING (true);
CREATE POLICY "Modifier son propre profil" ON profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE boutiques ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Boutiques visibles par tous" ON boutiques FOR SELECT USING (true);
CREATE POLICY "Vendeur gère sa boutique" ON boutiques FOR ALL USING (auth.uid() = user_id);

ALTER TABLE produits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Produits actifs visibles" ON produits FOR SELECT USING (statut = 'actif');
CREATE POLICY "Vendeur gère ses produits" ON produits FOR ALL USING (
  boutique_id IN (SELECT id FROM boutiques WHERE user_id = auth.uid())
);

ALTER TABLE produit_medias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Medias visibles" ON produit_medias FOR SELECT USING (true);
CREATE POLICY "Vendeur gère ses medias" ON produit_medias FOR ALL USING (
  produit_id IN (
    SELECT p.id FROM produits p
    JOIN boutiques b ON p.boutique_id = b.id
    WHERE b.user_id = auth.uid()
  )
);

ALTER TABLE panier ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Voir son panier" ON panier FOR ALL USING (auth.uid() = user_id);

ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Voir ses commandes" ON commandes FOR SELECT USING (auth.uid() = acheteur_id);
CREATE POLICY "Créer une commande" ON commandes FOR INSERT WITH CHECK (auth.uid() = acheteur_id);

ALTER TABLE avis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Avis visibles" ON avis FOR SELECT USING (true);
CREATE POLICY "Laisser un avis" ON avis FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
CREATE POLICY "S'abonner newsletter" ON newsletter FOR INSERT WITH CHECK (true);ss