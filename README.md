# Livro de Ouro - Instituto Hesed (Mosteiro Nossa Senhora do Carmo)

Este é o repositório do "Livro de Ouro" digital para o Instituto Hesed - Mosteiro Nossa Senhora do Carmo. O projeto é uma aplicação web estática ("Single Page Application" simplificada) que simula um livro físico, permitindo ao usuário folhear as páginas em um ambiente 3D/2D interativo.

## 💻 Sobre o Projeto

O objetivo do projeto é exibir de forma elegante os nomes dos benfeitores e contribuintes no Livro de Ouro. Ele utiliza a biblioteca **turn.js** para criar a animação e interatividade de "virar as páginas" como em um livro real. 

### Principais Tecnologias e Bibliotecas

- **HTML5 / CSS3**: Estrutura e estilização das páginas do livro.
- **JavaScript**: Lógica de interação, paginação e carregamento dinâmico.
- **jQuery**: Manipulação de DOM e facilitação no uso de plugins.
- **turn.js**: Biblioteca principal responsável pelo efeito visual das páginas folheadas.
- **Font Awesome**: Ícones utilizados na interface.

## 📂 Estrutura do Repositório

A estrutura de diretórios foi pensada de maneira simplificada, sem necessidade de ferramentas de build complexas:

- `index.html`: O ponto de entrada da aplicação. Contém a estrutura básica do livro.
- `App_Data/`: Contém os dados dos nomes que compõem o livro.
  - `People.js` / `People.json`: Lista de pessoas (benfeitores) em formato JSON/JS, que são renderizadas nas páginas do livro.
- `Content/`: Arquivos de folha de estilo (CSS).
  - `style.css`: Estilização principal do livro e páginas.
  - Demais arquivos de formatação visual e tipografia.
- `Scripts/`: Scripts e bibliotecas de terceiros (jQuery, turn.js, etc).
  - `onload.js`: Script de inicialização e configuração do livro (tamanho, comportamento).
- `img/`: Imagens e assets estáticos (texturas do livro, background, logotipos).
- `fonts/`: Fontes personalizadas (ex: "Angista Script" para simular escrita à mão).

## 🚀 Como Executar Localmente

Sendo um site puramente estático, não há necessidade de Node.js, npm, ou frameworks de backend. 

1. Clone o repositório.
2. É recomendado utilizar um servidor local simples para evitar bloqueios de CORS ao carregar recursos e arquivos locais (embora o turn.js possa funcionar abrindo diretamente no navegador dependendo da versão).
   - Se possuir Python, rode no terminal: `python -m http.server 8000` (ou `python3 -m http.server 8000`).
   - Outras alternativas incluem a extensão *Live Server* do VSCode ou `npx serve`.
3. Acesse `http://localhost:8000` (ou a porta fornecida) em seu navegador.

## ⚙️ Manutenção de Dados

Para adicionar ou remover nomes do "Livro de Ouro", basta editar o arquivo `App_Data/People.js` (ou `People.json`). Os dados estão em uma estrutura de array de objetos com propriedades como `Id`, `Number` e `Name`. A renderização nas páginas acontece dinamicamente através do script.

