import Image from 'next/image';

export const BgImageGradient = () => {
  return (
    <>
      <div className="absolute h-[50vh] w-screen flex">
        <Image
          src="/images/layout/background.png"
          alt="Background Image"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-image-gradient h-[50vh] w-screen" />
    </>
  );
};
