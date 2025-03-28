package travo;

import jakarta.persistence.*;

@Entity
@Table(name = "notificacoes")
class Notificacoes{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_notificacoes;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    public Notificacoes() {}

    public Notificacoes(int id_notificacoes, String titulo, String descricao, Usuario usuario) {
        this.id_notificacoes = id_notificacoes;
        this.titulo = titulo;
        this.descricao = descricao;
        this.usuario = usuario;
    }    

    public void set_id_notificacoes(int id_notificacoes) {
        this.id_notificacoes = id_notificacoes;
    }

    public String get_titulo() {
        return titulo;
    }

    public void set_titulo(String titulo) {
        this.titulo = titulo;
    }

    public String get_descricao() {
        return descricao;
    }

    public void set_descricao(String descricao) {
        this.descricao = descricao;
    }

    public Usuario get_usuario() {
        return usuario;
    }

    public void set_usuario(Usuario usuario) {
        this.usuario = usuario;
    }
}