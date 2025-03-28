package travo;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario_organizacao")
public class UsuarioOrganizacao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario_organizacao")
    private int id_usuario_organizacao;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(nullable = false, length = 18)
    private String cnpj;

    @Column(nullable = false, length = 100)
    private String nome_fantasia;

    @Column(nullable = false, length = 255)
    private String endereco;

    public UsuarioOrganizacao() {}

    public UsuarioOrganizacao(int id_usuario_organizacao, Usuario usuario, String cnpj, String nome_fantasia, String endereco) {
        this.id_usuario_organizacao = id_usuario_organizacao;
        this.usuario = usuario;
        this.cnpj = cnpj;
        this.nome_fantasia = nome_fantasia;
        this.endereco = endereco;
    }

    public int get_id_usuario_organizacao() {
        return id_usuario_organizacao;
    }

    public void set_id_usuario_organizacao(int id_usuario_organizacao) {
        this.id_usuario_organizacao = id_usuario_organizacao;
    }

    public String get_cnpj() {
        return cnpj;
    }

    public void set_cnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String get_nome_fantasia() {
        return nome_fantasia;
    }

    public void set_nome_fantasia(String nome_fantasia) {
        this.nome_fantasia = nome_fantasia;
    }

    public String get_endereco() {
        return endereco;
    }

    public void set_endereco(String endereco) {
        this.endereco = endereco;
    }
}
