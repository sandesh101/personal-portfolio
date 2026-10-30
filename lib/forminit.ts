import { Forminit } from "forminit";

// Forminit form: inputs are named fi-{type}-{name}. Rules: https://forminit.com/setup.md
export const FORM_ID = "f5smtejtdv7";

const forminit = new Forminit();

// One message per field Forminit validates. Keys are Forminit's field names:
// sender.<name> for fi-sender-*, else the {name} of fi-{type}-{name}.
const FIELD_ERRORS: Record<string, string> = {
  "sender.fullName":
    "Please use only letters, spaces, hyphens, apostrophes and periods.",
  "sender.email": "Please enter a valid email address.",
};

type ForminitError = { error?: string; fieldName?: string; message?: string };

// Forminit names the failing field in error.fieldName or, today, as the first quoted word of error.message.
// null means "show the form's generic failure text".
function errorText(error?: ForminitError): string | null {
  const field =
    error?.fieldName ?? /['"]([^'"]+)['"]/.exec(error?.message ?? "")?.[1];
  if (field && FIELD_ERRORS[field]) return FIELD_ERRORS[field];
  if (error?.error === "TOO_MANY_REQUESTS")
    return "Please wait a few seconds and try again.";
  return null;
}

export type SendResult = { ok: true } | { ok: false; message: string | null };

/** Sends one FormData to Forminit. Success only when Forminit returns a hashId. */
export async function sendToForminit(fd: FormData): Promise<SendResult> {
  // Curly apostrophes in sender names reject the whole submission.
  for (const k of [
    "fi-sender-fullName",
    "fi-sender-firstName",
    "fi-sender-lastName",
  ]) {
    const v = fd.get(k);
    if (typeof v === "string") fd.set(k, v.replace(/[‘’]/g, "'"));
  }
  try {
    const { data, error } = await forminit.submit(FORM_ID, fd);
    if (error || typeof data?.hashId !== "string") {
      console.error("Forminit:", error ?? data);
      return {
        ok: false,
        message: errorText(error as ForminitError | undefined),
      };
    }
    return { ok: true };
  } catch (err) {
    console.error("Forminit:", err);
    return { ok: false, message: null };
  }
}
