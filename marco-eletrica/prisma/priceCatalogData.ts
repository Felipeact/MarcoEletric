export type PriceCatalogItem = {
  category: string;
  name: string;
  unit: string;
  priceMin: number;
  priceAvg: number;
  priceMax: number;
};

const ILUMINACAO = "Iluminação";
const PONTO_UTILIZACAO = "Ponto de Utilização";
const QUADROS_DISTRIBUICAO = "Quadros de Distribuição/Painel";
const PASSAGEM_CABOS = "Passagem de Cabos";
const INSTALACOES_ESPECIFICAS = "Instalações Elétricas Específicas";

export const priceCatalogData: PriceCatalogItem[] = [
  // Iluminação
  { category: ILUMINACAO, name: "Arandela, pendente ou spot comum", unit: "unidade", priceMin: 55, priceAvg: 70, priceMax: 85 },
  { category: ILUMINACAO, name: "Lâmpada fluorescente/LED (tubular)", unit: "unidade", priceMin: 60, priceAvg: 70, priceMax: 80 },
  { category: ILUMINACAO, name: "Lustres simples / luminária", unit: "unidade", priceMin: 80, priceAvg: 90, priceMax: 100 },
  { category: ILUMINACAO, name: "Lustres grandes / luminária", unit: "unidade", priceMin: 120, priceAvg: 135, priceMax: 150 },
  { category: ILUMINACAO, name: "Refletor de jardim", unit: "unidade", priceMin: 90, priceAvg: 110, priceMax: 120 },
  { category: ILUMINACAO, name: "Refletor de poste comum", unit: "unidade", priceMin: 110, priceAvg: 130, priceMax: 150 },
  { category: ILUMINACAO, name: "Refletor de poste com lâmpada a vapor", unit: "unidade", priceMin: 110, priceAvg: 130, priceMax: 150 },
  { category: ILUMINACAO, name: "Interruptor simples ou pulsador", unit: "unidade", priceMin: 40, priceAvg: 50, priceMax: 60 },
  { category: ILUMINACAO, name: "Interruptor three-way / four-way", unit: "unidade", priceMin: 50, priceAvg: 60, priceMax: 70 },
  { category: ILUMINACAO, name: "Interruptor duplo / bipolar", unit: "unidade", priceMin: 50, priceAvg: 60, priceMax: 70 },
  { category: ILUMINACAO, name: "Interruptor e tomada (juntos)", unit: "unidade", priceMin: 50, priceAvg: 60, priceMax: 70 },
  { category: ILUMINACAO, name: "Reator de lâmpada a vapor", unit: "unidade", priceMin: 70, priceAvg: 80, priceMax: 90 },
  { category: ILUMINACAO, name: "Fotocélula / sensor de presença", unit: "unidade", priceMin: 70, priceAvg: 85, priceMax: 100 },
  { category: ILUMINACAO, name: "Refletor LED + fotocélula ou sensor de presença", unit: "unidade", priceMin: 60, priceAvg: 75, priceMax: 90 },
  { category: ILUMINACAO, name: "Luminária de emergência de sobrepor", unit: "unidade", priceMin: 70, priceAvg: 90, priceMax: 110 },
  { category: ILUMINACAO, name: "Luminária de emergência de embutir (caixinha 2x4)", unit: "unidade", priceMin: 50, priceAvg: 65, priceMax: 80 },
  { category: ILUMINACAO, name: "Instalação de perfil de LED", unit: "metro", priceMin: 140, priceAvg: 160, priceMax: 180 },
  { category: ILUMINACAO, name: "Luminária tubular - troca sistema de reator para LED", unit: "unidade", priceMin: 70, priceAvg: 85, priceMax: 100 },

  // Ponto de Utilização
  { category: PONTO_UTILIZACAO, name: "Tomada simples", unit: "unidade", priceMin: 30, priceAvg: 40, priceMax: 50 },
  { category: PONTO_UTILIZACAO, name: "Tomada dupla", unit: "unidade", priceMin: 40, priceAvg: 50, priceMax: 60 },
  { category: PONTO_UTILIZACAO, name: "Tomada tripla", unit: "unidade", priceMin: 50, priceAvg: 60, priceMax: 70 },
  { category: PONTO_UTILIZACAO, name: "Tomada de piso e/ou telefone", unit: "unidade", priceMin: 50, priceAvg: 60, priceMax: 70 },
  { category: PONTO_UTILIZACAO, name: "Tomada industrial (3P+T)", unit: "unidade", priceMin: 80, priceAvg: 100, priceMax: 120 },
  { category: PONTO_UTILIZACAO, name: "Instalação tomada de sobrepor com canaleta", unit: "unidade", priceMin: 50, priceAvg: 60, priceMax: 70 },
  { category: PONTO_UTILIZACAO, name: "Chave de bóia superior e inferior (em residência)", unit: "unidade", priceMin: 100, priceAvg: 120, priceMax: 140 },
  { category: PONTO_UTILIZACAO, name: "Ventilador de teto", unit: "unidade", priceMin: 120, priceAvg: 140, priceMax: 160 },
  { category: PONTO_UTILIZACAO, name: "Ventilador de parede", unit: "unidade", priceMin: 80, priceAvg: 90, priceMax: 100 },
  { category: PONTO_UTILIZACAO, name: "Chuveiro elétrico simples", unit: "unidade", priceMin: 80, priceAvg: 90, priceMax: 100 },
  { category: PONTO_UTILIZACAO, name: "Chuveiro luxo (eletrônico / pressurizado / ducha)", unit: "unidade", priceMin: 120, priceAvg: 135, priceMax: 150 },
  { category: PONTO_UTILIZACAO, name: "Troca de resistência de chuveiro (elétrico / eletrônico)", unit: "unidade", priceMin: 70, priceAvg: 80, priceMax: 90 },
  { category: PONTO_UTILIZACAO, name: "Torneira elétrica", unit: "unidade", priceMin: 80, priceAvg: 90, priceMax: 100 },
  { category: PONTO_UTILIZACAO, name: "Campainha até 20 metros", unit: "unidade", priceMin: 60, priceAvg: 70, priceMax: 80 },
  { category: PONTO_UTILIZACAO, name: "Interfone 1 chamada", unit: "unidade", priceMin: 130, priceAvg: 160, priceMax: 190 },
  { category: PONTO_UTILIZACAO, name: "Interfone 2 chamadas", unit: "unidade", priceMin: 170, priceAvg: 200, priceMax: 230 },
  { category: PONTO_UTILIZACAO, name: "Interfone 4 chamadas", unit: "unidade", priceMin: 370, priceAvg: 400, priceMax: 430 },
  { category: PONTO_UTILIZACAO, name: "Vídeo porteiro", unit: "unidade", priceMin: 160, priceAvg: 185, priceMax: 200 },
  { category: PONTO_UTILIZACAO, name: "Câmeras CFTV 1 câmera Wi-Fi (sem ponto elétrico)", unit: "unidade", priceMin: 130, priceAvg: 150, priceMax: 170 },
  { category: PONTO_UTILIZACAO, name: "Câmeras CFTV 3 câmeras Wi-Fi (sem ponto elétrico)", unit: "kit", priceMin: 310, priceAvg: 330, priceMax: 350 },
  { category: PONTO_UTILIZACAO, name: "Portão eletrônico deslizante", unit: "unidade", priceMin: 230, priceAvg: 250, priceMax: 270 },
  { category: PONTO_UTILIZACAO, name: "Portão eletrônico pivotante e/ou basculante", unit: "unidade", priceMin: 430, priceAvg: 460, priceMax: 490 },
  { category: PONTO_UTILIZACAO, name: "Botoeira para fechadura eletrônica (portão social)", unit: "unidade", priceMin: 50, priceAvg: 60, priceMax: 70 },
  { category: PONTO_UTILIZACAO, name: "Fechadura eletrônica (portão social)", unit: "unidade", priceMin: 130, priceAvg: 150, priceMax: 170 },
  { category: PONTO_UTILIZACAO, name: "Exaustor cozinha ou banheiro", unit: "unidade", priceMin: 200, priceAvg: 220, priceMax: 240 },
  { category: PONTO_UTILIZACAO, name: "Instalação de sistema de alarme residencial", unit: "unidade", priceMin: 700, priceAvg: 850, priceMax: 1000 },
  { category: PONTO_UTILIZACAO, name: "Instalação de aquecedor elétrico (com passagem de cabos)", unit: "unidade", priceMin: 1800, priceAvg: 2200, priceMax: 2700 },
  { category: PONTO_UTILIZACAO, name: "Instalação de detector de fumaça", unit: "unidade", priceMin: 1000, priceAvg: 1500, priceMax: 2000 },
  { category: PONTO_UTILIZACAO, name: "Instalação de cerca elétrica", unit: "metro", priceMin: 50, priceAvg: 70, priceMax: 90 },
  { category: PONTO_UTILIZACAO, name: "Instalação de nobreak", unit: "unidade", priceMin: 250, priceAvg: 280, priceMax: 310 },
  { category: PONTO_UTILIZACAO, name: "Instalação de aquecedor a gás", unit: "unidade", priceMin: 270, priceAvg: 320, priceMax: 370 },
  { category: PONTO_UTILIZACAO, name: "Instalação de termostato / temporizador", unit: "unidade", priceMin: 80, priceAvg: 90, priceMax: 100 },

  // Quadros de Distribuição/Painel
  { category: QUADROS_DISTRIBUICAO, name: "Substituição de disjuntor monofásico", unit: "unidade", priceMin: 40, priceAvg: 50, priceMax: 60 },
  { category: QUADROS_DISTRIBUICAO, name: "Substituição de disjuntor bifásico", unit: "unidade", priceMin: 60, priceAvg: 70, priceMax: 80 },
  { category: QUADROS_DISTRIBUICAO, name: "Substituição de disjuntor trifásico", unit: "unidade", priceMin: 90, priceAvg: 100, priceMax: 110 },
  { category: QUADROS_DISTRIBUICAO, name: "IDR (interruptor diferencial residual)", unit: "unidade", priceMin: 110, priceAvg: 130, priceMax: 150 },
  { category: QUADROS_DISTRIBUICAO, name: "DPS - dispositivo de proteção contra surtos", unit: "unidade", priceMin: 95, priceAvg: 110, priceMax: 125 },
  { category: QUADROS_DISTRIBUICAO, name: "Barramento pente monopolar no QDC", unit: "unidade", priceMin: 45, priceAvg: 60, priceMax: 75 },
  { category: QUADROS_DISTRIBUICAO, name: "Barramento pente bipolar no QDC", unit: "unidade", priceMin: 55, priceAvg: 70, priceMax: 85 },
  { category: QUADROS_DISTRIBUICAO, name: "Barramento pente tripolar no QDC", unit: "unidade", priceMin: 65, priceAvg: 80, priceMax: 95 },
  { category: QUADROS_DISTRIBUICAO, name: "Barramento de neutro e/ou terra", unit: "unidade", priceMin: 65, priceAvg: 80, priceMax: 95 },
  { category: QUADROS_DISTRIBUICAO, name: "Instalação de haste de aterramento", unit: "unidade", priceMin: 160, priceAvg: 180, priceMax: 200 },
  { category: QUADROS_DISTRIBUICAO, name: "Instalação de contator e/ou relé térmico", unit: "unidade", priceMin: 170, priceAvg: 200, priceMax: 230 },
  { category: QUADROS_DISTRIBUICAO, name: "Instalação e montagem de QDC (6 circuitos + DR + DPS)", unit: "unidade", priceMin: 460, priceAvg: 485, priceMax: 510 },
  { category: QUADROS_DISTRIBUICAO, name: "Instalação e montagem de QDC (12 circuitos + DR + DPS)", unit: "unidade", priceMin: 700, priceAvg: 725, priceMax: 750 },
  { category: QUADROS_DISTRIBUICAO, name: "Instalação e montagem de QDC (18 circuitos + DR + DPS)", unit: "unidade", priceMin: 875, priceAvg: 900, priceMax: 925 },
  { category: QUADROS_DISTRIBUICAO, name: "Instalação e montagem de QDC (24 circuitos + DR + DPS)", unit: "unidade", priceMin: 1170, priceAvg: 1200, priceMax: 1230 },

  // Passagem de Cabos (circuitos de até 20m)
  { category: PASSAGEM_CABOS, name: "Entrada monofásica (QM para QDC)", unit: "unidade", priceMin: 160, priceAvg: 190, priceMax: 220 },
  { category: PASSAGEM_CABOS, name: "Entrada bifásica ou trifásica (QM para QDC)", unit: "unidade", priceMin: 220, priceAvg: 250, priceMax: 280 },
  { category: PASSAGEM_CABOS, name: "Alimentação para motores", unit: "unidade", priceMin: 150, priceAvg: 180, priceMax: 210 },
  { category: PASSAGEM_CABOS, name: "Curto-circuito monofásico", unit: "unidade", priceMin: 120, priceAvg: 150, priceMax: 180 },
  { category: PASSAGEM_CABOS, name: "Curto-circuito bifásico", unit: "unidade", priceMin: 150, priceAvg: 180, priceMax: 210 },
  { category: PASSAGEM_CABOS, name: "Curto-circuito trifásico", unit: "unidade", priceMin: 170, priceAvg: 200, priceMax: 230 },
  { category: PASSAGEM_CABOS, name: "Instalação de medidor (padrão de entrada - monofásico 127V ou 220V)", unit: "unidade", priceMin: 1000, priceAvg: 1300, priceMax: 1600 },
  { category: PASSAGEM_CABOS, name: "Instalação de medidor (padrão de entrada - bifásico 220V)", unit: "unidade", priceMin: 1200, priceAvg: 1500, priceMax: 1800 },
  { category: PASSAGEM_CABOS, name: "Instalação de medidor (padrão de entrada - trifásico 220V)", unit: "unidade", priceMin: 1400, priceAvg: 1700, priceMax: 2000 },

  // Instalações Elétricas Específicas
  { category: INSTALACOES_ESPECIFICAS, name: "Limpeza em tubulação de ar condicionado (existente no local)", unit: "unidade", priceMin: 50, priceAvg: 60, priceMax: 70 },
  { category: INSTALACOES_ESPECIFICAS, name: "Alimentação elétrica para ar condicionado", unit: "unidade", priceMin: 90, priceAvg: 110, priceMax: 130 },
  { category: INSTALACOES_ESPECIFICAS, name: "Instalação de ar condicionado Split Inverter 9000 BTUs (parede c/ parede)", unit: "unidade", priceMin: 450, priceAvg: 500, priceMax: 550 },
  { category: INSTALACOES_ESPECIFICAS, name: "Instalação de ar condicionado Split Inverter 12000 BTUs (parede c/ parede)", unit: "unidade", priceMin: 450, priceAvg: 500, priceMax: 550 },
  { category: INSTALACOES_ESPECIFICAS, name: "Instalação de ar condicionado Split Inverter 18000 BTUs (parede c/ parede)", unit: "unidade", priceMin: 550, priceAvg: 600, priceMax: 650 },
  { category: INSTALACOES_ESPECIFICAS, name: "Instalação de ar condicionado Split Inverter 24000 BTUs (parede c/ parede)", unit: "unidade", priceMin: 650, priceAvg: 700, priceMax: 750 },
  { category: INSTALACOES_ESPECIFICAS, name: "Instalação de ar condicionado Split Inverter 30000 BTUs (parede c/ parede)", unit: "unidade", priceMin: 800, priceAvg: 850, priceMax: 900 },
  { category: INSTALACOES_ESPECIFICAS, name: "Instalação de ar condicionado ON/OFF convencional 9000 BTUs (parede c/ parede)", unit: "unidade", priceMin: 400, priceAvg: 440, priceMax: 480 },
  { category: INSTALACOES_ESPECIFICAS, name: "Instalação de ar condicionado ON/OFF convencional 12000 BTUs (parede c/ parede)", unit: "unidade", priceMin: 450, priceAvg: 490, priceMax: 530 },
  { category: INSTALACOES_ESPECIFICAS, name: "Instalação de ar condicionado ON/OFF convencional 18000 BTUs (parede c/ parede)", unit: "unidade", priceMin: 500, priceAvg: 540, priceMax: 580 },
  { category: INSTALACOES_ESPECIFICAS, name: "Instalação de ar condicionado ON/OFF convencional 24000 BTUs (parede c/ parede)", unit: "unidade", priceMin: 600, priceAvg: 640, priceMax: 680 },
  { category: INSTALACOES_ESPECIFICAS, name: "Instalação de ar condicionado ON/OFF convencional 30000 BTUs (parede c/ parede)", unit: "unidade", priceMin: 700, priceAvg: 740, priceMax: 780 },
  { category: INSTALACOES_ESPECIFICAS, name: "Atendimento técnico emergencial (final de semana)", unit: "visita", priceMin: 210, priceAvg: 240, priceMax: 270 },
  { category: INSTALACOES_ESPECIFICAS, name: "Atendimento técnico emergencial (durante a semana)", unit: "visita", priceMin: 150, priceAvg: 180, priceMax: 210 },
  { category: INSTALACOES_ESPECIFICAS, name: "Instalação de painel solar (com gerador solar de 8kWp)", unit: "unidade", priceMin: 7500, priceAvg: 8000, priceMax: 8500 },
];
