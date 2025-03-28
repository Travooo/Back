package travo;

import jakarta.persistence.*;
import java.util.List;


@Entity
@Table(name = "estabelecimento")
public class Estabelecimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_estabelecimento;

    @OneToMany(mappedBy = "estabelecimento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Evento> eventos;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String sobre;

    @Column(nullable = false)
    private String endereco;

    @Lob
    @Column(name = "foto_local", columnDefinition = "BLOB")
    private byte[] foto_local; // ***Armazena o arquivo diretamente no banco***

    @Column(nullable = false)
    private String horarios;

    protected Estabelecimento() {}

    public Estabelecimento(String nome, String sobre, String endereco, byte[] foto_local, String horarios) {
        this.nome = nome;
        this.sobre = sobre;
        this.endereco = endereco;
        this.foto_local = foto_local;
        this.horarios = horarios;
    }

    public Integer get_id_estabelecimento() {
        return id_estabelecimento;
    }

    public void set_id_estabelecimento(Integer id_estabelecimento) {
        this.id_estabelecimento = id_estabelecimento;
    }

    public List<Evento> get_eventos() {
        return eventos;
    }

    public void set_eventos(List<Evento> eventos) {
        this.eventos = eventos;
    }

    public String get_nome() {
        return nome;
    }

    public void set_nome(String nome) {
        this.nome = nome;
    }

    public String get_sobre() {
        return sobre;
    }

    public void set_sobre(String sobre) {
        this.sobre = sobre;
    }

    public String get_endereco() {
        return endereco;
    }

    public void set_endereco(String endereco) {
        this.endereco = endereco;
    }

    public byte[] get_foto_local() {
        return foto_local;
    }

    public void set_foto_local(byte[] foto_local) {
        this.foto_local = foto_local;
    }

    public String get_horarios() {
        return horarios;
    }

    public void set_horarios(String horarios) {
        this.horarios = horarios;
    }
}