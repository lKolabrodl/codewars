/**
 * Create two functions to encode and then decode a string using the Rail Fence Cipher. This cipher is used to encode a string by placing each character successively in a diagonal along a set of "rails". First start off moving diagonally and down. When you reach the bottom, reverse direction and move diagonally and up until you reach the top rail. Continue until you reach the end of the string. Each "rail" is then read left to right to derive the encoded string.
 *
 * For example, the string "WEAREDISCOVEREDFLEEATONCE" could be represented in a three rail system as follows:
 *
 * W       E       C       R       L       T       E
 *   E   R   D   S   O   E   E   F   E   A   O   C
 *     A       I       V       D       E       N
 * The encoded string would be:
 *
 * WECRLTEERDSOEEFEAOCAIVDEN
 * Write a function/method that takes 2 arguments, a string and the number of rails, and returns the ENCODED string.
 *
 * Write a second function/method that takes 2 arguments, an encoded string and the number of rails, and returns the DECODED string.
 *
 * For both encoding and decoding, assume number of rails >= 2 and that passing an empty string will return an empty string.
 *
 * Note that the example above excludes the punctuation and spaces just for simplicity. There are, however, tests that include punctuation. Don't filter out punctuation as they are a part of the string.
 */


function encodeRailFenceCipher(string, numberRails) {
    if (!string || numberRails < 2) return string;

    // !!! не ссылаться
    const rails = Array.from({ length: numberRails }, () => []);
    let rail = 0;       // текущий
    let direction = 1;  // направление движения: 1 вниз, -1 вверх

    for (const char of string) {
        rails[rail].push(char);

        // Меняем направление при достижении верхнего или нижнего рельса
        if (rail === 0) direction = 1;
        else if (rail === numberRails - 1) direction = -1;

        rail += direction;
    }

    // Читаем всё сверху вниз и склеиваем в одну строку
    return rails.flat().join('');
}

function decodeRailFenceCipher(string, numberRails) {
    if (!string || numberRails < 2) return string;

    // Определяем где каждый индекс строки
    const railIndices = [];
    let rail = 0;
    let direction = 1;

    for (let i = 0; i < string.length; i++) {
        railIndices.push(rail);
        if (rail === 0) direction = 1;
        else if (rail === numberRails - 1) direction = -1;
        rail += direction;
    }

    // Считаем количество символов
    const railLengths = new Array(numberRails).fill(0);
    railIndices.forEach(r => railLengths[r]++);

    // Разбиваем зашифрованную строку на части
    const rails = [];
    let offset = 0;
    for (let r = 0; r < numberRails; r++) {
        rails.push([...string.slice(offset, offset + railLengths[r])]);
        offset += railLengths[r];
    }

    // Восстанавливаем исходную строку
    const result = [];
    const pointers = new Array(numberRails).fill(0); // указатели позиции

    for (const r of railIndices) {
        result.push(rails[r][pointers[r]++]);
    }

    return result.join('');
}