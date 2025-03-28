package travo;

import jakarta.persistence.*;

@Entity
@Table(name = "pagamento")
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_pagamento;

    @Column(nullable = false)
    private int tipo_pagamento;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    public Pagamento() {}

    public Pagamento(int id_pagamento, int tipo_pagamento, Usuario usuario) {
        this.id_pagamento = id_pagamento;
        this.tipo_pagamento = tipo_pagamento;
        this.usuario = usuario;
    }
    
    public int get_id_pagamento() {
        return id_pagamento;
    }
    
    public void set_id_pagamento(int id_pagamento) {
        this.id_pagamento = id_pagamento;
    }
    
    public int get_tipo_pagamento() {
        return tipo_pagamento;
    }
    
    public void set_tipo_pagamento(int tipo_pagamento) {
        this.tipo_pagamento = tipo_pagamento;
    }
    
    public Usuario get_usuario() {
        return usuario;
    }
    
    public void set_usuario(Usuario usuario) {
        this.usuario = usuario;
    }
}