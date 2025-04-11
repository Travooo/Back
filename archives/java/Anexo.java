package travo;

import jakarta.persistence.*;

@Entity
@Table(name = "anexo")
public class Anexo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_anexo;

    @ManyToOne
    @JoinColumn(name = "id_estabelecimento", nullable = false)
    private Estabelecimento estabelecimento;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] arquivo; // ***Armazena o arquivo diretamente no banco***

    @Column
    private String nome_arquivo;

    @Column
    private String tipo_arquivo; // Exemplo: "application/pdf"

    // Getters e Setters
    public Integer get_id() {
        return id_anexo;
    }

    public void set_id(Integer id_anexo) {
        this.id_anexo = id_anexo;
    }

    public Estabelecimento get_estabelecimento() {
        return estabelecimento;
    }

    public void set_estabelecimento(Estabelecimento estabelecimento) {
        this.estabelecimento = estabelecimento;
    }

    public byte[] get_arquivo() {
        return arquivo;
    }

    public void set_arquivo(byte[] arquivo) {
        this.arquivo = arquivo;
    }

    public String get_nome_arquivo() {
        return nome_arquivo;
    }

    public void set_nome_arquivo(String nome_arquivo) {
        this.nome_arquivo = nome_arquivo;
    }

    public String get_tipo_arquivo() {
        return tipo_arquivo;
    }

    public void set_tipo_arquivo(String tipo_arquivo) {
        this.tipo_arquivo = tipo_arquivo;
    }
}   