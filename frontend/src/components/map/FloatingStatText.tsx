type FloatingStatTextItem = {
  id: number
  x: number
  y: number
  text: string
  tone?: 'positive' | 'negative' | 'neutral'
}

type FloatingStatTextProps = {
  items: FloatingStatTextItem[]
}

export default function FloatingStatText({ items }: FloatingStatTextProps) {
  return (
    <>
      {items.map((item) => (
        <span
          key={item.id}
          className={`floating-stat ${item.tone ?? 'neutral'}`}
          style={{
            left: `${(item.x / 1536) * 100}%`,
            top: `${(item.y / 1024) * 100}%`,
          }}
        >
          {item.text}
        </span>
      ))}
    </>
  )
}
