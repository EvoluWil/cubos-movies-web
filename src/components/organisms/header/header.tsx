import { Logo } from '@/components/atoms/logo/logo';
import { SignOutButton } from '@/components/atoms/sign-out-button/sign-out-button';
import { ToggleTheme } from '@/components/molecules/toggle-theme/toggle-theme';
import { getUserSession } from '@/utils/session';

export const Header = async () => {
  const user = await getUserSession();

  return (
    <header className="fixed top-0 left-0 w-full h-18 z-20 flex items-center border-b border-mauve_alpha-400 backdrop-blur-[8px]">
      <div className="container flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-2">
          <ToggleTheme />
          {!!user && <SignOutButton />}
        </div>
      </div>
    </header>
  );
};
