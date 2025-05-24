/**
 * In this Kata, you will be given boolean values and boolean operators. Your task will be to return the number of arrangements that evaluate to True.
 *
 * t,f will stand for true, false and the operators will be Boolean AND (&), OR (|), and XOR (^).
 *
 * For example, solve("tft","^&") = 2, as follows:
 *
 * "((t ^ f) & t)" = True
 * "(t ^ (f & t))" = True
 * Notice that the order of the boolean values and operators does not change. What changes is the position of braces.
 *
 * More examples in the test cases.
 *
 * Good luck!
 */

function solve(s, ops) {
    const n = s.length;

    const dpTrue = new Array(n).fill(0).map(() => new Array(n).fill(0));
    const dpFalse = new Array(n).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        if (s[i] === 't') dpTrue[i][i] = 1;
        else dpFalse[i][i] = 1;
    }


    for (let len = 2; len <= n; len++) {

        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;

            dpTrue[i][j] = 0;
            dpFalse[i][j] = 0;

            for (let k = i; k < j; k++) {
                const op = ops[k];
                const leftTrue = dpTrue[i][k];
                const leftFalse = dpFalse[i][k];
                const rightTrue = dpTrue[k + 1][j];
                const rightFalse = dpFalse[k + 1][j];

                if (op === '&') {
                    dpTrue[i][j] += leftTrue * rightTrue;
                    dpFalse[i][j] += leftTrue * rightFalse +
                        leftFalse * rightTrue +
                        leftFalse * rightFalse;

                } else if (op === '|') {
                    dpTrue[i][j] += leftTrue * rightTrue +
                        leftTrue * rightFalse +
                        leftFalse * rightTrue;
                    dpFalse[i][j] += leftFalse * rightFalse;
                } else if (op === '^') {
                    dpTrue[i][j] += leftTrue * rightFalse +
                        leftFalse * rightTrue;
                    dpFalse[i][j] += leftTrue * rightTrue +
                        leftFalse * rightFalse;
                }
            }
        }
    }

    return dpTrue[0][n - 1];
}