-- Schéma de la base de données pour l'application de location de véhicules

CREATE TABLE utilisateur (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe_hash TEXT NOT NULL,
    nom VARCHAR(100),
    adresse TEXT,
    pays VARCHAR(100),
    langue VARCHAR(100),
);

CREATE TABLE agence (
    id SERIAL PRIMARY KEY,
    ville VARCHAR(100),
    adresse TEXT
);

CREATE TABLE vehicule (
    id SERIAL PRIMARY KEY,
    categorie_acriss VARCHAR(10),
    agence_id INTEGER REFERENCES agence(id),
    tarif NUMERIC(10,2)
);

CREATE TABLE reservation (
    id SERIAL PRIMARY KEY,
    utilisateur_id INTEGER REFERENCES utilisateur(id),
    vehicule_id INTEGER REFERENCES vehicule(id),
    date_debut TIMESTAMP,
    date_fin TIMESTAMP,
    statut VARCHAR(50),
    prix NUMERIC(10,2)
);

CREATE TABLE paiement (
    id SERIAL PRIMARY KEY,
    reservation_id INTEGER REFERENCES reservation(id),
    montant NUMERIC(10,2),
    date TIMESTAMP,
    statut VARCHAR(50)
);

CREATE TABLE message_support (
    id SERIAL PRIMARY KEY,
    utilisateur_id INTEGER REFERENCES utilisateur(id),
    type VARCHAR(50), -- ex: "chat", "visio", "formulaire"
    contenu TEXT,
    date TIMESTAMP
); 