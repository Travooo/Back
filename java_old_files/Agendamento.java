package travo;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "agendamento")
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer id_agendamento;

    @ManyToOne
    @JoinColumn(name = "id_estabelecimento", nullable = false)
    private Estabelecimento estabelecimento;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private LocalDateTime horario;

    @Column(length = 45)
    private String mesa;

    protected Agendamento() {}

    public Agendamento(Estabelecimento estabelecimento, Usuario usuario, LocalDateTime horario, String mesa) {
        //Não é necessário incluir "id_agendamento" porque ele será atribuído pelo banco de dados ao persistir a entidade.
        this.estabelecimento = estabelecimento;
        this.usuario = usuario;
        this.horario = horario;
        this.mesa = mesa;
    }

    public Integer get_id_agendamento() {
        return id_agendamento;
    }

    public void set_id_agendamento(Integer id_agendamento) {
        this.id_agendamento = id_agendamento;
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

    public LocalDateTime get_horario() {
        return horario;
    }

    public void set_horario(LocalDateTime horario) {
        this.horario = horario;
    }

    public String get_mesa() {
        return mesa;
    }

    public void set_mesa(String mesa) {
        this.mesa = mesa;
    }
}