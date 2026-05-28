'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Crown,
  Flame,
  Gem,
  Hourglass,
  Medal,
  Shield,
  Sparkles,
  Swords,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import {
  getAnnouncements,
  getFriendsOnline,
  getLobbyDashboard,
  getOpenMatches,
  startRankedQueue,
} from '@/lib/services/lobby-service';
import {
  Announcement,
  FriendStatus,
  MatchmakingPreferences,
  OpenMatch,
  QueueState,
} from '@/lib/types/lobby';

const navItems = ['Lobby', 'Ranked', 'Leaderboard', 'My Stats', 'Store'];
const sideNav = [
  { label: 'Find Match', icon: Swords },
  { label: 'Practice', icon: Target },
  { label: 'Study Hub', icon: Sparkles },
  { label: 'Tournaments', icon: Trophy },
  { label: 'Friends', icon: Users },
];

const modeStyles = {
  ranked: 'from-blue-600/25 to-violet-500/10 border-blue-400/60 hover:shadow-blue-500/30',
  practice: 'from-emerald-600/20 to-emerald-400/10 border-emerald-400/60 hover:shadow-emerald-500/20',
  quick: 'from-violet-600/20 to-fuchsia-500/10 border-violet-400/60 hover:shadow-violet-500/25',
  custom: 'from-amber-500/20 to-yellow-300/10 border-amber-400/60 hover:shadow-amber-400/20',
};

const ModeIcon = ({ id }: { id: string }) => {
  const iconMap = {
    ranked: Swords,
    practice: Target,
    quick: Zap,
    custom: Trophy,
  } as const;
  const Icon = iconMap[id as keyof typeof iconMap] ?? Shield;
  return (
    <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-slate-900/90 shadow-[0_0_30px_rgba(59,130,246,.20)]">
      <div className="absolute inset-1 rounded-xl border border-white/10" />
      <Icon className="h-8 w-8" />
    </div>
  );
};

const RankEmblem = () => (
  <div className="mx-auto grid h-24 w-24 place-items-center rounded-2xl bg-gradient-to-br from-blue-500/35 via-indigo-500/25 to-violet-500/35 shadow-[0_0_35px_rgba(99,102,241,.45)] ring-1 ring-blue-300/30">
    <Gem className="h-11 w-11 text-blue-200" />
  </div>
);

