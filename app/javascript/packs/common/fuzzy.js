/*
 * fuzzy search string
 */
export function fuzzy(str, s) {
    let hay = str.toLowerCase();
    let i = 0;
    let n = -1;
    let l;
    s = s.toLowerCase();
    for (; l = s[i++];) if (!~(n = hay.indexOf(l, n + 1))) return false;
    return true;
}