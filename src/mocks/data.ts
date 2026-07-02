import type {
  Tenant, User, Person, Family, Visitor, Group, Ministry, Event,
  Donation, FinancialTransaction, Communication, PastoralCareRecord,
  Child, AuditLog, ScheduleSlot,
} from "@/types";

const T = "tenant-nova-alianca";

export const tenants: Tenant[] = [
  { id: T, name: "Igreja Nova Aliança", slug: "nova-alianca", plan: "growth", status: "active", city: "São Paulo", state: "SP", members: 842, createdAt: "2021-03-14" },
  { id: "tenant-monte-siao", name: "Comunidade Monte Sião", slug: "monte-siao", plan: "starter", status: "trial", city: "Curitiba", state: "PR", members: 214, createdAt: "2024-11-02" },
  { id: "tenant-graca", name: "Igreja da Graça", slug: "graca", plan: "enterprise", status: "active", city: "Belo Horizonte", state: "MG", members: 2140, createdAt: "2019-06-10" },
];

export const currentUser: User = {
  id: "user-1", tenantId: T, name: "Pr. Daniel Ribeiro", email: "daniel@novaalianca.org",
  roles: ["owner", "pastor"], lastLogin: new Date().toISOString(),
};

const brNames = [
  "Ana Beatriz Souza", "Lucas Fernandes", "Mariana Oliveira", "Rafael Costa",
  "Juliana Almeida", "Pedro Henrique Lima", "Camila Rodrigues", "Thiago Martins",
  "Beatriz Carvalho", "Gustavo Nunes", "Larissa Pereira", "Bruno Ferreira",
  "Sofia Ribeiro", "Matheus Cardoso", "Isabela Rocha", "Fernanda Barbosa",
  "Rodrigo Mendes", "Patrícia Gomes", "André Vieira", "Débora Santos",
];

export const people: Person[] = brNames.map((name, i) => ({
  id: `person-${i + 1}`, tenantId: T, name,
  email: name.toLowerCase().replace(/[^a-z]/g, "") + "@email.com",
  phone: `(11) 9${String(80000000 + i * 137).padStart(8, "0")}`,
  status: i < 14 ? "member" : "visitor",
  memberSince: i < 14 ? `202${(i % 5)}-0${(i % 9) + 1}-15` : undefined,
  tags: [["Louvor", "Recepção", "Célula Vila Madalena", "Novo convertido", "Discipulado", "Casais", "Jovens"][i % 7]],
  ministries: [],
  address: { city: "São Paulo", neighborhood: ["Vila Madalena","Pinheiros","Moema","Tatuapé","Santana"][i % 5] },
  birthDate: `19${80 + (i % 25)}-0${(i % 9) + 1}-1${i % 9}`,
  gender: i % 2 === 0 ? "F" : "M",
}));

export const families: Family[] = [
  { id: "fam-1", tenantId: T, name: "Família Souza", memberIds: ["person-1", "person-2"], headOfFamily: "person-1" },
  { id: "fam-2", tenantId: T, name: "Família Oliveira", memberIds: ["person-3", "person-4", "person-5"], headOfFamily: "person-4" },
];

const stages: Array<Visitor["stage"]> = [
  "novo","primeiro_contato","convidado_integracao","em_celula","pedido_membresia","membro_ativo",
];

const visitorNames = [
  "Vinícius Araújo","Helena Duarte","Marcos Batista","Yasmin Torres","Eduardo Pires",
  "Letícia Moraes","Guilherme Xavier","Renata Cunha","Otávio Freitas","Amanda Reis",
  "Diego Ramos","Priscila Sena","Igor Bastos","Natália Prado","Felipe Correia",
  "Bianca Antunes","Leonardo Aguiar","Vanessa Nogueira","Henrique Salles","Milena Cavalcante",
  "Ricardo Teixeira","Aline Machado",
];

