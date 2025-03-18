Os Services encapsulam a lógica de interação com o Supabase.

Diferença fundamental entre método estático assíncrono e método de instância assíncrono:

Método estático: Não depende de uma instância da classe. Ou seja, você chama o método diretamente na classe, sem precisar criar um objeto da classe.

class Exemplo {
static async fetchData() {
let response = await fetch('https://api.example.com/data');
let data = await response.json();
return data;
}
}

// Chama diretamente na classe, sem criar uma instância:
Exemplo.fetchData().then(data => console.log(data));

Método de instância: Depende de uma instância da classe. Você precisa criar um objeto para chamar esse método.

class Exemplo {
async fetchData() {
let response = await fetch('https://api.example.com/data');
let data = await response.json();
return data;
}
}

// Aqui, você precisa criar uma instância da classe:
const exemplo = new Exemplo();
exemplo.fetchData().then(data => console.log(data));
