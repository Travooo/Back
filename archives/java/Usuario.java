package travo;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer id_usuario;

    @Column(nullable = false)
    private boolean admin;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String senha;

    @Column(nullable = false, length = 50)
    private String nome_usuario;

    @Column(nullable = false, length = 100)
    private String nome_completo;

    @Column(columnDefinition = "TEXT")
    private String sobre;

    @Lob
    @Column(name = "foto_perfil")
    private byte[] foto_perfil;

    @Column(name = "data_nascimento", nullable = false)
    private LocalDate data_nascimento;

    public Usuario() {}

    public Usuario(Integer id_usuario, boolean admin, String email, String senha, String nome_usuario, 
                   String nome_completo, String sobre, byte[] foto_perfil, LocalDate data_nascimento) {
        this.id_usuario = id_usuario;
        this.admin = admin;
        this.email = email;
        this.senha = senha;
        this.nome_usuario = nome_usuario;
        this.nome_completo = nome_completo;
        this.sobre = sobre;
        this.foto_perfil = foto_perfil;
        this.data_nascimento = data_nascimento;
    }

    public Integer get_id_usuario() {
        return id_usuario;
    }

    public void set_id_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public boolean is_admin() {
        return admin;
    }

    public void set_admin(boolean admin) {
        this.admin = admin;
    }

    public String get_email() {
        return email;
    }

    public void set_email(String email) {
        this.email = email;
}

    public String get_senha() {
        return senha;
    }

    public void set_senha(String senha) {
        this.senha = senha;
    }

    public String get_nome_usuario() {
        return nome_usuario;
    }

    public void set_nome_usuario(String nome_usuario) {
        this.nome_usuario = nome_usuario;
    }

    public String get_nome_completo() {
        return nome_completo;
    }

    public void set_nome_completo(String nome_completo) {
        this.nome_completo = nome_completo;
    }

    public String get_sobre() {
        return sobre;
    }

    public void set_sobre(String sobre) {
        this.sobre = sobre;
    }

    public byte[] get_foto_perfil() {
        return foto_perfil;
    }

    public void set_foto_perfil(byte[] foto_perfil) {
        this.foto_perfil = foto_perfil;
    }

    public LocalDate get_data_nascimento() {
        return data_nascimento;
    }

    public void set_data_nascimento(LocalDate data_nascimento) {
        this.data_nascimento = data_nascimento;
    }
}