import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/images/brand/logo-mini.png"
        alt="Logo"
        width={36}
        height={36}
        className="block lg:hidden dark:invert"
      />

      <Image
        src="/images/brand/logo.png"
        alt="Logo"
        width={160}
        height={36}
        className="hidden lg:block dark:invert"
      />

      <span className="font-inter text-mauve-950 text-xl font-bold">
        Movies
      </span>
    </div>
  );
};
