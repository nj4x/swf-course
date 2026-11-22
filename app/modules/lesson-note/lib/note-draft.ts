import { MAX_NOTE_LENGTH } from "~/lib/notes";

export type NoteDraftStatus = "empty" | "saved" | "unsaved";

export type NoteDraft = {
  length: number;
  max: number;
  tooLong: boolean;
  status: NoteDraftStatus;
  canSave: boolean;
};

// The server trims before it checks the length and stores the note, so the
// editor counts and compares the trimmed text too; otherwise a trailing
// newline would read as an unsaved change.
export function describeDraft(
  draft: string,
  savedBody: string | null
): NoteDraft {
  const text = draft.trim();
  const length = text.length;
  const tooLong = length > MAX_NOTE_LENGTH;
  const status = statusOf(text, savedBody);

  return {
    length,
    max: MAX_NOTE_LENGTH,
    tooLong,
    status,
    canSave: status === "unsaved" && length > 0 && !tooLong,
  };
}

function statusOf(text: string, savedBody: string | null): NoteDraftStatus {
  if (text === savedBody) return "saved";
  if (savedBody === null && text.length === 0) return "empty";
  return "unsaved";
}