export const visitors: Visitor[] = visitorNames.map((name, i) => ({
  id: `visitor-${i + 1}`,
  tenantId: T,
  name,
  phone: `(11) 9${String(70000000 + i * 213).padStart(8, "0")}`,
  origin: (["culto","site","indicacao","evento","celula"] as const)[i % 5],
  firstVisit: `2025-11-${String((i % 28) + 1).padStart(2, "0")}`,
  stage: stages[i % stages.length],
  assignedTo: ["Ana Beatriz", "Lucas F.", "Débora S.", "Pr. Daniel"][i % 4],
  nextAction: ["Ligar amanhã","Enviar mensagem","Convidar para célula","Agendar café","Confirmar presença"][i % 5],
}));

export const groups: Group[] = [
  { id: "g1", tenantId: T, name: "Vila Madalena", neighborhood: "Vila Madalena", leader: "Rafael Costa", members: 14, multiplierScore: 82, weekday: "Quarta", time: "20h", status: "em_multiplicacao" },
  { id: "g2", tenantId: T, name: "Pinheiros Jovens", neighborhood: "Pinheiros", leader: "Mariana Oliveira", members: 18, multiplierScore: 91, weekday: "Sexta", time: "20h30", status: "em_multiplicacao" },
  { id: "g3", tenantId: T, name: "Moema Casais", neighborhood: "Moema", leader: "Thiago & Camila", members: 12, multiplierScore: 64, weekday: "Terça", time: "20h", status: "ativa" },
  { id: "g4", tenantId: T, name: "Tatuapé Central", neighborhood: "Tatuapé", leader: "Pedro Henrique", members: 9, multiplierScore: 48, weekday: "Quinta", time: "20h", status: "ativa" },
  { id: "g5", tenantId: T, name: "Santana Norte", neighborhood: "Santana", leader: "Juliana Almeida", members: 16, multiplierScore: 75, weekday: "Segunda", time: "20h", status: "ativa" },
  { id: "g6", tenantId: T, name: "Perdizes Mulheres", neighborhood: "Perdizes", leader: "Beatriz Carvalho", members: 11, multiplierScore: 58, weekday: "Quarta", time: "15h", status: "pausada" },
];

export const ministries: Ministry[] = [
  { id: "m1", tenantId: T, name: "Louvor", leader: "Rafael Costa", volunteers: 24, color: "#5eead4" },
  { id: "m2", tenantId: T, name: "Mídia", leader: "Bruno Ferreira", volunteers: 12, color: "#fbbf24" },
  { id: "m3", tenantId: T, name: "Infantil", leader: "Fernanda Barbosa", volunteers: 18, color: "#f472b6" },
  { id: "m4", tenantId: T, name: "Recepção", leader: "André Vieira", volunteers: 22, color: "#60a5fa" },
  { id: "m5", tenantId: T, name: "Intercessão", leader: "Débora Santos", volunteers: 15, color: "#a78bfa" },
  { id: "m6", tenantId: T, name: "Ação Social", leader: "Patrícia Gomes", volunteers: 20, color: "#fb923c" },
];

export const schedules: ScheduleSlot[] = [
  { id: "s1", ministryId: "m1", personName: "Rafael Costa", role: "Vocal principal", status: "confirmado", date: "2025-12-07" },
  { id: "s2", ministryId: "m1", personName: "Mariana Oliveira", role: "Backing vocal", status: "confirmado", date: "2025-12-07" },
  { id: "s3", ministryId: "m1", personName: "Lucas Fernandes", role: "Guitarra", status: "pendente", date: "2025-12-07" },
  { id: "s4", ministryId: "m2", personName: "Bruno Ferreira", role: "Direção de câmera", status: "confirmado", date: "2025-12-07" },
  { id: "s5", ministryId: "m3", personName: "Fernanda Barbosa", role: "Berçário", status: "trocado", date: "2025-12-07" },
  { id: "s6", ministryId: "m4", personName: "André Vieira", role: "Porta principal", status: "confirmado", date: "2025-12-07" },
];

