<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>K6 Performance Tests – Documentation</title>
</head>
<body>

<h1>Teste de Performance com K6 – Music Students Progression API</h1>

<h2>Conceitos Aplicados</h2>

<h3>Groups e Helpers</h3>
<p>
O código abaixo está armazenado no arquivo
<code>test/k6/scenarios/consultaProgresso.performance.js</code>
e demonstra o uso do conceito de <strong>Groups</strong>.  
Dentro do grupo é utilizado um <strong>Helper</strong>, responsável por realizar a autenticação do aluno,
importado de outro arquivo JavaScript.
</p>

<pre><code>
group('Consulta de progresso do aluno', () =&gt; {
  const aluno = getAluno();
  const token = autenticarAluno(aluno.email, aluno.password);
});
</code></pre>

<hr>

<h3>Uso de Token de Autenticação</h3>
<p>
O código abaixo está armazenado no arquivo
<code>test/k6/scenarios/consultaProgresso.performance.js</code>
e demonstra o uso de <strong>Token de Autenticação</strong>, enviando o JWT no header Authorization
para acesso a um endpoint protegido da API.
</p>

<pre><code>
const response = http.get(`${BASE_URL}/progresso/me`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
</code></pre>

<hr>

<h3>Reaproveitamento de Resposta</h3>
<p>
O código abaixo está armazenado no arquivo
<code>test/k6/helpers/auth.helper.js</code>
e demonstra o conceito de <strong>Reaproveitamento de Resposta</strong>,
onde o token JWT retornado pela API é armazenado em cache e reutilizado durante a execução do teste.
</p>

<pre><code>
let cachedToken;

if (cachedToken) return cachedToken;
</code></pre>

<hr>

<h3>Data-Driven Testing</h3>
<p>
O código abaixo está armazenado no arquivo
<code>test/k6/helpers/data.helper.js</code>
e demonstra o uso do conceito de <strong>Data-Driven Testing</strong>,
utilizando um arquivo JSON externo como massa de dados.
</p>

<pre><code>
const alunos = new SharedArray('alunos', () =&gt;
  JSON.parse(open('../data/alunos.json'))
);
</code></pre>

<hr>

<h3>Faker</h3>
<p>
O código abaixo está armazenado no arquivo
<code>test/k6/helpers/data.helper.js</code>
e demonstra o uso da biblioteca <strong>Faker</strong> para geração dinâmica de dados.
</p>

<pre><code>
faker.internet.email();
</code></pre>

<hr>

<h3>Thresholds</h3>
<p>
O código abaixo está armazenado no arquivo
<code>test/k6/scenarios/consultaProgresso.performance.js</code>
e demonstra o uso de <strong>Thresholds</strong>,
definindo limites máximos aceitáveis de performance.
</p>

<pre><code>
thresholds: {
  http_req_duration: ['p(95)&lt;800'],
  consulta_progresso_duration: ['avg&lt;500']
}
</code></pre>

<hr>

<h3>Checks</h3>
<p>
O código abaixo está armazenado no arquivo
<code>test/k6/scenarios/consultaProgresso.performance.js</code>
e demonstra o uso de <strong>Checks</strong>,
validando o status da resposta e o conteúdo retornado pela API.
</p>

<pre><code>
check(response, {
  'status 200': r =&gt; r.status === 200,
  'retorna progresso': r =&gt; r.body !== null
});
</code></pre>

<hr>

<h3>Trends</h3>
<p>
O código abaixo está armazenado no arquivo
<code>test/k6/scenarios/consultaProgresso.performance.js</code>
e demonstra o uso de <strong>Trends</strong>,
criando uma métrica customizada para medir o tempo de resposta do endpoint.
</p>

<pre><code>
export const progressoTrend = new Trend('consulta_progresso_duration');
</code></pre>

<hr>

<h3>Variável de Ambiente</h3>
<p>
O código abaixo está armazenado no arquivo
<code>test/k6/config.js</code>
e demonstra o uso de <strong>Variável de Ambiente</strong>
para configurar a URL base da API.
</p>

<pre><code>
export const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
</code></pre>

<hr>

<h3>Stages</h3>
<p>
O código abaixo está armazenado no arquivo
<code>test/k6/scenarios/consultaProgresso.performance.js</code>
e demonstra o uso de <strong>Stages</strong>
para simular diferentes níveis de carga durante o teste.
</p>

<pre><code>
stages: [
  { duration: '10s', target: 5 },
  { duration: '20s', target: 10 },
  { duration: '10s', target: 0 }
]
</code></pre>

</body>
</html>
