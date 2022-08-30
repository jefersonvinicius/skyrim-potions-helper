export function cleanDOMText(value) {
  const trashs = ['\n', '(identical to Bone Meal)', '‡', '*', '†'];
  let result = value;
  trashs.forEach((trash) => {
    result = result.replaceAll(trash, '');
  });
  return result.trim();
}

export function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
