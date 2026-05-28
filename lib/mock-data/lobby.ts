import { Announcement, DailyChallenge, FriendStatus, GameMode, OpenMatch, RankProgress, SeasonProgress, UserProfile } from '@/lib/types/lobby';
export const user: UserProfile = { id:'u1', username:'ScoreSeeker', avatarUrl:'', currentRank:'Diamond III', skillRating:2487, seasonLevel:27, xp:650, xpToNextLevel:1000 };
export const rank: RankProgress = { currentRank:'Diamond III', skillRating:2487, nextRank:'Diamond II', nextRankTarget:2800 };
export const season: SeasonProgress = { seasonLabel:'Season 5', passName:'Season Pass', level:27, xp:650, xpToNextLevel:1000 };
export const challenge: DailyChallenge = { id:'c1', text:'Get 15 questions correct in any mode', progress:7, goal:15, timeRemaining:'18h 24m remaining', xpReward:250, tokenReward:40 };
export const modes: GameMode[] = [
{id:'ranked',name:'Ranked Match',description:'Compete in live SAT matches and climb the leaderboard.',subjectAvailability:['Math','Reading & Writing','Mixed'],playerCount:1248,accent:'blue',ranked:true},
{id:'practice',name:'Practice Match',description:'Hone your skills with unranked practice matches.',subjectAvailability:['Math','Reading & Writing','Mixed'],playerCount:862,accent:'green',ranked:false},
{id:'quick',name:'Quick Match',description:'Jump into a fast unranked match.',subjectAvailability:['Math','Reading & Writing','Mixed'],playerCount:593,accent:'purple',ranked:false},
{id:'custom',name:'Custom Match',description:'Create or join a custom match with friends.',subjectAvailability:['Math','Reading & Writing','Mixed'],playerCount:176,accent:'gold',ranked:false}
];
export const openMatches: OpenMatch[] = [
{id:'m1',mode:'Ranked Match',subject:'Reading & Writing',matchType:'1v1',players:1,maxPlayers:2,createdAt:'2m ago',ranked:true},
{id:'m2',mode:'Ranked Match',subject:'Mixed',matchType:'1v1',players:1,maxPlayers:2,createdAt:'4m ago',ranked:true},
{id:'m3',mode:'Practice Match',subject:'Math',matchType:'1v1',players:1,maxPlayers:2,createdAt:'6m ago',ranked:false},
{id:'m4',mode:'Practice Match',subject:'Mixed',matchType:'Team',players:2,maxPlayers:4,createdAt:'8m ago',ranked:false},
{id:'m5',mode:'Custom Match',subject:'Reading & Writing',matchType:'Friends',players:3,maxPlayers:4,createdAt:'12m ago',ranked:false}
];
export const friends: FriendStatus[]=[{id:'f1',username:'VerbalVirtuoso',status:'Online'},{id:'f2',username:'MathMastery',status:'In Match'},{id:'f3',username:'SAT_Scholar',status:'In Lobby'},{id:'f4',username:'LexileLegend',status:'Offline'}];
export const announcements: Announcement[]=[{id:'a1',title:'Season 5 is live!',description:'Compete now and earn exclusive rewards.',timestamp:'2h ago'},{id:'a2',title:'Double XP Weekend',description:'Earn 2x XP all weekend long.',timestamp:'1d ago'}];
