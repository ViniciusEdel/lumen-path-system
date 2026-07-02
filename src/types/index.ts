// Central domain types for EcclesiaOS. Every entity is scoped to a tenant.
// These interfaces mirror what the future FastAPI backend will return.

export type ID = string;
export type ISODate = string;

export type Role =
  | "owner"
  | "admin"
  | "pastor"
  | "secretary"
  | "treasurer"
  | "ministry_leader"
  | "cell_leader"
  | "volunteer"
  | "member"
  | "visitor";

export type Permission =
  | "people.read" | "people.write"
  | "finance.read" | "finance.write"
  | "children.read" | "children.write"
  | "pastoral.read" | "pastoral.write"
  | "communications.send"
  | "settings.manage";

export interface Tenant {
  id: ID;
  name: string;
  slug: string;
  plan: "trial" | "starter" | "growth" | "enterprise";
  status: "active" | "trial" | "blocked";
  logoUrl?: string;
  city: string;
  state: string;
  members: number;
  createdAt: ISODate;
}

export interface User {
  id: ID;
  tenantId: ID;
  name: string;
  email: string;
  avatarUrl?: string;
  roles: Role[];
  lastLogin?: ISODate;
}

export interface Person {
  id: ID;
  tenantId: ID;
  name: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  birthDate?: ISODate;
  gender?: "M" | "F";
  address?: { city: string; neighborhood: string };
  status: "member" | "visitor" | "inactive";
  memberSince?: ISODate;
  tags: string[];
  familyId?: ID;
  cellId?: ID;
  ministries: ID[];
  notes?: string;
}

export interface Family {
  id: ID;
  tenantId: ID;
  name: string;
  memberIds: ID[];
  headOfFamily?: ID;
}

export type VisitorStage =
  | "novo"
  | "primeiro_contato"
  | "convidado_integracao"
  | "em_celula"
  | "pedido_membresia"
  | "membro_ativo";

export interface Visitor {
  id: ID;
  tenantId: ID;
  name: string;
  phone?: string;
  origin: "culto" | "celula" | "site" | "indicacao" | "evento";
  firstVisit: ISODate;
  stage: VisitorStage;
  assignedTo?: ID;
  nextAction?: string;
  notes?: string;
}

export interface Group {
  id: ID;
  tenantId: ID;
  name: string;
  neighborhood: string;
  leader: string;
  members: number;
  multiplierScore: number; // 0-100
  weekday: string;
  time: string;
  status: "ativa" | "em_multiplicacao" | "pausada";
}

export interface Ministry {
  id: ID;
  tenantId: ID;
  name: string;
  leader: string;
  volunteers: number;
  color: string;
  icon?: string;
}

export interface ScheduleSlot {
  id: ID;
  ministryId: ID;
  personName: string;
  role: string;
  status: "confirmado" | "pendente" | "trocado";
  date: ISODate;
}

export interface Event {
  id: ID;
  tenantId: ID;
  title: string;
  type: "culto" | "curso" | "conferencia" | "celula" | "evento";
  date: ISODate;
  time: string;
  location: string;
  expected: number;
  confirmed: number;
  color: string;
}

export interface Attendance {
  id: ID;
  eventId: ID;
  present: number;
  visitors: number;
  date: ISODate;
}

export interface Donation {
  id: ID;
  tenantId: ID;
  personName: string;
  amount: number;
  type: "dizimo" | "oferta" | "campanha" | "missoes";
  method: "pix" | "cartao" | "boleto" | "dinheiro";
  date: ISODate;
  campaign?: string;
}

export interface FinancialTransaction {
  id: ID;
  tenantId: ID;
  kind: "receita" | "despesa";
  category: string;
  amount: number;
  date: ISODate;
  description: string;
}

export interface Communication {
  id: ID;
  tenantId: ID;
  channel: "email" | "whatsapp" | "sms" | "push";
  audience: string;
  subject: string;
  sentAt?: ISODate;
  status: "rascunho" | "agendado" | "enviado" | "falhou";
  recipients: number;
  openRate?: number;
}

export interface PastoralCareRecord {
  id: ID;
  tenantId: ID;
  personName: string;
  type: "oracao" | "aconselhamento" | "visita" | "acompanhamento";
  status: "aberto" | "em_andamento" | "concluido";
  privacy: "restrito" | "confidencial" | "pastoral";
  assignedTo: string;
  openedAt: ISODate;
  summary: string;
}

export interface Child {
  id: ID;
  tenantId: ID;
  name: string;
  birthDate: ISODate;
  classroom: string;
  guardians: string[];
  allergies?: string;
  pickupCode: string;
  checkedIn: boolean;
  observations?: string;
}

export interface Consent {
  id: ID;
  personId: ID;
  type: "imagem" | "dados" | "comunicacao_email" | "comunicacao_wpp";
  granted: boolean;
  date: ISODate;
}

export interface AuditLog {
  id: ID;
  tenantId: ID;
  actor: string;
  action: string;
  entity: string;
  at: ISODate;
  ip?: string;
}
