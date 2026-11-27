function criarBotao(texto, acao, classe = '') {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = classe;
  botao.textContent = texto;
  botao.addEventListener('click', acao);
  return botao;
}

function criarLinkBotao(texto, href, classe = '') {
  const link = document.createElement('a');
  link.href = href;
  link.className = `botao ${classe}`.trim();
  link.textContent = texto;
  return link;
}

function criarCelula(rotulo, conteudo) {
  const td = document.createElement('td');
  td.dataset.rotulo = rotulo; 
  if (conteudo instanceof Node) td.appendChild(conteudo);
  else td.textContent = conteudo;
  return td;
}

function criarLinhaPonto(ponto, onExcluir) {
  const tr = document.createElement('tr');

  const linkNome = document.createElement('a');
  linkNome.href = `ponto.html?id=${encodeURIComponent(ponto.id)}`;
  linkNome.textContent = ponto.name;

  const acoes = document.createElement('div');
  acoes.className = 'acoes';
  acoes.append(
    criarLinkBotao('Ver', `ponto.html?id=${encodeURIComponent(ponto.id)}`, 'secundario'),
    criarLinkBotao('Editar', `formulario.html?id=${encodeURIComponent(ponto.id)}`, 'secundario'),
    criarBotao('Excluir', () => onExcluir(ponto), 'perigo')
  );

  tr.append(
    criarCelula('Nome', linkNome),
    criarCelula('Descrição', ponto.description || '—'),
    criarCelula('Latitude', formatarCoordenada(ponto.latitude)),
    criarCelula('Longitude', formatarCoordenada(ponto.longitude)),
    criarCelula('Ações', acoes)
  );
  return tr;
}

function criarLetra(texto, destaque) {
  const span = document.createElement('span');
  span.textContent = texto;
  if (destaque) span.className = 'destaque';
  return span;
}


function criarNavbar(ativa) {
  const logo = document.createElement('a');
  logo.href = 'index.html';
  logo.className = 'logo';
  logo.append(criarLetra('G', true), 'eo', criarLetra('P', true), 'oint');

  const linkLista = document.createElement('a');
  linkLista.href = 'index.html';
  linkLista.textContent = 'Pontos';
  linkLista.classList.toggle('active', ativa === 'lista');

  const linkNovo = document.createElement('a');
  linkNovo.href = 'formulario.html';
  linkNovo.textContent = 'Novo ponto';
  linkNovo.classList.toggle('active', ativa === 'novo');

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Principal');
  nav.append(linkLista, linkNovo);

  return [logo, nav];
}

function renderizarNavbar(ativa) {
  document.getElementById('navbar').append(...criarNavbar(ativa));
}

function confirmarExclusao(nome) {
  return new Promise((resolve) => {
    const fundo = document.createElement('div');
    fundo.className = 'modal-fundo';

    const caixa = document.createElement('div');
    caixa.className = 'modal';

    const texto = document.createElement('p');
    texto.textContent = `Excluir "${nome}"?`;

    function fechar(resposta) {
      fundo.remove();
      resolve(resposta);
    }

    const acoes = document.createElement('div');
    acoes.className = 'acoes';
    acoes.append(
      criarBotao('Cancelar', () => fechar(false), 'secundario'),
      criarBotao('Excluir', () => fechar(true), 'perigo')
    );

    caixa.append(texto, acoes);
    fundo.appendChild(caixa);
    document.body.appendChild(fundo);
  });
}