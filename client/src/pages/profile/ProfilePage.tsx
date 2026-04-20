import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/entities/user';
import { useHabitStore } from '@/entities/habit';
import { Card, Button } from '@/shared/ui';

const formatDate = (value?: string) => {
  if (!value) return 'Not available';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not available';

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const ProfilePage = () => {
  const { user } = useAuthStore();
  const { habits } = useHabitStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [navigate, user]);

  const stats = useMemo(() => {
    const visibleHabits = habits.filter((habit) => !habit.deletedAt);
    const totalCheckins = visibleHabits.reduce((sum, habit) => sum + habit.completedDates.length, 0);
    const activeHabits = visibleHabits.filter((habit) => habit.completedDates.length > 0).length;
    const bestStreak = visibleHabits.reduce((max, habit) => Math.max(max, habit.completedDates.length), 0);

    return { activeHabits, bestStreak, totalCheckins, visibleHabitsCount: visibleHabits.length };
  }, [habits]);

  if (!user) return null;

  return (
    <div className="min-h-screen app-shell px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <main className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.32em] text-muted">
              Account hub
            </div>
            <h1 className="mt-2 font-display text-4xl tracking-tight text-dark">Profile</h1>
          </div>
          <Button type="button" variant="secondary" onClick={() => navigate('/')}>
            Back to dashboard
          </Button>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-white/80 bg-white/82 p-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.32em] text-muted">
              Identity
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-[1.6rem] bg-gradient-to-br from-primary to-accent text-2xl font-bold text-white shadow-glow">
                {user.username.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <div className="font-display text-3xl text-dark">{user.username}</div>
                <div className="mt-1 text-sm text-muted">Authenticated habit tracker account</div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] bg-surface/80 p-4 shadow-soft">
                <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-muted">
                  User ID
                </div>
                <div className="mt-2 break-all text-sm font-semibold text-dark">{user.id}</div>
              </div>
              <div className="rounded-[1.4rem] bg-surface/80 p-4 shadow-soft">
                <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-muted">
                  Joined
                </div>
                <div className="mt-2 text-sm font-semibold text-dark">{formatDate(user.createdAt)}</div>
              </div>
            </div>
          </Card>

          <Card className="border-white/80 bg-white/82 p-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.32em] text-muted">
              Account stats
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-[1.4rem] bg-surface/80 p-4 shadow-soft">
                <div className="font-display text-3xl text-dark">{stats.visibleHabitsCount}</div>
                <div className="mt-1 text-sm text-muted">habits created</div>
              </div>
              <div className="rounded-[1.4rem] bg-surface/80 p-4 shadow-soft">
                <div className="font-display text-3xl text-dark">{stats.activeHabits}</div>
                <div className="mt-1 text-sm text-muted">active habits</div>
              </div>
              <div className="rounded-[1.4rem] bg-surface/80 p-4 shadow-soft">
                <div className="font-display text-3xl text-dark">{stats.bestStreak}</div>
                <div className="mt-1 text-sm text-muted">best streak</div>
              </div>
            </div>

            <div className="mt-6 rounded-[1.6rem] bg-gradient-to-r from-primary to-dark p-5 text-white shadow-glow">
              <div className="text-sm font-bold">Total completed check-ins</div>
              <div className="mt-2 font-display text-4xl">{stats.totalCheckins}</div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};
