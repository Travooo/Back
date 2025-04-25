const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const supabase = require("../config/supabaseClient");
const { validateNumber, cleanObject } = require("../utils/validators");

class UsuarioService {
  static async create(user) {
    if (!user || typeof user !== "object") {
      throw new Error("Dados inválidos ou não fornecidos.");
    }
    console.log("📥 Dados recebidos para criação:", user);
    const validated = Usuario.validateBySchema(user);
    // Verifica se já existe usuário com 'email'
    const usuarioExiste = await this.getByEmail(validated.email);
    if (usuarioExiste) throw new Error("Email já cadastrado na base de dados.");
    // Faz o hashing da senha
    validated.senha = await bcrypt.hash(validated.senha, 10);
    const { data, error } = await supabase
      .from("usuarios")
      .insert(validated)
      .select()
      .maybeSingle();
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    if (error) throw new Error("Email já cadastrado na base de dados:", error);
    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", validateNumber(id, "usuario_id"))
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  static async getByEmail(email) {
    const validados = Usuario.validateBySchema({ email });
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", validados.email)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  static async getAll() {
    const { data, error } = await supabase.from("usuarios").select("*");
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async update(id, updates) {
    if (!updates || typeof updates !== "object") {
      throw new Error("Atualizações inválidas ou não fornecidas.");
    }
    // Verifica se o registro existe antes de atualizar
    const validId = validateNumber(id, "usuario_id");
    if (!(await this.getById(validId))) {
      throw new Error("Usuário não encontrado.");
    }
    // Valida os dados conforme schema
    const camposValidos = cleanObject(updates);
    const validados = Usuario.validateBySchema(camposValidos);
    // Inserção no banco
    const { data, error } = await supabase
      .from("usuarios")
      .update(validados)
      .eq("id", validId)
      .select()
      .single();
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async delete(id) {
    const usuario = await UsuarioService.getById(
      validateNumber(id, "usuario_id")
    );
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    const { data, error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

module.exports = UsuarioService;
