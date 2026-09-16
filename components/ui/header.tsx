export default function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-7">
      <h1 className="text-[26px] font-bold leading-tight tracking-[-.7px] sm:text-[30px]">
        {title}
      </h1>
      <p className="muted mt-2">{subtitle}</p>
    </header>
  );
}
