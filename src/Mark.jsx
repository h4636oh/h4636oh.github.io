import markSvg from './mark.svg?raw'

/** Renders public/mark.svg as-is (placement baked into the file). */
export function Mark({ className }) {
  return (
    <span
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: markSvg }}
    />
  )
}
