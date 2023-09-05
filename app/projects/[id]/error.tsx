// Error components must be Client Components
'use client';

export default function Error({ error, reset }: {
  error: Error
  reset: () => void
}) {
  return <>
    <h2>Something went wrong!</h2>
    <p>{error.message}</p>
    <button
      onClick={
        // Attempt to recover by trying to re-render the segment
        () => reset()
      }
    >
      Try again
    </button>
  </>
}
