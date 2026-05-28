import { announcements, challenge, demoRankedMatch, friends, modes, openMatches, rank, season, user } from '@/lib/mock-data/lobby';
import { MatchmakingPreferences, QuestionResult, RankedMatch, SubmittedAnswer } from '@/lib/types/lobby';
const delay = (ms=150) => new Promise((r)=>setTimeout(r,ms));
export async function getCurrentUser(){ await delay(); return user; }
export async function getLobbyDashboard(){ await delay(); return { user, rank, season, challenge, modes }; }
export async function getOpenMatches(){ await delay(); return openMatches; }
export async function startRankedQueue(preferences: MatchmakingPreferences){ await delay(300); return { queueId:'q_1', preferences, eta:'00:18' }; }
export async function cancelRankedQueue(){ await delay(120); return { cancelled:true }; }
export async function simulateMatchFound(){ await delay(2500); return { found:true, opponent: demoRankedMatch.players.opponent }; }
export async function cancelQueue(){ return cancelRankedQueue(); }
export async function joinMatch(matchId: string){ await delay(); return { matchId, status:'pending_backend_connection' as const }; }
export async function getFriendsOnline(){ await delay(); return friends; }
export async function getAnnouncements(){ await delay(); return announcements; }

export async function getDemoRankedMatch(): Promise<RankedMatch> { await delay(250); return structuredClone(demoRankedMatch); }
export async function submitAnswer(matchId: string, questionId: string, answerId: string): Promise<{submitted: SubmittedAnswer; result: QuestionResult}> {
  await delay(1200);
  const question = demoRankedMatch.questions.find((q)=>q.id===questionId)!;
  const yourCorrect = question.correctAnswerId === answerId;
  const result: QuestionResult = { questionId, yourCorrect, opponentCorrect:true, yourTimeSeconds: questionId==='q1'?21.4:24.8, opponentTimeSeconds: questionId==='q1'?28.7:22.9, speedEdgeText: yourCorrect && questionId==='q1' ? 'Speed advantage: +1 round edge' : 'No speed edge this round' };
  return { submitted: { questionId, answerId, timeTakenSeconds: result.yourTimeSeconds }, result };
}
export async function advanceToNextQuestion(currentIndex: number){ await delay(180); return currentIndex + 1; }
