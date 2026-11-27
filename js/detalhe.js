renderizarNavbar('lista');

const idPonto = lerParametro('id');
const elCarregando = document.getElementById('carregando');
const secaoErro = document.getElementById('secao-erro');
const elErro = document.getElementById('erro');
const secaoDetalhe = document.getElementById('secao-detalhe');

let ponto = null;

function mostrarErro(mensagem) {
  elErro.textContent = mensagem;
  mostrar(secaoErro, true);
}

function preencherTela() {
  document.title = `${ponto.name} · GeoPoint`;
  document.getElementById('nome').textContent = ponto.name;
  document.getElementById('descricao').textContent = ponto.description || '—';
  document.getElementById('latitude').textContent = formatarCoordenada(ponto.latitude);
  document.getElementById('longitude').textContent = formatarCoordenada(ponto.longitude);
  document.getElementById('codigo').textContent = ponto.id;
  document.getElementById('btn-editar').href = `formulario.html?id=${encodeURIComponent(ponto.id)}`;
  mostrar(secaoDetalhe, true);
}

async function carregar() {
  if (!idPonto) {
    mostrar(elCarregando, false);
    mostrarErro('Nenhum ponto informado na URL.');
    return;
  }
  try {
    ponto = await buscarPonto(idPonto);
    preencherTela();
  } catch (e) {
    mostrarErro(e.message);
  } finally {
    mostrar(elCarregando, false);
  }
}

document.getElementById('btn-excluir').addEventListener('click', async () => {
  if (!(await confirmarExclusao(ponto.name))) return;
  try {
    await excluirPonto(idPonto);
    window.location.href = 'index.html';
  } catch (e) {
    alert(`Erro ao excluir: ${e.message}`);
  }
});

carregar();
