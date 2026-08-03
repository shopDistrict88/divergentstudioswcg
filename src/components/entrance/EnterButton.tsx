"use client";

import { forwardRef } from "react";

type Props = {
  disabled?: boolean;
  busy?: boolean;
  onActivate: () => void;
};

const EnterButton = forwardRef<HTMLButtonElement, Props>(function EnterButton(
  { disabled, busy, onActivate },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className="entrance-enter-btn pointer-events-auto focus-ring"
      disabled={disabled}
      onClick={onActivate}
      aria-busy={busy}
      aria-label={busy ? "Entering studio" : "Enter studio"}
    >
      {busy ? "Entering" : "Enter Studio"}
    </button>
  );
});

export default EnterButton;
