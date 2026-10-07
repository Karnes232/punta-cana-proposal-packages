// How the footer shows the company's contact details.

/**
 * A real profile link: http(s) with a path (an empty "https://x.com/"
 * placeholder is skipped).
 */
export const isProfileLink = (url: string) => {
  try {
    const parsed = new URL(url);
    return (
      ["http:", "https:"].includes(parsed.protocol) && parsed.pathname !== "/"
    );
  } catch {
    return false;
  }
};

// A North American number with its country code, e.g. "18094929868".
const isNanp = (digits: string) =>
  digits.length === 11 && digits.startsWith("1");

/** "18094929868" → "+1 (809) 492-9868"; other numbers are shown as stored. */
export const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return isNanp(digits)
    ? `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
    : phone;
};

/** The tel: number, with "+" so it dials from abroad too. */
export const dialNumber = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return isNanp(digits) ? `+${digits}` : phone.replace(/[^\d+]/g, "");
};
