package travo;

import jakarta.persistence.*;

@Entity
@Table(name = "avaliacao")
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_avaliacao;

    @ManyToOne
    @JoinColumn(name = "id_estabelecimento", nullable = false)
    private Estabelecimento estabelecimento;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(length = 45)
    private String comentario; 

    @Column(nullable = false)
    private Integer numero_estrelas;

    protected Avaliacao() {}

    public Avaliacao(Estabelecimento estabelecimento, Usuario usuario, String comentario, Integer numero_estrelas) {
      this.estabelecimento = estabelecimento;
      this.usuario = usuario;
      this.comentario = comentario;
      this.numero_estrelas = numero_estrelas;
    }

    public Integer get_id_avaliacao() {
      return id_avaliacao;
    } 

    public void set_id_avaliacao(Integer id_avaliacao) {
      this.id_avaliacao = id_avaliacao;
    }

    public Estabelecimento get_estabelecimento() {
        return estabelecimento;
    }

    public void set_estabelecimento(Estabelecimento estabelecimento) {
        this.estabelecimento = estabelecimento;
    }

    public Usuario get_usuario() {
        return usuario;
    }

    public void set_usuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String get_comentario() {
        return comentario;
    }

    public void set_comentario(String comentario) {
        this.comentario = comentario;
    }

    public Integer get_numero_estrelas() {
        return numero_estrelas;
    }

    public void set_numero_estrelas(Integer numero_estrelas) {
        this.numero_estrelas = numero_estrelas;
    }
}