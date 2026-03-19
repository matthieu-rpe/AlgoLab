import type { SortingEngine } from '@/types/algorithm';

/*
 * Quick sort
 *
 * Runtime : mean: O(n*log(n)) | worst: O(n^2) on already sorted, if pivot is always smallest or biggest
 * Memory  : O(log(n))
 * Unstable
 *
 * An element called "pivot" is taken. Then we reorganize the array so that all smallest el are on the left, all biggest are on the right
 */
export function* quickSort(
  data: number[],
  start = 0,
  end = data.length - 1,
  sorted: number[] = [],
): Generator<SortingEngine, void, unknown> {
  // [] or [x] leaf segment
  if (start >= end) {
    if (start === end && !sorted.includes(start)) sorted.push(start);
    yield { data, comparing: [], moving: [], sorted };
    return;
  }

  let left = start;
  let right = end;

  const mid = Math.floor(start + (end - start) / 2);
  const pivot = data[mid] as number;

  while (left <= right) {
    // left scan until we find an element bigger than pivot
    while ((data[left] as number) < pivot) {
      yield { data, comparing: [left, right], moving: [], sorted };
      left++;
    }

    // right scan until we find an element lower than pivot
    while ((data[right] as number) > pivot) {
      yield { data, comparing: [right], moving: [left], sorted };
      right--;
    }

    yield { data, comparing: [], moving: [left, right], sorted };

    // If left is below right, then we should swap both elements
    if (left <= right) {
      [data[left], data[right]] = [data[right] as number, data[left] as number];

      yield { data, comparing: [], moving: [left, right], sorted };

      left++;
      right--;
    }
  }

  yield* quickSort(data, start, left - 1, sorted);
  yield* quickSort(data, left, end, sorted);
}