export const events: Event[] = [
  { id: "e1", tenantId: T, title: "Culto de Celebração", type: "culto", date: "2025-12-07", time: "10h", location: "Templo Sede", expected: 620, confirmed: 480, color: "#5eead4" },
  { id: "e2", tenantId: T, title: "Escola Bíblica", type: "curso", date: "2025-12-07", time: "09h", location: "Sala 3", expected: 80, confirmed: 62, color: "#60a5fa" },
  { id: "e3", tenantId: T, title: "Encontro de Casais", type: "evento", date: "2025-12-13", time: "19h", location: "Salão Social", expected: 120, confirmed: 84, color: "#f472b6" },
  { id: "e4", tenantId: T, title: "Conferência de Liderança", type: "conferencia", date: "2026-01-24", time: "08h30", location: "Templo Sede", expected: 300, confirmed: 172, color: "#fbbf24" },
  { id: "e5", tenantId: T, title: "Célula Vila Madalena", type: "celula", date: "2025-12-10", time: "20h", location: "Casa Rafael", expected: 14, confirmed: 12, color: "#a78bfa" },
];

export const donations: Donation[] = Array.from({ length: 40 }, (_, i) => ({
  id: `d${i+1}`, tenantId: T,
  personName: brNames[i % brNames.length],
  amount: [50, 100, 150, 200, 300, 500, 750, 1000, 1500][i % 9],
  type: (["dizimo","dizimo","dizimo","oferta","campanha","missoes"] as const)[i % 6],
  method: (["pix","pix","pix","cartao","boleto","dinheiro"] as const)[i % 6],
  date: `2025-11-${String((i % 28) + 1).padStart(2, "0")}`,
  campaign: i % 6 === 4 ? "Reforma do Templo" : i % 6 === 5 ? "Missões" : undefined,
}));

export const transactions: FinancialTransaction[] = [
  { id: "t1", tenantId: T, kind: "despesa", category: "Aluguel", amount: 12000, date: "2025-11-05", description: "Aluguel Templo Sede" },
  { id: "t2", tenantId: T, kind: "despesa", category: "Salários", amount: 38400, date: "2025-11-05", description: "Folha equipe pastoral" },
  { id: "t3", tenantId: T, kind: "despesa", category: "Utilidades", amount: 3200, date: "2025-11-10", description: "Energia + Água" },
  { id: "t4", tenantId: T, kind: "despesa", category: "Ação Social", amount: 8500, date: "2025-11-15", description: "Cestas básicas — 120 famílias" },
  { id: "t5", tenantId: T, kind: "receita", category: "Ofertas", amount: 62800, date: "2025-11-30", description: "Ofertas do mês" },
];

export const communications: Communication[] = [
  { id: "c1", tenantId: T, channel: "whatsapp", audience: "Membros ativos", subject: "Convite Culto de Celebração", sentAt: "2025-12-01", status: "enviado", recipients: 812, openRate: 0.87 },
  { id: "c2", tenantId: T, channel: "email", audience: "Líderes de célula", subject: "Relatório mensal — novembro", sentAt: "2025-11-30", status: "enviado", recipients: 42, openRate: 0.92 },
  { id: "c3", tenantId: T, channel: "push", audience: "Todos", subject: "Lembrete: Encontro de Casais", sentAt: "2025-12-02", status: "enviado", recipients: 640, openRate: 0.71 },
  { id: "c4", tenantId: T, channel: "sms", audience: "Novos visitantes", subject: "Boas-vindas Nova Aliança", status: "agendado", recipients: 28 },
  { id: "c5", tenantId: T, channel: "email", audience: "Contribuintes", subject: "Recibo anual de doações", status: "rascunho", recipients: 214 },
];

