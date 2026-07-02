import { API_CONFIG } from "@/lib/api/config";
import { apiRequest, mockResponse } from "@/lib/api/client";
import * as mock from "@/mocks/data";
import type {
  Tenant, User, Person, Visitor, Group, Ministry, Event, Donation,
  Communication, PastoralCareRecord, Child, ScheduleSlot, FinancialTransaction,
} from "@/types";

// Each service exposes the same shape whether it's mocked or wired to FastAPI.
// To switch to the real API: flip API_CONFIG.useMocks to false in src/lib/api/config.ts.

export const authService = {
  async login(email: string, _password: string) {
    if (API_CONFIG.useMocks) return mockResponse({ token: "mock-jwt-token", user: { ...mock.currentUser, email } }, 400);
    return apiRequest<{ token: string; user: User }>("/auth/login", {
      method: "POST", body: { email, password: _password }, skipAuth: true,
    });
  },
  async listTenants() {
    if (API_CONFIG.useMocks) return mockResponse(mock.tenants);
    return apiRequest<Tenant[]>("/tenants");
  },
  async selectTenant(id: string) {
    if (typeof window !== "undefined") window.localStorage.setItem(API_CONFIG.tenantStorageKey, id);
    return mockResponse({ ok: true });
  },
  async me() {
    if (API_CONFIG.useMocks) return mockResponse(mock.currentUser);
    return apiRequest<User>("/auth/me");
  },
};

export const peopleService = {
  async list(): Promise<Person[]> {
    if (API_CONFIG.useMocks) return mockResponse(mock.people);
    return apiRequest("/people");
  },
  async get(id: string): Promise<Person | undefined> {
    if (API_CONFIG.useMocks) return mockResponse(mock.people.find(p => p.id === id));
    return apiRequest(`/people/${id}`);
  },
};

export const visitorsService = {
  async list(): Promise<Visitor[]> {
    if (API_CONFIG.useMocks) return mockResponse(mock.visitors);
    return apiRequest("/visitors");
  },
};

export const groupsService = {
  async list(): Promise<Group[]> {
    if (API_CONFIG.useMocks) return mockResponse(mock.groups);
    return apiRequest("/groups");
  },
};

export const ministriesService = {
  async list(): Promise<Ministry[]> {
    if (API_CONFIG.useMocks) return mockResponse(mock.ministries);
    return apiRequest("/ministries");
  },
  async schedules(): Promise<ScheduleSlot[]> {
    if (API_CONFIG.useMocks) return mockResponse(mock.schedules);
    return apiRequest("/schedules");
  },
};

export const eventsService = {
  async list(): Promise<Event[]> {
    if (API_CONFIG.useMocks) return mockResponse(mock.events);
    return apiRequest("/events");
  },
};

export const financeService = {
  async donations(): Promise<Donation[]> {
    if (API_CONFIG.useMocks) return mockResponse(mock.donations);
    return apiRequest("/finance/donations");
  },
  async transactions(): Promise<FinancialTransaction[]> {
    if (API_CONFIG.useMocks) return mockResponse(mock.transactions);
    return apiRequest("/finance/transactions");
  },
  async series() { return mockResponse(mock.donationSeries); },
};

export const communicationsService = {
  async list(): Promise<Communication[]> {
    if (API_CONFIG.useMocks) return mockResponse(mock.communications);
    return apiRequest("/communications");
  },
};

export const pastoralService = {
  async list(): Promise<PastoralCareRecord[]> {
    if (API_CONFIG.useMocks) return mockResponse(mock.pastoralCare);
    return apiRequest("/pastoral-care");
  },
};

export const childrenService = {
  async list(): Promise<Child[]> {
    if (API_CONFIG.useMocks) return mockResponse(mock.children);
    return apiRequest("/children");
  },
};

export const dashboardService = {
  async metrics() {
    return mockResponse({
      activeMembers: 842, weeklyVisitors: 48, attendance: 620,
      donationsMonth: 168400, activeCells: 34, volunteersScheduled: 96,
      attendanceSeries: mock.attendanceSeries,
      donationSeries: mock.donationSeries,
      auditLogs: mock.auditLogs,
    });
  },
};
