import { describeDraft, type NoteDraft } from "./lib/note-draft";

export type { NoteDraft, NoteDraftStatus } from "./lib/note-draft";

/**
 * What the note editor on a Lesson page shows for the text in the box:
 * the character count, whether Save is allowed, and whether the text is
 * saved, changed since the last save, or not written yet.
 */
export function describeNoteDraft(
  draft: string,
  savedBody: string | null
): NoteDraft {
  return describeDraft(draft, savedBody);
}
