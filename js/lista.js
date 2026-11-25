renderizarNavbar('lista');

const campoFiltro = document.getElementById('campo-filtro');
const elCarregando = document.getElementById('carregando');
const elErro = document.getElementById('erro');
const elVazio = document.getElementById('vazio');
const tabela = document.getElementById('tabela');
const corpoTabela = document.getElementById('corpo-tabela');

let pontos = [];

function pontosFiltrados() {
  const termo = campoFiltro.value.trim().toLowerCase();
  if (!termo) return pontos;
  return pontos.filter((p) =>
    p.name.toLowerCase().includes(termo) ||
    (p.description || '').toLowerCase().includes(termo)
  );
}

function render() {
  const visiveis = pontosFiltrados();
  corpoTabela.replaceChildren(...visiveis.map((p) => criarLinhaPonto(p, handleExcluir)));
  mostrar(tabela, visiveis.length > 0);
  mostrar(elVazio, visiveis.length === 0);
}

async function carregar() {
  try {
    pontos = await listarPontos();
    render();
  } catch (e) {
    elErro.textContent = `Não foi possível carregar os pontos: ${e.message}`;
    mostrar(elErro, true);
  } finally {
    mostrar(elCarregando, false);
  }
}

async function handleExcluir(ponto) {
  if (!confirm(`Excluir "${ponto.name}"?`)) return;
  try {
    await excluirPonto(ponto.id);
    pontos = pontos.filter((p) => p.id !== ponto.id);
    render();
  } catch (e) {
    alert(`Erro ao excluir: ${e.message}`);
  }
}

campoFiltro.addEventListener('input', render);
document.getElementById('form-filtro').addEventListener('submit', (e) => e.preventDefault());
carregar();
