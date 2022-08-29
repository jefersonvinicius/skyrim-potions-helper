import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function cleanDOMText(value) {
    const trashs = ['\n', '(identical to Bone Meal)', '‡', '*', '†']
    let result = value;
    trashs.forEach((trash) => {
        result = result.replaceAll(trash, '')
    })
    return result.trim();
}

export const currentPath = path.dirname(fileURLToPath(import.meta.url))
