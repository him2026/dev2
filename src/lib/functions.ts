// Helper functions for phase calculations

export function getPhaseInfo(phase: string) {
  switch (phase?.toLowerCase()) {
    case 'menstrual':
      return { name: 'Menstrual Phase', color: '#FF7096', icon: 'fa-droplet' };
    case 'follicular':
      return { name: 'Follicular Phase', color: '#10B981', icon: 'fa-seedling' };
    case 'ovulation':
      return { name: 'Ovulation', color: '#F97316', icon: 'fa-sun' };
    case 'luteal':
      return { name: 'Luteal Phase', color: '#B19CD9', icon: 'fa-moon' };
    default:
      return { name: 'Unknown Phase', color: '#9CA3AF', icon: 'fa-circle-question' };
  }
}

export function getCurrentPhase(lastPeriodStart: string | null, cycleLength: number = 28, periodLength: number = 5) {
  if (!lastPeriodStart) return 'menstrual';
  
  const today = new Date();
  const startDate = new Date(lastPeriodStart);
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const dayOfCycle = (diffDays % cycleLength) || cycleLength;
  
  if (dayOfCycle <= periodLength) return 'menstrual';
  if (dayOfCycle <= 13) return 'follicular';
  if (dayOfCycle >= 14 && dayOfCycle <= 16) return 'ovulation';
  return 'luteal';
}

export function calculateNextPeriod(lastPeriodStart: string | null, cycleLength: number = 28): Date {
  if (!lastPeriodStart) return new Date();
  
  const nextDate = new Date(lastPeriodStart);
  nextDate.setDate(nextDate.getDate() + cycleLength);
  
  // If the calculated next period is in the past, add cycle length until it's in the future
  const today = new Date();
  while (nextDate < today) {
    nextDate.setDate(nextDate.getDate() + cycleLength);
  }
  
  return nextDate;
}

export function getDaysUntilNextPeriod(lastPeriodStart: string | null, cycleLength: number = 28): number {
  if (!lastPeriodStart) return 0;
  
  const nextPeriod = calculateNextPeriod(lastPeriodStart, cycleLength);
  const today = new Date();
  
  // Reset times to midnight for accurate day calculation
  nextPeriod.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = nextPeriod.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
