type Props = {
  name: string;
  alt: string;
  className?: string;
};

export function ThemeImage({ name, alt, className = "h-auto w-full" }: Props) {
  return (
    <>
      <img
        src={`/illustrations/light/${name}.svg`}
        alt={alt}
        width={1200}
        height={800}
        className={`${className} dark:hidden`}
      />
      <img
        src={`/illustrations/dark/${name}.svg`}
        alt=""
        width={1200}
        height={800}
        className={`hidden dark:block ${className}`}
        aria-hidden
      />
    </>
  );
}
