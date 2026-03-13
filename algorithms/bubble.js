/*
 * Bubble sort
 *
 * Runtime : O(n^2)
 * Memory  : O(1)
 *
 * Consist of moving the biggest element of two to the right, until the end of the data. It will slowly "bubble up" using O(N) time.
 * Repeat this O(N) times to move every element one by one to the end.
 */
export function* bubbleSort(data) {
  const n = data.length;

  // Bubble up the 'n' elements
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    let sorted = Array.from({ length: i }, (_, k) => n - k - 1);

    /*
     * We compare two elements at [j, j+1] and put the biggest at j+1 to bubble up
     * We stop at n-i-1 because 'i' elements have already been bubbled up before from index 'n-i-1' to 'n-1'.
     */
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        data,
        comparing: [j, j + 1],
        moving: [data[j] > data[j + 1] ? j : j + 1],
        sorted,
      };

      if (data[j] > data[j + 1]) {
        swapped = true;
        [data[j], data[j + 1]] = [data[j + 1], data[j]];
      }

      yield {
        data,
        comparing: [j, j + 1],
        moving: [j + 1],
        sorted,
      };
    }

    if (!swapped) break;
  }

  yield {
    data,
    comparing: [],
    moving: [],
    sorted: Array.from({ length: n }, (_, k) => k),
  };
}
