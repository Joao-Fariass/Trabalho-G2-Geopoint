const idPonto = lerParametro('id');
const editando = Boolean(idPonto);
renderizarNavbar(editando ? 'lista' : 'novo');

const form = document.getElementById('form-ponto');
const titulo = document.getElementById('titulo');
const elErro = document.getElementById('erro');
const elCarregando = document.getElementById('carregando');
const secaoForm = document.getElementById('secao-form');
const btnSalvar = document.getElementById('btn-salvar');
const textoBotao = editando ? 'Salvar alterações' : 'Cadastrar';

function mostrarErro(mensagem) {
  elErro.textContent = mensagem;
  mostrar(elErro, Boolean(mensagem));
}

function preencherFormulario(ponto) {
  for (const campo of ['name', 'description', 'latitude', 'longitude']) {
    form.elements[campo].value = ponto[campo] ?? '';
  }
}

function lerFormulario() {
  const dados = Object.fromEntries(new FormData(form));
  return {
    name: dados.name.trim(),
    description: dados.description.trim(),
    latitude: Number(dados.latitude),
    longitude: Number(dados.longitude)
  };
}

function validar(d, textoLat, textoLon) {
  if (!d.name) return 'Informe o nome do ponto.';
  if (d.name.length > 100) return 'O nome deve ter no máximo 100 caracteres.';
  if (d.description.length > 255) return 'A descrição deve ter no máximo 255 caracteres.';
  if (textoLat.trim() === '' || Number.isNaN(d.latitude)) return 'Informe uma latitude válida.';
  if (d.latitude < -90 || d.latitude > 90) return 'A latitude deve estar entre -90 e 90.';
  if (textoLon.trim() === '' || Number.isNaN(d.longitude)) return 'Informe uma longitude válida.';
  if (d.longitude < -180 || d.longitude > 180) return 'A longitude deve estar entre -180 e 180.';
  return '';
}

async function iniciar() {
  btnSalvar.textContent = textoBotao;

  if (!editando) {
    mostrar(secaoForm, true);
    return;
  }

  titulo.textContent = 'Editar ponto';
  document.title = 'Editar ponto · GeoPoint';
  mostrar(elCarregando, true);
  try {
    preencherFormulario(await buscarPonto(idPonto));
    mostrar(secaoForm, true);
  } catch (e) {
    mostrarErro(e.message);
    mostrar(secaoForm, true);
    btnSalvar.disabled = true; 
  } finally {
    mostrar(elCarregando, false);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  mostrarErro('');

  const dados = lerFormulario();
  const erro = validar(dados, form.elements.latitude.value, form.elements.longitude.value);
  if (erro) {
    mostrarErro(erro);
    return;
  }

  try {
    btnSalvar.disabled = true; 
    btnSalvar.textContent = 'Salvando...';
    if (editando) await atualizarPonto(idPonto, dados);
    else await criarPonto(dados);
    window.location.href = 'index.html';
  } catch (e) {
    mostrarErro(e.message);
    btnSalvar.disabled = false;
    btnSalvar.textContent = textoBotao;
  }
});

iniciar();
