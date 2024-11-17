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

// Função para inicializar o mapa
function initializeMap() {
    // Criar o mapa centrado em uma posição inicial
    const map = L.map('map').setView([-23.0000, -43.0000], 10); // Rio de Janeiro como exemplo

    // Adicionar camada do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    return map;
}

// Função para adicionar navio ao mapa
function addShipToMap(map, ship) {
    const { latitude, longitude, nome, tipo } = ship;
    
    // Criar ícone personalizado para o navio
    const shipIcon = L.divIcon({
        className: 'ship-icon',
        html: `<i class="fas fa-ship"></i>`,
        iconSize: [30, 30]
    });

    // Adicionar marcador do navio
    const marker = L.marker([latitude, longitude], {
        icon: shipIcon,
        title: nome
    }).addTo(map);

    // Adicionar popup com informações do navio
    marker.bindPopup(`
        <strong>${nome}</strong><br>
        Tipo: ${tipo}<br>
        Lat: ${latitude}<br>
        Long: ${longitude}
    `);

    return marker;
}

// Função para calcular distância entre dois pontos
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
             Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance.toFixed(2); // Retorna distância em km com 2 casas decimais
}

// Função auxiliar para converter graus em radianos
function toRad(degrees) {
    return degrees * Math.PI / 180;
}

// Função para desenhar linha entre navios
function drawLineBetweenShips(map, ship1, ship2) {
    const coordinates = [
        [ship1.latitude, ship1.longitude],
        [ship2.latitude, ship2.longitude]
    ];

    const distance = calculateDistance(
        ship1.latitude, ship1.longitude,
        ship2.latitude, ship2.longitude
    );

    // Desenhar linha
    const line = L.polyline(coordinates, {
        color: 'red',
        weight: 2,
        opacity: 0.7
    }).addTo(map);

    // Adicionar label com a distância no meio da linha
    const midpoint = [
        (ship1.latitude + ship2.latitude) / 2,
        (ship1.longitude + ship2.longitude) / 2
    ];

    L.marker(midpoint, {
        icon: L.divIcon({
            className: 'distance-label',
            html: `${distance} km`
        })
    }).addTo(map);

    return line;
}

// Função principal para gerenciar os navios no mapa
class ShipMapManager {
    constructor() {
        this.map = initializeMap();
        this.ships = new Map(); // Armazenar navios e seus marcadores
        this.lines = []; // Armazenar linhas entre navios
    }

    // Adicionar novo navio
    addShip(shipData) {
        const marker = addShipToMap(this.map, shipData);
        this.ships.set(shipData.id, {
            data: shipData,
            marker: marker
        });
        this.updateConnections();
    }

    // Remover navio
    removeShip(shipId) {
        const ship = this.ships.get(shipId);
        if (ship) {
            ship.marker.remove();
            this.ships.delete(shipId);
            this.updateConnections();
        }
    }

    // Atualizar conexões entre navios
    updateConnections() {
        // Limpar linhas existentes
        this.lines.forEach(line => line.remove());
        this.lines = [];

        // Desenhar novas linhas entre todos os navios
        const shipsArray = Array.from(this.ships.values());
        for (let i = 0; i < shipsArray.length; i++) {
            for (let j = i + 1; j < shipsArray.length; j++) {
                const line = drawLineBetweenShips(
                    this.map,
                    shipsArray[i].data,
                    shipsArray[j].data
                );
                this.lines.push(line);
            }
        }
    }

    // Centralizar mapa em um navio
    centerOnShip(shipId) {
        const ship = this.ships.get(shipId);
        if (ship) {
            this.map.setView([ship.data.latitude, ship.data.longitude], 12);
        }
    }

    // Obter informações de distância entre navios
    getDistanceMatrix() {
        const matrix = [];
        const ships = Array.from(this.ships.values());

        for (const ship1 of ships) {
            const distances = [];
            for (const ship2 of ships) {
                if (ship1 === ship2) {
                    distances.push(0);
                } else {
                    const distance = calculateDistance(
                        ship1.data.latitude, ship1.data.longitude,
                        ship2.data.latitude, ship2.data.longitude
                    );
                    distances.push(parseFloat(distance));
                }
            }
            matrix.push(distances);
        }

        return matrix;
    }
}
// Exemplo de uso:
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar estilos
    const style = document.createElement('style');
    style.textContent = mapStyles;
    document.head.appendChild(style);

    // Criar elemento do mapa
    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    document.querySelector('.container').appendChild(mapDiv);

    // Inicializar gerenciador de mapa
    const shipManager = new ShipMapManager();

    // Exemplo de adição de navio
    const exampleShip = {
        id: 1,
        nome: 'Navio 1',
        tipo: 'Cargueiro',
        latitude: -23.0000,
        longitude: -43.0000
    };

    shipManager.addShip(exampleShip);
});

// No seu código existente de adicionar navio
function adicionarNavio() {
    const navio = {
        id: Date.now(), // ID único
        nome: document.getElementById('nomeNavio').value,
        tipo: document.getElementById('tipoNavio').value,
        latitude: parseFloat(document.getElementById('latitude').value),
        longitude: parseFloat(document.getElementById('longitude').value)
    };

    // Adicionar ao mapa
    shipManager.addShip(navio);
    
    // Seu código existente para adicionar o navio à interface
}


  