export default function LobbyPage() {
  const [data, setData] = useState<any>(null);
  const [matches, setMatches] = useState<OpenMatch[]>([]);
  const [friends, setFriends] = useState<FriendStatus[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [queueState, setQueueState] = useState<QueueState>('idle');
  const router = useRouter();
  const [matchCountdown, setMatchCountdown] = useState(3);
  const [prefs, setPrefs] = useState<MatchmakingPreferences>({
    subject: 'Mixed',
    format: '1v1',
    matchLength: 'Standard',
    ranked: true,
  });
  const [showCustom, setShowCustom] = useState(false);
  const [joinTarget, setJoinTarget] = useState<OpenMatch | undefined>();

  useEffect(() => {
    (async () => {
      setData(await getLobbyDashboard());
      setMatches(await getOpenMatches());
      setFriends(await getFriendsOnline());
      setAnnouncements(await getAnnouncements());
    })();
  }, []);

  const srProgress = useMemo(
    () => ((data?.rank.skillRating ?? 0) / (data?.rank.nextRankTarget ?? 1)) * 100,
    [data],
  );

  useEffect(() => {
    if (queueState !== 'found') return;
    setMatchCountdown(3);
    const t1 = setTimeout(() => setMatchCountdown(2), 1000);
    const t2 = setTimeout(() => setMatchCountdown(1), 2000);
    const t3 = setTimeout(() => router.push('/match/ranked-demo'), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [queueState, router]);

  if (!data) return <div className="p-10 text-lg">Loading lobby...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(29,78,216,.22),transparent_40%),radial-gradient(circle_at_85%_15%,rgba(124,58,237,.20),transparent_35%),linear-gradient(180deg,#020617_0%,#020617_45%,#030712_100%)]" />

      <nav className="sticky top-0 z-30 h-[72px] border-b border-slate-700/60 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-[1900px] items-center justify-between px-6">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 shadow-[0_0_22px_rgba(59,130,246,.55)]"><span className="text-xl font-bold">M</span></div>
              <div>
                <p className="text-xl font-semibold tracking-wide">ModuLeague</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Compete. Improve. Climb.</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8 text-[15px]">
              {navItems.map((item) => (
                <button key={item} className={`relative pb-1 ${item === 'Lobby' ? 'text-blue-200' : 'text-slate-300 hover:text-slate-100'}`}>
                  {item}
                  {item === 'Lobby' && <span className="absolute -bottom-[13px] left-0 h-[2px] w-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,.8)]" />}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="grid h-10 w-10 place-items-center rounded-lg border border-slate-700 bg-slate-900/80 hover:border-blue-400/60"><Bell className="h-5 w-5" /></button>
            <div className="h-10 w-10 rounded-full border-2 border-blue-300/40 bg-gradient-to-br from-slate-600 to-slate-800" />
            <div className="hidden sm:block">
              <p className="text-sm font-medium">ScoreSeeker</p>
              <p className="text-xs text-violet-300">Diamond III</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </nav>

      <main className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1900px] grid-cols-1 gap-6 p-6 xl:grid-cols-[265px_1fr_300px]">
        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/65 p-4">
            {sideNav.map(({ label, icon: Icon }) => (
              <button key={label} className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${label === 'Find Match' ? 'border-l-2 border-blue-400 bg-blue-500/15 text-blue-100' : 'hover:bg-slate-800/80 text-slate-300'}`}>
                <Icon className="h-5 w-5" />{label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-500/15 to-slate-900/70 p-5 shadow-[0_0_30px_rgba(139,92,246,.20)]">
            <div className="mb-3 flex items-center justify-between"><p className="text-[11px] font-semibold tracking-[0.16em] text-violet-200">SEASON 5</p><Crown className="h-4 w-4 text-violet-300" /></div>
            <p className="text-lg font-semibold">Season Pass</p>
            <p className="mt-1 text-sm text-slate-300">Level 27</p>
            <div className="mt-3 h-2.5 rounded-full bg-slate-800"><div className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: `${(data.season.xp / data.season.xpToNextLevel) * 100}%` }} /></div>
            <p className="mt-2 text-xs text-slate-300">{data.season.xp} / {data.season.xpToNextLevel} XP</p>
            <button className="mt-4 w-full rounded-lg border border-violet-300/30 bg-violet-500/10 py-2.5 text-sm font-medium hover:bg-violet-400/20">View Battle Pass</button>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/75 p-5">
            <div className="mb-2 flex items-center justify-between"><p className="text-[11px] font-semibold tracking-[0.16em] text-slate-200">DAILY CHALLENGE</p><span className="flex items-center gap-1 text-xs text-emerald-300"><Hourglass className="h-3.5 w-3.5" />10h 24m</span></div>
            <p className="text-sm text-slate-200">Get 15 questions correct in any mode</p>
            <p className="mt-2 text-xs text-slate-400">7 / 15</p>
            <div className="mt-2 h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-emerald-400" style={{ width: '46%' }} /></div>
            <p className="mt-3 text-xs text-slate-300">Rewards: <span className="text-blue-300">250 XP</span> • <span className="text-amber-300">100 tokens</span></p>
            <button className="mt-4 w-full rounded-lg border border-slate-600 py-2.5 text-sm hover:border-blue-400/60 hover:text-blue-100">View All Challenges</button>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-500/14 to-violet-500/10 p-6">
            <h1 className="text-3xl font-semibold">Welcome back, ScoreSeeker</h1>
            <p className="mt-1 text-slate-300">Ready to climb the ranks?</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-orange-300/30 bg-orange-500/10 px-3 py-1 text-orange-200"><Flame className="mr-1 inline h-3.5 w-3.5" />4-match win streak</span>
              <span className="rounded-full border border-blue-300/30 bg-blue-500/10 px-3 py-1 text-blue-200">+42 SR this week</span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {data.modes.map((mode: any) => (
              <motion.button
                key={mode.id}
                whileHover={{ y: -5 }}
                onClick={() => (mode.id === 'ranked' ? setQueueState('selecting') : mode.id === 'custom' ? setShowCustom(true) : null)}
                className={`group min-h-[300px] rounded-2xl border bg-gradient-to-b p-5 text-left shadow-[0_18px_40px_rgba(2,6,23,.45)] transition ${modeStyles[mode.id as keyof typeof modeStyles]}`}
              >
                <div className="flex items-start justify-between"><ModeIcon id={mode.id} />{mode.id === 'ranked' && <span className="rounded-full bg-blue-500/20 px-2 py-1 text-[10px] font-semibold tracking-wide text-blue-200">RECOMMENDED</span>}</div>
                <h3 className="mt-5 text-xl font-semibold">{mode.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{mode.description}</p>
                <p className="mt-4 text-xs text-slate-300">Math • Reading & Writing • Mixed</p>
                <div className="mt-auto flex items-center justify-between pt-8 text-sm"><span className="text-slate-200">{mode.playerCount.toLocaleString()} active</span><ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" /></div>
              </motion.button>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5">
            <h2 className="mb-4 text-lg font-semibold tracking-wide">OPEN MATCHES</h2>
            <div className="hidden md:block">
              <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr_0.8fr] border-b border-slate-700/80 pb-2 text-[11px] font-semibold tracking-[0.14em] text-slate-400"><p>MODE</p><p>PLAYERS</p><p>SUBJECT</p><p>FORMAT</p><p>WAITING</p><p>ACTION</p></div>
              {matches.map((m) => (
                <div key={m.id} className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr_0.8fr] items-center border-b border-slate-800/80 py-3 text-sm hover:bg-slate-800/40">
                  <div className="flex items-center gap-3"><div className={`h-8 w-8 rounded-lg ${m.mode.includes('Ranked') ? 'bg-blue-500/20 text-blue-200' : m.mode.includes('Practice') ? 'bg-emerald-500/20 text-emerald-200' : 'bg-amber-500/20 text-amber-200'} grid place-items-center`}><Shield className="h-4 w-4" /></div>{m.mode}</div>
                  <div className="flex -space-x-2">{Array.from({ length: m.players }).map((_, i) => <div key={i} className="h-7 w-7 rounded-full border border-slate-600 bg-slate-700" />)}<span className="ml-3 text-xs text-slate-400">{m.players}/{m.maxPlayers}</span></div>
                  <span className="text-slate-200">{m.subject}</span><span className="text-slate-300">{m.matchType}</span><span className="text-slate-400">{m.createdAt}</span>
                  <button onClick={() => setJoinTarget(m)} className="rounded-md border border-blue-400/50 px-3 py-1.5 text-blue-200 hover:bg-blue-500/15">Join</button>
                </div>
              ))}
            </div>
            <div className="space-y-3 md:hidden">{matches.map((m) => <div key={m.id} className="rounded-xl border border-slate-700 p-3"><p>{m.mode}</p><p className="text-xs text-slate-400">{m.subject} • {m.matchType} • {m.createdAt}</p><button className="mt-2 text-blue-300" onClick={() => setJoinTarget(m)}>Join</button></div>)}</div>
            <button className="mt-4 w-full rounded-lg border border-slate-600 py-2.5 text-sm hover:border-blue-400/60 hover:text-blue-100">Load More Matches</button>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-blue-400/25 bg-gradient-to-br from-indigo-500/15 to-slate-900/85 p-5">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-300">YOUR RANK</p>
            <div className="mt-3"><RankEmblem /></div>
            <p className="mt-4 text-xl font-semibold">Diamond III</p>
            <p className="text-sm text-slate-300">2,487 SR</p>
            <p className="mt-1 text-xs text-slate-400">Next Rank: Diamond II</p>
            <div className="mt-3 h-2.5 rounded-full bg-slate-800"><div className="h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" style={{ width: `${srProgress}%` }} /></div>
            <p className="mt-2 text-xs text-slate-300">2,487 / 2,800 SR</p>
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5">
            <h3 className="mb-3 text-lg font-semibold">Friends Online</h3>
            {friends.map((f) => {
              const dot = f.status === 'Online' ? 'bg-emerald-400' : f.status === 'Offline' ? 'bg-slate-500' : 'bg-sky-400';
              return <div key={f.id} className="mb-2 flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-800/60"><div className="flex items-center gap-3"><div className="h-8 w-8 rounded-full bg-slate-700" /><div><p className="text-sm">{f.username}</p><p className="text-xs text-slate-400">{f.status}</p></div></div><span className={`h-2.5 w-2.5 rounded-full ${dot}`} /></div>;
            })}
            <button className="mt-3 w-full rounded-lg border border-slate-600 py-2.5 text-sm hover:border-blue-400/60">View All Friends</button>
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5">
            <div className="mb-2 flex items-center justify-between"><h3 className="text-lg font-semibold">Announcements</h3><button className="text-xs text-blue-300">View All</button></div>
            {announcements.map((a, idx) => <div key={a.id} className="mb-2 rounded-lg border border-slate-800/80 bg-slate-950/50 p-3"><div className="mb-1 flex items-center gap-2">{idx === 0 ? <Medal className="h-4 w-4 text-violet-300" /> : <Sparkles className="h-4 w-4 text-blue-300" />}<p className="text-sm font-medium">{a.title}</p></div><p className="text-xs text-slate-400">{a.description}</p><p className="mt-1 text-[11px] text-slate-500">{a.timestamp}</p></div>)}
          </div>
        </aside>
      </main>

      <AnimatePresence>{queueState === 'selecting' && <div className="fixed inset-0 z-40 grid place-items-center bg-black/65 p-4"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl rounded-2xl border border-blue-400/30 bg-slate-950/95 p-6 shadow-[0_0_50px_rgba(59,130,246,.2)]"><h3 className="text-xl font-semibold">Find a Ranked Match</h3><p className="mt-1 text-sm text-slate-400">Ranked matches affect your Skill Rating. Accuracy is weighted most heavily, with speed as a secondary factor.</p><div className="mt-4 grid gap-3"><select className="rounded-lg border border-slate-700 bg-slate-900 p-3" value={prefs.subject} onChange={(e) => setPrefs({ ...prefs, subject: e.target.value as any })}><option>Math</option><option>Reading & Writing</option><option>Mixed</option></select><select className="rounded-lg border border-slate-700 bg-slate-900 p-3" value={prefs.format} onChange={(e) => setPrefs({ ...prefs, format: e.target.value as any })}><option>1v1</option><option disabled>Team Match (Coming Soon)</option></select><select className="rounded-lg border border-slate-700 bg-slate-900 p-3" value={prefs.matchLength} onChange={(e) => setPrefs({ ...prefs, matchLength: e.target.value as any })}><option>Sprint</option><option>Standard</option><option>Full Arena</option></select></div><div className="mt-5 flex gap-2"><button onClick={async () => { setQueueState('searching'); await startRankedQueue(prefs); setTimeout(()=>setQueueState('found'),2600); }} className="rounded-lg bg-blue-600 px-4 py-2.5 font-medium hover:bg-blue-500">Start Queue</button><button onClick={() => setQueueState('idle')} className="rounded-lg border border-slate-600 px-4 py-2.5">Cancel</button></div></motion.div></div>}</AnimatePresence>
      <AnimatePresence>{queueState === 'searching' && <div className="fixed inset-0 z-40 grid place-items-center bg-black/65 p-4"><div className="w-full max-w-md rounded-2xl border border-blue-400/25 bg-slate-950 p-6 text-center"><p className="text-lg font-medium animate-pulse">Searching for an opponent...</p><p className="mt-2 text-sm text-slate-400">Ranked {prefs.format} • {prefs.subject} • {prefs.matchLength} — {prefs.matchLength==='Sprint'?'5':'10'} questions</p><p className="text-xs text-blue-300 mt-1">Estimated wait: &lt; 20 seconds</p><button className="mt-5 rounded-lg border border-slate-600 px-4 py-2.5" onClick={() => setQueueState('cancelled')}>Cancel Queue</button></div></div>}</AnimatePresence>
      <AnimatePresence>{queueState === 'found' && <div className="fixed inset-0 z-40 grid place-items-center bg-black/70 p-4"><div className="w-full max-w-2xl rounded-2xl border border-blue-300/35 bg-slate-950 p-6"><h3 className="text-center text-2xl font-semibold text-blue-200">MATCH FOUND</h3><div className="my-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4"><div className="text-center"><p className="text-lg">ScoreSeeker</p><p className="text-sm text-violet-300">Diamond III</p><p className="text-xs text-slate-400">2,487 SR</p></div><div className="text-xl text-slate-300">VS</div><div className="text-center"><p className="text-lg">QuantKnight</p><p className="text-sm text-violet-300">Diamond II</p><p className="text-xs text-slate-400">2,526 SR</p></div></div><p className="text-center text-sm text-slate-300">Ranked 1v1 • {prefs.subject} • 10 Questions</p><p className="mt-3 text-center text-blue-300">Match begins in {matchCountdown}...</p></div></div>}</AnimatePresence>
      <AnimatePresence>{showCustom && <div className="fixed inset-0 z-40 grid place-items-center bg-black/65 p-4"><div className="w-full max-w-md rounded-2xl border border-amber-400/25 bg-slate-950 p-6"><h3 className="text-xl font-semibold">Create Custom Match</h3><p className="mt-2 text-sm text-slate-400">Custom lobbies will connect to backend multiplayer sessions soon.</p><button className="mt-5 rounded-lg border border-slate-600 px-4 py-2.5" onClick={() => setShowCustom(false)}>Close</button></div></div>}</AnimatePresence>
      <AnimatePresence>{joinTarget && <div className="fixed inset-0 z-40 grid place-items-center bg-black/65 p-4"><div className="w-full max-w-md rounded-2xl border border-blue-400/25 bg-slate-950 p-6"><h3 className="text-xl font-semibold">Join {joinTarget.mode}?</h3><p className="mt-2 text-sm text-slate-400">Multiplayer connection will be attached during backend integration.</p><div className="mt-5 flex gap-2"><button className="rounded-lg bg-blue-600 px-4 py-2.5" onClick={() => setJoinTarget(undefined)}>Confirm</button><button className="rounded-lg border border-slate-600 px-4 py-2.5" onClick={() => setJoinTarget(undefined)}>Cancel</button></div></div></div>}</AnimatePresence>
    </div>
  );
}
