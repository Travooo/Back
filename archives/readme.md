# 📝 Definições e Boas Práticas

### 📌 Convenções:

- **Classes**: Nome no **singular**, usando `PascalCase`  
  _Exemplo_: `UsuarioOrganizacao`
- **Outros elementos** (atributos, métodos, variáveis): `snake_case`  
  _Exemplo_: `get_id_agendamento`
- **Integer para IDs**: "Ideal para sistemas pequenos ou médios onde a quantidade de registros não ultrapassará 2 bilhões".

---

### 🔎 Observações Importantes:

1. **Construtores no JPA**

   - As classes possuem **construtores vazios** porque o JPA precisa de um **construtor sem argumentos** para instanciar entidades ao recuperar dados do banco.
   - Sem esse construtor, o JPA **não conseguiria criar o objeto antes de popular seus atributos**.
   - O construtor vazio é **`protected`**, evitando que a classe seja instanciada sem parâmetros, mas permitindo que o JPA o acesse.

   ## 🔐 Comparação de Modificadores de Acesso

| Modificador | Própria Classe | Mesmo Pacote | Subclasse (outro pacote) | Outras Classes |
| ----------- | -------------- | ------------ | ------------------------ | -------------- |
| `private`   | ✅ Sim         | ❌ Não       | ❌ Não                   | ❌ Não         |
| `protected` | ✅ Sim         | ✅ Sim       | ✅ Sim                   | ❌ Não         |
| `public`    | ✅ Sim         | ✅ Sim       | ✅ Sim                   | ✅ Sim         |

2. **Anotação `@Column`**
   - Se o nome do atributo já for **idêntico** ao nome da coluna no banco de dados, **não é necessário especificar** `"name"` em `@Column`.
   - Manter os nomes em **minúsculo** para evitar erros.

---
