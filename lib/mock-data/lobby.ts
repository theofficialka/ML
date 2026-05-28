import { Announcement, DailyChallenge, FriendStatus, GameMode, MatchQuestion, OpenMatch, RankProgress, RankedMatch, SeasonProgress, UserProfile } from '@/lib/types/lobby';
export const user: UserProfile = { id:'u1', username:'ScoreSeeker', avatarUrl:'', currentRank:'Diamond III', skillRating:2487, seasonLevel:27, xp:650, xpToNextLevel:1000 };
export const rank: RankProgress = { currentRank:'Diamond III', skillRating:2487, nextRank:'Diamond II', nextRankTarget:2800 };
export const season: SeasonProgress = { seasonLabel:'Season 5', passName:'Season Pass', level:27, xp:650, xpToNextLevel:1000 };
export const challenge: DailyChallenge = { id:'c1', text:'Get 15 questions correct in any mode', progress:7, goal:15, timeRemaining:'10h 24m remaining', xpReward:250, tokenReward:100 };
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

const demoQuestions: MatchQuestion[] = [
  { id:'q1', subject:'Math', domain:'Algebra', difficulty:'Medium', prompt:'A line in the xy-plane passes through the points (2, 7) and (6, 19). Which equation represents the line?', choices:[{id:'a',label:'A',text:'y = 2x + 3'},{id:'b',label:'B',text:'y = 3x + 1'},{id:'c',label:'C',text:'y = 4x - 1'},{id:'d',label:'D',text:'y = 6x - 5'}], correctAnswerId:'b', explanation:'Slope between points is 3 and using (2,7) gives intercept 1.', strategyFeedback:{primaryMethod:'Manual Algebra',alternateMethod:'Desmos Check',explanation:'Find the slope first: (19 − 7) / (6 − 2) = 3. Then substitute (2, 7) to find the intercept: 7 = 3(2) + b, so b = 1. The equation is y = 3x + 1.'}},
  { id:'q2', subject:'Reading & Writing', domain:'Transitions', difficulty:'Medium', passage:'Mina reviewed each answer choice carefully. _____, she selected the option that preserved the paragraph’s logical flow.', prompt:'Which transition best completes the sentence?', choices:[{id:'a2',label:'A',text:'However'},{id:'b2',label:'B',text:'Therefore'},{id:'c2',label:'C',text:'Meanwhile'},{id:'d2',label:'D',text:'For example'}], correctAnswerId:'b2', explanation:'The second clause is a result of reviewing carefully, so a cause-to-result transition fits.', strategyFeedback:{primaryMethod:'Logic Link Scan',alternateMethod:'Sentence Swap',explanation:'Identify relationship first: action then result. “Therefore” signals result and maintains coherence.'}},
];

export const demoRankedMatch: RankedMatch = { id:'ranked-demo-1', mode:'Ranked 1v1', subject:'Mixed', totalQuestions:10, players:{ you:{id:'u1',username:'ScoreSeeker',rank:'Diamond III',skillRating:2487}, opponent:{id:'u2',username:'QuantKnight',rank:'Diamond II',skillRating:2526}}, questions:demoQuestions, progress:{currentQuestionIndex:0,totalQuestions:10,yourCorrectCount:0,opponentCorrectCount:0}};
