-- ZELA - Schema completo do banco
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(120) NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  termos_aceitos BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_cpf ON usuarios(cpf);

DO $$ BEGIN
  CREATE TYPE categoria_denuncia AS ENUM (
    'BURACO', 'ILUMINACAO', 'LIXO', 'SANEAMENTO', 'CALCADA', 'OUTROS'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE status_denuncia AS ENUM (
    'PENDENTE', 'EM_ANALISE', 'EM_ANDAMENTO', 'RESOLVIDO', 'CANCELADO'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS denuncias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  titulo VARCHAR(120) NOT NULL,
  descricao TEXT NOT NULL,
  categoria categoria_denuncia NOT NULL,
  status status_denuncia NOT NULL DEFAULT 'PENDENTE',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  endereco VARCHAR(255),
  foto_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_denuncias_usuario ON denuncias(usuario_id);
CREATE INDEX IF NOT EXISTS idx_denuncias_status ON denuncias(status);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_usuarios_updated_at ON usuarios;
CREATE TRIGGER update_usuarios_updated_at
  BEFORE UPDATE ON usuarios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_denuncias_updated_at ON denuncias;
CREATE TRIGGER update_denuncias_updated_at
  BEFORE UPDATE ON denuncias
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

SELECT 'Banco ZELA criado com sucesso!' AS status;