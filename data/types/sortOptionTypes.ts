export const SORT_OPTIONS =
  [
    'az',
    'za',
    'lohi',
    'hilo'
  ] as const;
export type SortOption = typeof SORT_OPTIONS[number];