type EventLogProps = {
  entries: string[]
  title?: string
}

export default function EventLog({ entries, title = 'War Chronicle' }: EventLogProps) {
  return (
    <section className="event-log" aria-live="polite">
      <h3>{title}</h3>
      {entries.map((entry, index) => (
        <p key={`${entry}-${index}`}>{entry}</p>
      ))}
    </section>
  )
}
