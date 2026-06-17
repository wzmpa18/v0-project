"use client"

const API_BASE = typeof window !== 'undefined' 
  ? (window.env?.NEXT_PUBLIC_API_URL || 'https://www.yandao.vip')
  : 'https://www.yandao.vip';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export async function sendVerificationCode(email: string): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/api/send-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  return response.json();
}

export async function register(email: string, password: string, code: string, inviteCode?: string): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, code, inviteCode }),
  });
  return response.json();
}

export async function login(email: string, password: string): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function getUserInfo(email: string): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/api/user-info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  return response.json();
}

export async function getDownline(userId: string, level?: number): Promise<ApiResponse<Array<{id: string, email: string, level: number}>>> {
  const response = await fetch(`${API_BASE}/api/get-downline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, level }),
  });
  return response.json();
}

export async function getDownlineStats(userId: string): Promise<ApiResponse<{level1: number, level2: number, total: number}>> {
  const response = await fetch(`${API_BASE}/api/get-downline-stats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  return response.json();
}

export async function getInviteUrl(userId: string): Promise<ApiResponse<{inviteCode: string, inviteUrl: string, qrCodeUrl: string}>> {
  const response = await fetch(`${API_BASE}/api/get-invite-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  return response.json();
}

export interface UserInfo {
  id: string;
  email: string;
  createdAt: number;
  inviteCode?: string;
  referrerId?: string | null;
}

export function saveUserToStorage(user: UserInfo, token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
}

export function getUserFromStorage(): UserInfo | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('user');
  return data ? JSON.parse(data) : null;
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function clearUserStorage(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('token') !== null;
}

export function getUrlInviteCode(): string | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  const match = hash.match(/[?&]invite=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}
