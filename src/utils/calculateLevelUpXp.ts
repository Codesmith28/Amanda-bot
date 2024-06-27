export default function calculateLevelUpXp(level: number): number {
  return 100 * level || 1;
}
