export default function formatPhone(n?: string | number) {
  if (!n) return "";
  let phone = "(";

  const newStr = n.toString();

  for (let i = 0; i < newStr.length; i++) {
    if (i === 2) {
      phone += `${newStr[i]}) `;
    } else if (i === 5) {
      phone += `${newStr[i]}-`;
    } else {
      phone += newStr[i];
    }
  }

  return phone;
}
