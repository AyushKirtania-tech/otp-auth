export function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");

  if (digits.length >= 10) {
    const number = digits.slice(-10);

    if (/^[6-9]\d{9}$/.test(number)) return number;
  }

  return null;
}
