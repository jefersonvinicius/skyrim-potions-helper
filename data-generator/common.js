export function cleanDOMText(value) {
  const trashs = ['\n', '(identical to Bone Meal)', '‡', '*', '†'];
  let result = value;
  trashs.forEach((trash) => {
    result = result.replaceAll(trash, '');
  });
  return result.trim();
}

export function createFilename(name, extension) {
  const filename = name.toLowerCase().replaceAll(' ', '').replaceAll("'", '');
  return `${filename}.${extension}`;
}
