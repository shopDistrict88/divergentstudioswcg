export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 md:px-8">
      <p className="label-util text-white/40">Information</p>
      <h1 className="heading-section mt-3 text-white/95">Returns</h1>
      <div className="body-copy mt-8 space-y-4">
        <p>
          {/* TODO: Confirm official return window and conditions with operations */}
          Return eligibility and timelines are confirmed at checkout and on your
          order confirmation. Unworn items in original packaging may be eligible
          within the stated return window.
        </p>
        <p>
          Contact support via the contact page to start a return for a completed
          acquisition.
        </p>
      </div>
    </div>
  );
}
