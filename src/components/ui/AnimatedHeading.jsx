import { cn } from "../../lib/cn";

export function AnimatedHeading({
  as: Tag = "h1",
  text,
  className,
  delay = 0,
  stagger = 55,
}) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag className={cn("heading-reveal", className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span
            className="heading-reveal__word"
            style={{ "--word-delay": `${delay + index * stagger}ms` }}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
