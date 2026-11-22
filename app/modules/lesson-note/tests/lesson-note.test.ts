import { describe, it, expect } from "vitest";
import { describeNoteDraft } from "../index";
import { MAX_NOTE_LENGTH } from "~/lib/notes";

describe("describeNoteDraft", () => {
  it("is empty and cannot be saved before the Student writes anything", () => {
    expect(describeNoteDraft("", null)).toEqual({
      length: 0,
      max: MAX_NOTE_LENGTH,
      tooLong: false,
      status: "empty",
      canSave: false,
    });
  });

  it("treats whitespace alone as nothing written", () => {
    const draft = describeNoteDraft("   \n ", null);
    expect(draft.status).toBe("empty");
    expect(draft.length).toBe(0);
    expect(draft.canSave).toBe(false);
  });

  it("can save new text on a lesson with no note yet", () => {
    const draft = describeNoteDraft("Generics are like parameters", null);
    expect(draft.status).toBe("unsaved");
    expect(draft.length).toBe(28);
    expect(draft.canSave).toBe(true);
  });

  it("is saved when the box matches the stored note", () => {
    const draft = describeNoteDraft("my note", "my note");
    expect(draft.status).toBe("saved");
    expect(draft.canSave).toBe(false);
  });

  it("ignores surrounding whitespace when comparing to the stored note", () => {
    expect(describeNoteDraft("  my note\n", "my note").status).toBe("saved");
  });

  it("is unsaved once the text differs from the stored note", () => {
    const draft = describeNoteDraft("my note, edited", "my note");
    expect(draft.status).toBe("unsaved");
    expect(draft.canSave).toBe(true);
  });

  it("cannot save a cleared box over a stored note", () => {
    const draft = describeNoteDraft("", "my note");
    expect(draft.status).toBe("unsaved");
    expect(draft.canSave).toBe(false);
  });

  it("allows exactly the maximum length", () => {
    const draft = describeNoteDraft("a".repeat(MAX_NOTE_LENGTH), null);
    expect(draft.tooLong).toBe(false);
    expect(draft.canSave).toBe(true);
  });

  it("refuses one character over the maximum", () => {
    const draft = describeNoteDraft("a".repeat(MAX_NOTE_LENGTH + 1), null);
    expect(draft.length).toBe(MAX_NOTE_LENGTH + 1);
    expect(draft.tooLong).toBe(true);
    expect(draft.canSave).toBe(false);
  });
});
