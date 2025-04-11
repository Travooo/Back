package travo;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "local_visitado")
public class LocalVisitado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_local_visitado;

    @ManyToOne
    @JoinColumn(name = "id_estabelecimento", nullable = false)
    private Estabelecimento estabelecimento;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Column(nullable = false)
    private LocalDate data_visita;

    protected LocalVisitado(){}

    public LocalVisitado(Estabelecimento estabelecimento, Usuario usuario, LocalDate data_visita) {
        this.estabelecimento = estabelecimento;
        this.usuario = usuario;
        this.data_visita = data_visita;
    }
    
    public int get_id_local_visitado() {
        return id_local_visitado;
    }

    public void set_id_local_visitado(int id_local_visitado) {
        this.id_local_visitado = id_local_visitado;
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

    public LocalDate get_data_visita() {
        return data_visita;
    }

    public void set_data_visita(LocalDate data_visita) {
        this.data_visita = data_visita;
    }
}