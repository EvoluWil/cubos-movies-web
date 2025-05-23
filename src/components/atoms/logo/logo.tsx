import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Image
        src="/images/brand/logo-mini.png"
        alt="Logo"
        width={122}
        height={36}
        className="block lg:hidden"
      />

      <Image
        src="/images/brand/logo.png"
        alt="Logo"
        width={247}
        height={36}
        className="hidden lg:block"
      />
    </div>
  );
};
