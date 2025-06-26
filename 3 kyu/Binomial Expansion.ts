/**
 * The purpose of this kata is to write a program that can do some algebra.
 *
 * Write a function expand that takes in an expression with a single, one character variable, and expands it. The expression is in the form (ax+b)^n where a and b are integers which may be positive or negative, x is any single character variable, and n is a natural number. If a = 1, no coefficient will be placed in front of the variable. If a = -1, a "-" will be placed in front of the variable.
 *
 * The expanded form should be returned as a string in the form ax^b+cx^d+ex^f... where a, c, and e are the coefficients of the term, x is the original one character variable that was passed in the original expression and b, d, and f, are the powers that x is being raised to in each term and are in decreasing order.
 *
 * If the coefficient of a term is zero, the term should not be included. If the coefficient of a term is one, the coefficient should not be included. If the coefficient of a term is -1, only the "-" should be included. If the power of the term is 0, only the coefficient should be included. If the power of the term is 1, the caret and power should be excluded.
 *
 * Examples:
 * expand("(x+1)^2");      // returns "x^2+2x+1"
 * expand("(p-1)^3");      // returns "p^3-3p^2+3p-1"
 * expand("(2f+4)^6");     // returns "64f^6+768f^5+3840f^4+10240f^3+15360f^2+12288f+4096"
 * expand("(-2a-4)^0");    // returns "1"
 * expand("(-12t+43)^2");  // returns "144t^2-1032t+1849"
 * expand("(r+0)^203");    // returns "r^203"
 * expand("(-x-1)^2");     // returns "x^2+2x+1"
 */

function expand(expr) {
    const [_, aPart, variable, bPart, exponentStr] = expr.match(/\(([-+]?\d*)([a-zA-Z])([+,-]\d+)\)\^(\d+)/) || [];
    const n = parseInt(exponentStr, 10);

    if (n === 0) {
        return "1";
    }

    let a = aPart === '' ? 1 : aPart === '-' ? -1 : parseInt(aPart, 10);
    const b = parseInt(bPart, 10);

    const terms = [];

    for (let k = 0; k <= n; k++) {
        const binomialCoefficient = combination(n, k);
        const powerA = n - k;
        const powerB = k;
        let coefficient = binomialCoefficient * Math.pow(a, powerA) * Math.pow(b, powerB);
        const currentExponent = powerA;

        if (coefficient === 0) continue;

        let term = '';

        if (currentExponent === 0) term += coefficient;
        else {
            if (coefficient === 1 && currentExponent !== 0) term = '';
            else if (coefficient === -1 && currentExponent !== 0) term = '-';
            else term = coefficient.toString();
            term += variable;
            if (currentExponent > 1) term += '^' + currentExponent;
        }

        terms.push({coefficient, exponent: currentExponent, termStr: term});
    }

    // Process terms in descending order of exponent
    terms.sort((x, y) => y.exponent - x.exponent);

    let result = '';
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        if (i === 0) result += term.termStr;
         else {
            if (term.coefficient > 0) {
                result += '+';
                result += term.termStr;
            } else result += term.termStr;
        }
    }

    return result;
}

function combination(n, k) {
    if (k < 0 || k > n) return 0;
    let res = 1;
    for (let i = 1; i <= k; i++) res = res * (n - k + i) / i;
    return res;
}