export const pastoralCare: PastoralCareRecord[] = [
  { id: "p1", tenantId: T, personName: "Camila R.", type: "aconselhamento", status: "em_andamento", privacy: "confidencial", assignedTo: "Pra. Marta", openedAt: "2025-10-14", summary: "Acompanhamento familiar" },
  { id: "p2", tenantId: T, personName: "Anônimo #4821", type: "oracao", status: "aberto", privacy: "restrito", assignedTo: "Time de Intercessão", openedAt: "2025-12-01", summary: "Saúde" },
  { id: "p3", tenantId: T, personName: "Thiago M.", type: "visita", status: "aberto", privacy: "pastoral", assignedTo: "Pr. Daniel", openedAt: "2025-11-28", summary: "Retorno hospitalar" },
  { id: "p4", tenantId: T, personName: "Larissa P.", type: "acompanhamento", status: "concluido", privacy: "pastoral", assignedTo: "Pra. Marta", openedAt: "2025-09-05", summary: "Preparação para batismo" },
];

export const children: Child[] = [
  { id: "kid1", tenantId: T, name: "Miguel Souza", birthDate: "2019-03-04", classroom: "Explorers 5-6", guardians: ["Ana B. Souza"], allergies: "Amendoim", pickupCode: "MS-8412", checkedIn: true, observations: "Uso de bombinha" },
  { id: "kid2", tenantId: T, name: "Helena Oliveira", birthDate: "2020-08-19", classroom: "Little Kids 3-4", guardians: ["Mariana O.", "Rafael C."], pickupCode: "HO-2214", checkedIn: true },
  { id: "kid3", tenantId: T, name: "Davi Martins", birthDate: "2018-11-27", classroom: "Explorers 5-6", guardians: ["Thiago M."], pickupCode: "DM-9931", checkedIn: false },
  { id: "kid4", tenantId: T, name: "Alice Rocha", birthDate: "2021-01-11", classroom: "Berçário 0-2", guardians: ["Isabela R."], allergies: "Lactose", pickupCode: "AR-1108", checkedIn: true },
];

export const auditLogs: AuditLog[] = [
  { id: "a1", tenantId: T, actor: "Pr. Daniel", action: "Atualizou perfil de membro", entity: "person-3", at: "2025-12-02T14:12:00", ip: "189.14.22.9" },
  { id: "a2", tenantId: T, actor: "Tesouraria", action: "Exportou relatório financeiro", entity: "finance/2025-11", at: "2025-12-01T09:44:00", ip: "189.14.22.9" },
  { id: "a3", tenantId: T, actor: "Secretaria", action: "Cadastrou visitante", entity: "visitor-22", at: "2025-11-30T18:20:00" },
  { id: "a4", tenantId: T, actor: "Sistema", action: "Backup automático concluído", entity: "backup/daily", at: "2025-11-30T03:00:00" },
];

export const attendanceSeries = [
  { week: "Sem 1", presentes: 480, visitantes: 32 },
  { week: "Sem 2", presentes: 512, visitantes: 41 },
  { week: "Sem 3", presentes: 498, visitantes: 28 },
  { week: "Sem 4", presentes: 545, visitantes: 46 },
  { week: "Sem 5", presentes: 561, visitantes: 39 },
  { week: "Sem 6", presentes: 590, visitantes: 52 },
  { week: "Sem 7", presentes: 620, visitantes: 48 },
  { week: "Sem 8", presentes: 604, visitantes: 44 },
];

export const donationSeries = [
  { month: "Jun", dizimos: 84000, ofertas: 18000, campanhas: 6200 },
  { month: "Jul", dizimos: 91200, ofertas: 21400, campanhas: 8400 },
  { month: "Ago", dizimos: 88600, ofertas: 19800, campanhas: 12800 },
  { month: "Set", dizimos: 96400, ofertas: 24200, campanhas: 15200 },
  { month: "Out", dizimos: 102800, ofertas: 26800, campanhas: 22400 },
  { month: "Nov", dizimos: 108400, ofertas: 28800, campanhas: 31200 },
];
