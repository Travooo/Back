package travo;

import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
@Table(name = "evento")
class Evento{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_evento;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable= false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_usuario_organizacao")
    private UsuarioOrganizacao usuario_organizacao;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private LocalDate data;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    protected Evento(){}

    public Evento(Usuario usuario, UsuarioOrganizacao usuario_organizacao, String nome, LocalDate data, String descricao) {
        this.usuario = usuario;
        this.usuario_organizacao = usuario_organizacao;
        this.nome = nome;
        this.data = data;
        this.descricao = descricao;
    }

    public int get_id_evento() {
        return id_evento;
    }

    public void set_id_evento(int id_evento) {
        this.id_evento = id_evento;
    }

    public Usuario get_usuario() {
        return usuario;
    }

    public void set_usuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public UsuarioOrganizacao get_usuario_organizacao() {
        return usuario_organizacao;
    }

    public void set_usuario_organizacao(UsuarioOrganizacao usuario_organizacao) {
        this.usuario_organizacao = usuario_organizacao;
    }

    public String get_nome() {
        return nome;
    }

    public void set_nome(String nome) {
        this.nome = nome;
    }

    public LocalDate get_data() {
        return data;
    }

    public void set_data(LocalDate data) {
        this.data = data;
    }

    public String get_descricao() {
        return descricao;
    }

    public void set_descricao(String descricao) {
        this.descricao = descricao;
    }
}