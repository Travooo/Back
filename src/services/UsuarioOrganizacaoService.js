const UsuarioOrganizacao = require("../models/UsuarioOrganizacao");
const bcrypt = require("bcrypt");
const supabase = require("../config/supabaseClient");
const { validateNumber, cleanObject } = require("../utils/validators");

class UsuarioOrganizacaoService {
  static async create(user) {
    if (!user || typeof user !== "object") {
      throw new Error("Dados inválidos ou não fornecidos.");
    }
    const validated = UsuarioOrganizacao.validateBySchema(user);
    // Verifica se já existe organização com 'email'
    const email = await this.getByEmail(validated.email);
    if (email) throw new Error("Email já cadastrado na base de dados.");
    // Faz o hashing da senha antes da inserção
    validated.senha = await bcrypt.hash(validated.senha, 10);
    const { data, error } = await supabase
      .from("usuarios_organizacao")
      .insert(validated)
      .select()
      .maybeSingle();
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    if (error) throw new Error(error.message);
    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from("usuarios_organizacao")
      .select("*")
      .eq("id", validateNumber(id, "organizacao_id"))
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  static async getByEmail(email) {
    const validados = UsuarioOrganizacao.validateBySchema({ email });
    const { data, error } = await supabase
      .from("usuarios_organizacao")
      .select("*")
      .eq("email", validados.email)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  static async getAll() {
    const { data, error } = await supabase
      .from("usuarios_organizacao")
      .select("*");
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async update(id, updates) {
    if (!updates || typeof updates !== "object") {
      throw new Error("Atualizações inválidas ou não fornecidas.");
    }
    // Verifica se o registro existe antes de atualizar
    const validId = validateNumber(id, "organizacao_id");
    if (!(await this.getById(validId))) {
      throw new Error("Organização não encontrada.");
    }
    // Valida os dados conforme schema e faz o hashing da senha se houver
    const camposValidos = cleanObject(updates);
    if (camposValidos.senha) {
      camposValidos.senha = await bcrypt.hash(camposValidos.senha, 10);
    }
    const validados = UsuarioOrganizacao.validateBySchema(camposValidos);
    // Inserção no banco
    const { data, error } = await supabase
      .from("usuarios_organizacao")
      .update(validados)
      .eq("id", validId)
      .select()
      .single();
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async delete(id) {
    // Verifica se o registro existe antes de atualizar
    const organizacao = await this.getById(
      validateNumber(id, "organizacao_id")
    );
    if (!organizacao) {
      throw new Error("Organização não encontrada.");
    }
    const { data, error } = await supabase
      .from("usuarios_organizacao")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

module.exports = UsuarioOrganizacaoService;
