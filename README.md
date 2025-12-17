# API de Progressão de Alunos de Música – Testes de Performance com K6

## Visão Geral do Projeto

Este projeto consiste em uma **API REST** desenvolvida pelo professor Júlio de Lima e ajustada por mim para gerenciar e acompanhar a progressão de alunos de música. A aplicação permite que instrutores cadastrem lições e acompanhem o progresso dos alunos, enquanto os alunos podem se autenticar e consultar sua própria progressão.

Como **Trabalho de Conclusão da Disciplina**, foi implementado um **teste automatizado de performance utilizando o K6**, exercitando a API sob carga e aplicando diversos conceitos de testes de performance exigidos no desafio.

---

## Arquitetura da API

A API segue uma arquitetura em camadas:

```
controllers/   → Tratamento das requisições e respostas
routes/        → Definição dos endpoints
service/       → Regras de negócio
model/         → Estruturas de dados em memória
middleware/    → Autenticação e autorização com JWT
resources/     → Documentação Swagger
```

A aplicação utiliza **Express.js** e armazena os dados **em memória**, ou seja, os dados são reinicializados sempre que o servidor é reiniciado.

---

## Autenticação e Autorização

* A autenticação é realizada via **JWT (JSON Web Token)**
* Um middleware valida o token e o tipo de usuário
* **Instrutores** possuem acesso total às funcionalidades
* **Alunos** podem apenas consultar o próprio progresso

---

## Como Executar a API

```bash
npm install
node app.js
```

A API estará disponível em:

```
http://localhost:3000
```

Documentação Swagger:

```
http://localhost:3000/swagger
```

---

## Testes de Performance com K6

Os testes de performance estão localizados em:

```
test/k6/
```


### ✅ Stages

As *stages* definem como os usuários virtuais aumentam e diminuem durante a execução do teste.

**Arquivo:** `test/k6/config.js`

```js
export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 },
  ],
};
```

---

### ✅ Thresholds

Os *thresholds* definem limites aceitáveis de desempenho para o teste.

**Arquivo:** `test/k6/config.js`

```js
thresholds: {
  http_req_failed: ['rate < 0.2'],
  checks: ['rate > 0.99'],
},
```

* Permite até 20% de falhas HTTP (aceitável devido à concorrência e uso de memória)
* Exige que pelo menos 99% dos checks sejam bem-sucedidos

---

### ✅ Checks

Os *checks* validam a corretude funcional das respostas durante o teste de performance.

**Exemplo:** `test/k6/helpers/auth.helper.js`

```js
check(res, {
  'login do aluno retorna status 200': (r) => r.status === 200,
});
```

---

### ✅ Groups

Os *groups* organizam o fluxo do teste, separando as etapas lógicas da execução.

**Arquivo:** `test/k6/config.js`

```js
group('Cadastro de Aluno', () => {
  registerStudent(student);
});

group('Login do Aluno', () => {
  loginAsStudent(student.email, student.password);
});
```

---

### ✅ Helpers

Foram criadas funções auxiliares reutilizáveis para manter o código limpo e organizado.

* `auth.helper.js` → login do aluno
* `student.helper.js` → cadastro do aluno
* `data.helper.js` → geração dinâmica de dados

---

### ✅ Faker Manual (Geração Dinâmica de Dados)

Como o K6 não suporta pacotes NPM, o conceito de Faker foi implementado manualmente.

**Arquivo:** `test/k6/helpers/data.helper.js`

```js
export function generateStudent() {
  const timestamp = Date.now() + Math.floor(Math.random() * 1000);
  return {
    name: `Student ${timestamp}`,
    email: `student_${timestamp}@test.com`,
    password: '123456'
  };
}
```

Essa abordagem garante dados únicos para cada execução.

---

### ✅ Data-Driven Testing

Os dados de teste são gerados dinamicamente a cada iteração, permitindo múltiplos usuários virtuais com entradas diferentes, sem valores fixos no código.

---

### ✅ Uso de Token de Autenticação

Os tokens JWT retornados no login são reutilizados nas requisições autenticadas.

**Arquivo:** `test/k6/helpers/auth.helper.js`

```js
return `Bearer ${res.json().token}`;
```

---

### ✅ Reaproveitamento de Respostas

A resposta da autenticação é reaproveitada por meio da extração do token JWT para chamadas subsequentes.

---

### ✅ Variáveis de Ambiente

A URL base da API é configurável por variável de ambiente.

**Arquivo:** `test/k6/config/env.js`

```js
export const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
```

---

### ✅ Think Time (Delay entre Ações)

Um pequeno atraso foi adicionado para simular o comportamento real do usuário e evitar condições de corrida.

**Arquivo:** `test/k6/config.js`

```js
sleep(0.5);
```

---

## Relatório de Execução em HTML

O relatório de execução em HTML é gerado diretamente pelo K6 utilizando a função `handleSummary`.

**Arquivo:** `test/k6/config.js`

```js
export function handleSummary(data) {
  return {
    'reports/relatorio-execucao.html': generateHtmlReport(data),
  };
}
```

Essa abordagem elimina dependências externas e garante portabilidade do relatório.

---

## ▶️ Como Executar o Teste de Performance

1. Inicie a API:

```bash
node app.js
```

2. Execute o teste de performance:

```bash
k6 run test/k6/config.js
```

3. Abra o relatório HTML gerado:

```
reports/relatorio-execucao.html
```

---

## Considerações Finais

* O teste simula cenários realistas de concorrência
* Pequenas falhas HTTP são esperadas devido ao armazenamento em memória
* Todos os checks funcionais foram executados com sucesso

Este projeto demonstra não apenas a execução de testes de performance, mas também a validação da API sob carga, reforçando a importância dos testes de performance como parte essencial da qualidade do software.

