// Definição dos tipos de navios disponíveis - DEVE VIR PRIMEIRO
const tiposNavios = {
    'navio-guerra': {
        nome: 'Navio de Guerra',
        opcoes: [
            { id: 'fragata-niteroi', nome: 'Fragata Classe Niterói', imagem: 'images/ships/fragata-niteroi.png' },
            { id: 'fragata-Greenhalgh', nome: 'Fragata Classe Greenhalgh', imagem: 'images/ships/fragata-Greenhalgh.png' },
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
            { id: 'c130', nome: 'C-130 Hércules', imagem: 'images/ships/c130.png' },
            { id: 'lynx', nome: 'Super Lynx', imagem: 'images/ships/super-lynx.png'}
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

// Modifique a função criarNovoNavioAlvo
function criarNovoNavioAlvo() {
    console.log("Criando novo alvo");
    const container = document.getElementById('naviosDisponiveis');
    if (!container) {
        console.error("Container 'naviosDisponiveis' não encontrado!");
        return;
    }

    const navioId = Date.now();
    const navioCard = document.createElement('div');
    navioCard.className = 'ship-card';
    navioCard.id = `navio-${navioId}`;
    
    navioCard.innerHTML = `
        <div class="ship-header">
            <h4>Alvo #${container.children.length + 1}</h4>
            <button type="button" class="btn-remover" onclick="removerNavioAlvo('${navioId}')">×</button>
        </div>
        <div class="ship-content">
            <div class="form-row">
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
            </div>

            <div class="preview-imagem">
                <img src="images/ships/default-ship.png" alt="Preview do alvo">
            </div>
    
             <!-- Container para os campos específicos -->
            <div class="campos-especificos">
                <!-- Será preenchido dinamicamente baseado no tipo selecionado -->
            </div>
        </div>
    `;
    
    container.appendChild(navioCard);
}


// Função para atualizar campos específicos baseado no tipo
function atualizarCamposEspecificos(navioId, tipo) {
    const card = document.getElementById(`navio-${navioId}`);
    const container = card.querySelector('.campos-especificos');
    
    if (tipo === 'aeronave') {
        container.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label>Marcação (graus):</label>
                    <input type="number" class="marcacao" min="0" max="359" placeholder="000 - 359">
                </div>
                <div class="form-group">
                    <label>Distância (jardas):</label>
                    <input type="number" class="distancia" min="0" placeholder="Distância">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Velocidade (nós):</label>
                    <input type="number" class="velocidade" min="0" placeholder="Velocidade">
                </div>
                <div class="form-group">
                    <label>Altitude (pés):</label>
                    <input type="number" class="altitude" min="0" placeholder="Altitude">
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label>Marcação (graus):</label>
                    <input type="number" class="marcacao" min="0" max="359" placeholder="000 - 359">
                </div>
                <div class="form-group">
                    <label>Distância (jardas):</label>
                    <input type="number" class="distancia" min="0" placeholder="Distância">
                </div>
                <div class="form-group">
                    <label>Velocidade (nós):</label>
                    <input type="number" class="velocidade" min="0" placeholder="Velocidade">
                </div>
            </div>
        `;
    }
}
// Modifique a função atualizarOpcoesNavio para incluir a atualização dos campos específicos
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
        
        // Atualiza os campos específicos baseado no tipo
        atualizarCamposEspecificos(navioId, tipoSelecionado);
    } else {
        opcaoSelect.disabled = true;
        opcaoSelect.innerHTML = '<option value="">Primeiro selecione o tipo</option>';
        previewImg.src = 'images/ships/default-ship.png';
        card.querySelector('.campos-especificos').innerHTML = '';
    }
}

// Atualize a função coletarDadosNavios
function coletarDadosNavios() {
    const alvos = [];
    document.querySelectorAll('.ship-card').forEach(card => {
        const tipo = card.querySelector('.tipo-alvo').value;
        const opcao = card.querySelector('.opcao-navio').value;
        
        if (tipo && opcao) {
            const tipoNome = tiposNavios[tipo].nome;
            const opcaoNome = tiposNavios[tipo].opcoes.find(op => op.id === opcao)?.nome;
            
            const dadosComuns = {
                tipo: tipoNome,
                nome: opcaoNome,
                marcacao: card.querySelector('.marcacao').value,
                distancia: card.querySelector('.distancia').value,
                velocidade: card.querySelector('.velocidade').value
            };

            if (tipo === 'aeronave') {
                dadosComuns.altitude = card.querySelector('.altitude').value;
            }
            
            alvos.push(dadosComuns);
        }
    });
    return alvos;
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
// Atualize a parte do PDF para incluir os dados específicos
function baixarFormulario() {
    // ... código anterior ...
    
    const alvosSelecionados = coletarDadosNavios();
    doc.text('Alvos Selecionados:', 20, y); y += 10;
    
    alvosSelecionados.forEach(alvo => {
        doc.text(`- ${alvo.nome} (${alvo.tipo})`, 30, y); y += 7;
        doc.text(`  Marcação: ${alvo.marcacao}°, Distância: ${alvo.distancia} jardas, Velocidade: ${alvo.velocidade} nós`, 35, y);
        if (alvo.altitude) {
            y += 7;
            doc.text(`  Altitude: ${alvo.altitude} pés`, 35, y);
        }
        y += 10;
    });
}


  