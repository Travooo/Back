package travo;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "conexao")
public class Conexao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_conexao;

    @ManyToOne
    @JoinColumn(name = "id_usuario1", nullable = false)
    private Usuario usuario1;

    @ManyToOne
    @JoinColumn(name = "id_usuario2", nullable = false)
    private Usuario usuario2;

    @Column(nullable = false)
    private LocalDate data_conexao;

    // Construtor padrão
    protected Conexao() {}

    // Construtor personalizado
    public Conexao(Usuario usuario1, Usuario usuario2, LocalDate data_conexao) {
        this.usuario1 = usuario1;
        this.usuario2 = usuario2;
        this.data_conexao = data_conexao;
    }

    public Integer get_id_conexao() {
        return id_conexao;
    }

    public void set_id_conexao(Integer id_conexao) {
        this.id_conexao = id_conexao;
    }

    public Usuario get_usuario1() {
        return usuario1;
    }

    public void set_usuario1(Usuario usuario1) {
        this.usuario1 = usuario1;
    }

    public Usuario get_usuario2() {
        return usuario2;
    }

    public void set_usuario2(Usuario usuario2) {
        this.usuario2 = usuario2;
    }

    public LocalDate get_data_conexao() {
        return data_conexao;
    }

    public void set_data_conexao(LocalDate data_conexao) {
        this.data_conexao = data_conexao;
    }
}
