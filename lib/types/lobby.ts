export type Subject = 'Math' | 'Reading & Writing' | 'Mixed';
export type QueueState = 'idle' | 'selecting' | 'searching' | 'found' | 'matched' | 'cancelled';

export interface UserProfile { id: string; username: string; avatarUrl: string; currentRank: string; skillRating: number; seasonLevel: number; xp: number; xpToNextLevel: number; }
export interface RankProgress { currentRank: string; skillRating: number; nextRank: string; nextRankTarget: number; }
export interface SeasonProgress { seasonLabel: string; passName: string; level: number; xp: number; xpToNextLevel: number; }
export interface DailyChallenge { id: string; text: string; progress: number; goal: number; timeRemaining: string; xpReward: number; tokenReward: number; }
export interface GameMode { id: string; name: string; description: string; subjectAvailability: Subject[]; playerCount: number; accent: 'blue'|'green'|'purple'|'gold'; ranked: boolean; }
export interface OpenMatch { id: string; mode: string; subject: Subject; matchType: string; players: number; maxPlayers: number; createdAt: string; ranked: boolean; }
export interface FriendStatus { id: string; username: string; status: 'Online'|'In Match'|'In Lobby'|'Offline'; }
export interface Announcement { id: string; title: string; description: string; timestamp: string; }
export interface MatchmakingPreferences { subject: Subject; format: '1v1'|'Team Match'; matchLength: 'Sprint'|'Standard'|'Full Arena'; ranked: boolean; }

export interface MatchPlayer { id: string; username: string; rank: string; skillRating: number; }
export interface AnswerChoice { id: string; label: 'A'|'B'|'C'|'D'; text: string; }
export interface StrategyFeedback { primaryMethod: string; alternateMethod?: string; explanation: string; }
export interface MatchQuestion { id: string; subject: Exclude<Subject,'Mixed'>; domain: string; difficulty: 'Easy'|'Medium'|'Hard'; prompt: string; passage?: string; choices: AnswerChoice[]; correctAnswerId: string; explanation: string; strategyFeedback: StrategyFeedback; }
export interface SubmittedAnswer { questionId: string; answerId: string; timeTakenSeconds: number; }
export interface QuestionResult { questionId: string; yourCorrect: boolean; opponentCorrect: boolean; yourTimeSeconds: number; opponentTimeSeconds: number; speedEdgeText: string; }
export interface MatchProgress { currentQuestionIndex: number; totalQuestions: number; yourCorrectCount: number; opponentCorrectCount: number; }
export interface RankedMatch { id: string; mode: 'Ranked 1v1'; subject: Subject; totalQuestions: number; players: { you: MatchPlayer; opponent: MatchPlayer }; questions: MatchQuestion[]; progress: MatchProgress; }
