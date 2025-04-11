package travo;

import jakarta.persistence.*;

@Entity
@Table(name = "cupom")
public class Cupom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_cupom;

    @ManyToOne
    @JoinColumn(name = "id_estabelecimento", nullable = false)
    private Estabelecimento estabelecimento;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private String descricao;

    protected Cupom() {}

    public Cupom(Estabelecimento estabelecimento, Usuario usuario, String descricao) {
        this.estabelecimento = estabelecimento;
        this.usuario = usuario;
        this.descricao = descricao;
    }

    public Integer get_id_cupom() {
        return id_cupom;
    }

    public void set_id_cupom(Integer id_cupom) {
        this.id_cupom = id_cupom;
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

    public String get_descricao() {
        return descricao;
    }

    public void set_descricao(String descricao) {
        this.descricao = descricao;
    }
}