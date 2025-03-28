package travo;

import jakarta.persistence.*;

@Entity
@Table(name = "favorito")
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_favorito;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_estabelecimento", nullable = false)
    private Estabelecimento estabelecimento;

    protected Favorito() {}

    public Favorito(Usuario usuario, Estabelecimento estabelecimento) {
        this.usuario = usuario;
        this.estabelecimento = estabelecimento;
    }

    public int get_id_favorito() {
        return id_favorito;
    }

    public void set_id_favorito(int id_favorito) {
        this.id_favorito = id_favorito;
    }

    public Usuario get_usuario() {
        return usuario;
    }

    public void set_usuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Estabelecimento get_estabelecimento() {
        return estabelecimento;
    }

    public void set_estabelecimento(Estabelecimento estabelecimento) {
        this.estabelecimento = estabelecimento;
    }
}