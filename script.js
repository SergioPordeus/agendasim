// script.js

// Funções auxiliares
function formatarData(data) {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function formatarDataParaExibicao(dataString) {
    if (!dataString) return '';
    const [ano, mes, dia] = dataString.split('-');
    return `${dia}/${mes}/${ano}`;
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

// Catálogo de navios
const catalogoNavios = {
    COSTEIRO: [
        { id: 'NPNG', nome: 'Navio Patrulha', tipo: 'Patrulha', imagem: 'images/navio_patrulha.png' },
        { id: 'CORV', nome: 'Corveta', tipo: 'Escolta', imagem: 'images/corveta.png' },
        { id: 'FRAG', nome: 'Fragata', tipo: 'Escolta', imagem: 'images/fragata.png' },
        { id: 'MERC', nome: 'Navio Mercante', tipo: 'Mercante', imagem: 'images/navio2.png' }
    ],
    OCEANICO: [
        { id: 'DEST', nome: 'Contratorpedeiro', tipo: 'Escolta', imagem: 'images/contratorpedeiro.png' },
        { id: 'FRAG', nome: 'Fragata', tipo: 'Escolta', imagem: 'images/fragata.png' },
        { id: 'TANQ', nome: 'Navio Tanque', tipo: 'Mercante', imagem: 'images/navio_tanque.png' },
        { id: 'CONT', nome: 'Porta-Contêiner', tipo: 'Mercante', imagem: 'images/porta_conteiner.png' }
    ],
    PORTO: [
        { id: 'REBO', nome: 'Rebocador', tipo: 'Apoio', imagem: 'images/rebocador.png' },
        { id: 'BALS', nome: 'Balsa', tipo: 'Transporte', imagem: 'images/balsa.png' },
        { id: 'MERCP', nome: 'Navio Mercante Pequeno', tipo: 'Mercante', imagem: 'images/navio_mercante_pequeno.png' }
    ],
    ESTREITO: [
        { id: 'CORV', nome: 'Corveta', tipo: 'Escolta', imagem: 'images/corveta.png' },
        { id: 'PATM', nome: 'Patrulha Médio', tipo: 'Patrulha', imagem: 'images/patrulha_medio.png' },
        { id: 'MERCP', nome: 'Navio Mercante Pequeno', tipo: 'Mercante', imagem: 'images/navio_mercante_pequeno.png' }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const dataInput = document.getElementById('data');
    if (dataInput) {
        const hoje = new Date();
        const dataMinima = hoje.toISOString().split('T')[0];
        dataInput.min = dataMinima;
        dataInput.addEventListener('change', atualizarHorarios);
    }

    function atualizarHorarios() {
        const horarioSelect = document.getElementById('horario');
        const dataSelect = document.getElementById('data');
        
        horarioSelect.innerHTML = '<option value="">Selecione um horário</option>';
        
        if (dataSelect.value) {
            const periodos = [
                { label: 'Manhã', horarios: ['08:00', '09:00', '10:00', '11:00'] },
                { label: 'Tarde', horarios: ['13:00', '14:00', '15:00', '16:00'] }
            ];

            periodos.forEach(periodo => {
                const optgroup = document.createElement('optgroup');
                optgroup.label = periodo.label;
                periodo.horarios.forEach((hora, index) => {
                    const option = document.createElement('option');
                    option.value = hora;
                    option.textContent = `${hora} - ${index + 1}º Tempo`;
                    optgroup.appendChild(option);
                });
                horarioSelect.appendChild(optgroup);
            });

            // Desabilita horários passados para o dia atual
            const dataSelecionada = new Date(dataSelect.value);
            const agora = new Date();
            if (dataSelecionada.toDateString() === agora.toDateString()) {
                Array.from(horarioSelect.options).forEach(option => {
                    if (option.value) {
                        const [hora] = option.value.split(':');
                        option.disabled = parseInt(hora) <= agora.getHours();
                    }
                });
            }
        }
    }

    function atualizarOpcoesCenario() {
        const tipoTreinamento = document.getElementById('tipoTreinamento').value;
        const tipoCenario = document.getElementById('tipoCenario');
        
        tipoCenario.innerHTML = '<option value="">Selecione o tipo de cenário</option>';
        
        const cenarios = {
            'SIMSUP': ['PORTO', 'COSTEIRO'],
            'SIMTAC': ['COSTEIRO', 'OCEANICO', 'ESTREITO']
        };

        (cenarios[tipoTreinamento] || []).forEach(cenario => {
            const option = document.createElement('option');
            option.value = cenario;
            option.textContent = cenario.charAt(0) + cenario.slice(1).toLowerCase();
            tipoCenario.appendChild(option);
        });
    }

    function atualizarOpcoesNavios() {
        const tipoCenario = document.getElementById('tipoCenario').value;
        const naviosContainer = document.getElementById('naviosDisponiveis');
        
        naviosContainer.innerHTML = '';
        
        if (tipoCenario && catalogoNavios[tipoCenario]) {
            catalogoNavios[tipoCenario].forEach(navio => {
                const navioCard = document.createElement('div');
                navioCard.className = 'ship-card';
                navioCard.dataset.id = navio.id;
                
                navioCard.innerHTML = `
                    <img src="${navio.imagem}" alt="${navio.nome}" class="ship-image">
                    <h4>${navio.nome}</h4>
                    <p>Tipo: ${navio.tipo}</p>
                    <div class="ship-quantity">
                        <button type="button" class="quantity-btn minus">-</button>
                        <input type="number" value="0" min="0" max="10" class="quantity-input">
                        <button type="button" class="quantity-btn plus">+</button>
                    </div>
                `;
                
                const quantityInput = navioCard.querySelector('.quantity-input');
                const minusBtn = navioCard.querySelector('.minus');
                const plusBtn = navioCard.querySelector('.plus');
                
                [minusBtn, plusBtn].forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        const currentValue = parseInt(quantityInput.value);
                        if (this.classList.contains('minus') && currentValue > 0) {
                            quantityInput.value = currentValue - 1;
                        } else if (this.classList.contains('plus') && currentValue < 10) {
                            quantityInput.value = currentValue + 1;
                        }
                        updateCardSelection();
                    });
                });
                
                quantityInput.addEventListener('change', updateCardSelection);
                
                function updateCardSelection() {
                    navioCard.classList.toggle('selected', parseInt(quantityInput.value) > 0);
                }
                
                naviosContainer.appendChild(navioCard);
            });
        }
    }

    window.baixarFormulario = async function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        function addWrappedText(text, x, y, maxWidth, lineHeight) {
            const lines = doc.splitTextToSize(text, maxWidth);
            for (let i = 0; i < lines.length; i++) {
                if (y > 280) {  // Se estiver próximo ao fim da página
                    doc.addPage();  // Adiciona nova página
                    y = 20;  // Reset da posição Y
                }
                doc.text(lines[i], x, y);
                y += lineHeight;
            }
            return y;
        }

        doc.setFontSize(18);
        let y = 20;
        y = addWrappedText('Agendamento do Simulador de Submarinos', 20, y, 170, 10);
        y += 10;

        doc.setFontSize(12);

        const campos = [
            { label: 'Tipo de Treinamento', id: 'tipoTreinamento' },
            { label: 'Organização Militar', id: 'om' },
            { label: 'Data', id: 'data' },
            { label: 'Horário', id: 'horario' },
            { label: 'Número de Participantes', id: 'participantes' },
            { label: 'Ramal para Contato', id: 'ramal' },
            { label: 'Responsável', id: 'responsavel' },
            { label: 'Tipo de Cenário', id: 'tipoCenario' },
            { label: 'Nível de Dificuldade', id: 'dificuldade' },
            { label: 'Estado do Mar', id: 'estadoMar' },
            { label: 'Visibilidade', id: 'visibilidade' },
            { label: 'Período do Dia', id: 'periodo' },
            { label: 'Correntes Marinhas', id: 'correntes' }
        ];

        campos.forEach(campo => {
            const valor = document.getElementById(campo.id).value;
            y = addWrappedText(`${campo.label}: ${valor}`, 20, y, 170, 7);
            y += 3;
        });

        y = addWrappedText('Navios Selecionados:', 20, y, 170, 7);
        y += 5;

        const naviosSelecionados = Array.from(document.querySelectorAll('.ship-card.selected'));
        for (const card of naviosSelecionados) {
            const nome = card.querySelector('h4').textContent;
            const quantidade = card.querySelector('.quantity-input').value;
            const imagemSrc = card.querySelector('.ship-image').src;

            y = addWrappedText(`- ${nome} - Quantidade: ${quantidade}`, 30, y, 160, 7);

            try {
                const img = await loadImage(imagemSrc);
                const imgWidth = 30;
                const imgHeight = (img.height * imgWidth) / img.width;
                
                if (y + imgHeight > 280) {
                    doc.addPage();
                    y = 20;
                }
                
                doc.addImage(img, 'PNG', 30, y, imgWidth, imgHeight);
                y += imgHeight + 10;
            } catch (error) {
                console.error('Erro ao carregar imagem:', error);
                y += 10;
            }
        }

        const observacoes = document.getElementById('observacoesCenario').value;
        y = addWrappedText('Observações:', 20, y, 170, 7);
        y += 5;
        y = addWrappedText(observacoes, 20, y, 170, 7);

        y += 20;
        const dataAtual = formatarData(new Date());
        y = addWrappedText(`Itaguaí, ${dataAtual}`, 20, y, 170, 7);

        y += 20;
        doc.line(20, y, 90, y);
        y += 5;
        y = addWrappedText('Assinatura do Responsável', 20, y, 170, 7);

        doc.save('Agendamento_Simulador_Submarinos.pdf');
    };

    document.getElementById('tipoTreinamento').addEventListener('change', atualizarOpcoesCenario);
    document.getElementById('tipoCenario').addEventListener('change', atualizarOpcoesNavios);

    atualizarHorarios();
    atualizarOpcoesCenario();
    atualizarOpcoesNavios();
});