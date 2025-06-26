/**
 * Task
 * Given a positive integer, n, return the number of possible ways such that k positive integers multiply to n. Order matters.
 *
 * Examples
 *
 * n = 24
 * k = 2
 * (1, 24), (2, 12), (3, 8), (4, 6), (6, 4), (8, 3), (12, 2), (24, 1) -> 8
 *
 * n = 100
 * k = 1
 * 100 -> 1
 *
 * n = 20
 * k = 3
 * (1, 1, 20), (1, 2, 10), (1, 4, 5), (1, 5, 4), (1, 10, 2), (1, 20, 1),
 * (2, 1, 10), (2, 2, 5), (2, 5, 2), (2, 10, 1), (4, 1, 5), (4, 5, 1),
 * (5, 1, 4), (5, 2, 2), (5, 4, 1), (10, 1, 2), (10, 2, 1), (20, 1, 1) -> 18
 * Constraints 1 <= n <= 1_000_000_000_000 and 1 <= k <= 1_000
 */

function multiply(n, k) {
    if (n === 1n) return 1n;

    let factors = {};
    let temp = BigInt(n);

    if (temp % 2n === 0n) {
        let count = 0n;
        while (temp % 2n === 0n) {
            temp /= 2n;
            count++;
        }
        factors[2n] = count;
    }

    for (let i = 3n; i * i <= temp; i += 2n) {
        while (temp % i === 0n) {
            factors[i] = (factors[i] || 0n) + 1n;
            temp /= i;
        }
    }

    if (temp > 1n) factors[temp] = (factors[temp] || 0n) + 1n;

    let result = 1n;
    for (const prime in factors) {
        const exponent = factors[prime];
        result *= comb(exponent + BigInt(k) - 1n, BigInt(k) - 1n);
    }

    return result;
}

function comb(a, b) {
    if (b > a) return 0n;
    if (b === 0n || b === a) return 1n;
    b = b < a - b ? b : a - b;
    let res = 1n;
    for (let i = 1n; i <= b; i++) {
        res = res * (a - b + i) / i;
    }
    return res;
}