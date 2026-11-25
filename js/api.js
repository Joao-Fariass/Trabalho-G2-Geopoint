const API_URL = 'http://localhost:8080';
const RECURSO = '/api/points';

async function requisicao(caminho = '', opcoes = {}) {
  let resposta;
  try {
    resposta = await fetch(`${API_URL}${RECURSO}${caminho}`, {
      headers: { 'Content-Type': 'application/json' },
      ...opcoes
    });
  } catch {
    throw new Error('Não foi possível conectar à API. Verifique se ela está rodando.');
  }

  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => ({}));
    const mensagem = corpo.message || corpo.erro || corpo.error || corpo.erros?.join(', ');
    throw new Error(mensagem || `Erro ${resposta.status}`);
  }

  if (resposta.status === 204) return null;
  return resposta.json();
}

const listarPontos = () => requisicao();
const buscarPonto = (id) => requisicao(`/${encodeURIComponent(id)}`);
const criarPonto = (ponto) => requisicao('', { method: 'POST', body: JSON.stringify(ponto) });
const atualizarPonto = (id, ponto) =>
  requisicao(`/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(ponto) });
const excluirPonto = (id) => requisicao(`/${encodeURIComponent(id)}`, { method: 'DELETE' });


function lerParametro(nome) {
  return new URLSearchParams(window.location.search).get(nome);
}

function mostrar(elemento, visivel) {
  elemento.classList.toggle('escondido', !visivel);
}

function formatarCoordenada(valor) {
  return Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: 4, maximumFractionDigits: 6 });
}
