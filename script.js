// Definição dos tipos de navios disponíveis - DEVE VIR PRIMEIRO
const tiposNavios = {
    'navio-guerra': {
        nome: 'Navio de Guerra',
        opcoes: [
            { id: 'fragata-niteroi', nome: 'Fragata Classe Niterói', imagem: 'images/ships/fragata-niteroi.png' },
            { id: 'corveta-barroso', nome: 'Corveta Classe Barroso', imagem: 'images/ships/corveta-barroso.png' },
            { id: 'npaoc-amazonas', nome: 'NPaOc Amazonas', imagem: 'images/ships/npaoc-amazonas.png' }
        ]
    },
    'mercante': {
        nome: 'Navio Mercante',
        opcoes: [
            { id: 'mercante-container', nome: 'Navio Porta-Contêiner', imagem: 'images/ships/container.png' },
            { id: 'mercante-petroleiro', nome: 'Navio Petroleiro', imagem: 'images/ships/petroleiro.png' },
            { id: 'mercante-graneleiro', nome: 'Navio Graneleiro', imagem: 'images/ships/graneleiro.png' }
        ]
    },
    'aeronave': {
        nome: 'Aeronave',
        opcoes: [
            { id: 'p3-orion', nome: 'P-3 Orion', imagem: 'images/ships/p3-orion.png' },
            { id: 'c130', nome: 'C-130 Hércules', imagem: 'images/ships/c130.png' }
        ]
    },
    'pesqueiro': {
        nome: 'Pesqueiro',
        opcoes: [
            { id: 'pesqueiro-pequeno', nome: 'Pesqueiro Pequeno', imagem: 'images/ships/pesqueiro-pequeno.png' },
            { id: 'pesqueiro-medio', nome: 'Pesqueiro Médio', imagem: 'images/ships/pesqueiro-medio.png' }
        ]
    },
    'rebocador': {
        nome: 'Rebocador',
        opcoes: [
            { id: 'rebocador-portuario', nome: 'Rebocador Portuário', imagem: 'images/ships/rebocador-portuario.png' },
            { id: 'rebocador-oceanico', nome: 'Rebocador Oceânico', imagem: 'images/ships/rebocador-oceanico.png' }
        ]
    }
};

// Função para criar um novo card de navio-alvo
function criarNovoNavioAlvo() {
    const container = document.getElementById('naviosDisponiveis');
    const navioId = Date.now(); // ID único para o novo navio
    
    const navioCard = document.createElement('div');
    navioCard.className = 'ship-card';
    navioCard.id = `navio-${navioId}`;
    
    navioCard.innerHTML = `
        <div class="ship-header">
            <h4>Navio Alvo #${container.children.length + 1}</h4>
            <button type="button" class="btn-remover" onclick="removerNavioAlvo('${navioId}')">×</button>
        </div>
        <div class="ship-content">
            <div class="form-group">
                <label>Tipo de Alvo:</label>
                <select class="tipo-alvo" onchange="atualizarOpcoesNavio('${navioId}')">
                    <option value="">Selecione o tipo</option>
                    ${Object.entries(tiposNavios).map(([key, tipo]) => 
                        `<option value="${key}">${tipo.nome}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Selecione o Alvo:</label>
                <select class="opcao-navio" onchange="atualizarPreviewImagem('${navioId}')" disabled>
                    <option value="">Primeiro selecione o tipo</option>
                </select>
            </div>
            <div class="form-group">
                <label>Quantidade:</label>
                <input type="number" class="quantidade-navio" min="1" value="1">
            </div>
            <div class="preview-imagem">
                <img src="images/ships/default-ship.png" alt="Preview do navio">
            </div>
        </div>
    `;
    
    container.appendChild(navioCard);
}

// Função para atualizar as opções de navio baseado no tipo selecionado
function atualizarOpcoesNavio(navioId) {
    const card = document.getElementById(`navio-${navioId}`);
    const tipoSelect = card.querySelector('.tipo-alvo');
    const opcaoSelect = card.querySelector('.opcao-navio');
    const previewImg = card.querySelector('.preview-imagem img');
    
    const tipoSelecionado = tipoSelect.value;
    
    if (tipoSelecionado && tiposNavios[tipoSelecionado]) {
        opcaoSelect.disabled = false;
        opcaoSelect.innerHTML = `
            <option value="">Selecione o alvo</option>
            ${tiposNavios[tipoSelecionado].opcoes.map(opcao => 
                `<option value="${opcao.id}" data-imagem="${opcao.imagem}">${opcao.nome}</option>`
            ).join('')}
        `;
    } else {
        opcaoSelect.disabled = true;
        opcaoSelect.innerHTML = '<option value="">Primeiro selecione o tipo</option>';
        previewImg.src = 'images/ships/default-ship.png';
    }
}

// Função para remover um navio-alvo
function removerNavioAlvo(navioId) {
    const card = document.getElementById(`navio-${navioId}`);
    card.remove();
}

// Função para atualizar a preview da imagem quando um navio é selecionado
function atualizarPreviewImagem(navioId) {
    const card = document.getElementById(`navio-${navioId}`);
    const opcaoSelect = card.querySelector('.opcao-navio');
    const previewImg = card.querySelector('.preview-imagem img');
    
    const opcaoSelecionada = opcaoSelect.selectedOptions[0];
    if (opcaoSelecionada && opcaoSelecionada.dataset.imagem) {
        previewImg.src = opcaoSelecionada.dataset.imagem;
    } else {
        previewImg.src = 'images/ships/default-ship.png';
    }
}