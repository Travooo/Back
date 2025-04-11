package travo;

import jakarta.persistence.*;

@Entity
@Table(name = "planos")
public class Planos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_planos;

    @Column(nullable = false)
    private int tipo_pagamento;

    @ManyToOne
    @JoinColumn(name = "id_usuario") 
    private Usuario usuario;

    public Planos() {}

    public Planos(int id_planos, int tipo_pagamento, Usuario usuario) {
        this.id_planos = id_planos;
        this.tipo_pagamento = tipo_pagamento;
        this.usuario = usuario;
    }

    public int get_id_planos() {
        return id_planos;
    }

    public void set_id_planos(int id_planos) {
        this.id_planos = id_planos;
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