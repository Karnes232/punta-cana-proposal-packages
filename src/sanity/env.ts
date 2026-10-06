export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-07";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

// Sanity project ids are lowercase letters, digits and dashes.
if (!/^[a-z0-9-]+$/.test(projectId)) {
  throw new Error(
    "Invalid environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
  );
}

/** The value, trimmed; an unset or blank value stops the build. */
function assertValue(v: string | undefined, errorMessage: string): string {
  const value = v?.trim();
  if (!value) {
    throw new Error(errorMessage);
  }

  return value;
}
