export function IconPrivate({ className }: { className?: string }) {
  return (
    // Closed eye / shield with lock
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 8C12 8 7 20 7 20s5 12 13 12 13-12 13-12S28 8 20 8z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function IconTeam({ className }: { className?: string }) {
  return (
    // Two people / silhouettes
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="15" cy="13" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M7 32c0-5 3.6-8 8-8s8 3 8 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="27" cy="13" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M24 32c0-4 2-6.5 5-7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconInclusive({ className }: { className?: string }) {
  return (
    // Checkmark inside a circle
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M13.5 20.5l4.5 4.5 9-9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMemories({ className }: { className?: string }) {
  return (
    // Camera
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7 16h4l3-4h12l3 4h4v16H7V16z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="24" r="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="20" cy="24" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
