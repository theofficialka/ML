import { announcements, challenge, friends, modes, openMatches, rank, season, user } from '@/lib/mock-data/lobby';
import { MatchmakingPreferences } from '@/lib/types/lobby';
const delay = () => new Promise((r)=>setTimeout(r,150));
export async function getCurrentUser(){ await delay(); return user; }
export async function getLobbyDashboard(){ await delay(); return { user, rank, season, challenge, modes }; }
export async function getOpenMatches(){ await delay(); return openMatches; }
export async function startRankedQueue(preferences: MatchmakingPreferences){ await delay(); return { queueId:'q_1', preferences, eta:'00:35' }; }
export async function cancelQueue(){ await delay(); return { cancelled:true }; }
export async function joinMatch(matchId: string){ await delay(); return { matchId, status:'pending_backend_connection' as const }; }
export async function getFriendsOnline(){ await delay(); return friends; }
export async function getAnnouncements(){ await delay(); return announcements; }
