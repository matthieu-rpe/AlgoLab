import type { SortingEngine } from '@/types/algorithm';

/*
 * Radix sort
 *
 * Runtime : mean: O(nk)
 * Memory  : O(n+k)
 * Stable
 *
 * We sort every numbers digit per digit (1 for units, 10 for tens, 100 for hundreds ...)
 * For each digit, we create 10 buckets (0 to 9) and categorize every number depending their value for the given digit
 */
export function* radixSort(
  data: number[],
): Generator<SortingEngine, void, unknown> {
  const max = Math.max(...data);
  let digitPosition = 1;

  while (Math.floor(max / digitPosition) > 0) {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);

    // distribution
    const comparing = [];
    for (const [i, nb] of data.entries()) {
      comparing.push(i);
      const digit = Math.floor(nb / digitPosition) % 10;

      (buckets[digit] as number[]).push(nb);
      yield {
        data,
        comparing,
        moving: [],
      };
    }

    // sorting
    let k = 0;
    for (const bucket of buckets) {
      for (const val of bucket) {
        data[k] = val;
        comparing.shift();

        yield {
          data,
          comparing,
          moving: [k],
        };

        k++;
      }
    }

    digitPosition *= 10;
  }

  const sorted = [];
  for (let i = 0; i < data.length; i++) {
    sorted.push(i);
    yield {
      data: data,
      comparing: [],
      moving: [],
      sorted,
    };
  }
}
