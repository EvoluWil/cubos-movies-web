import { getUserSession } from '@/app/utils/session';
import { Logo } from '@/components/atoms/logo/logo';
import { Button } from '@/components/molecules/button/button';
import { ToggleTheme } from '@/components/molecules/toggle-theme/toggle-theme';

export const Header = async () => {
  const user = await getUserSession();

  return (
    <header className="sticky top-0 left-0 w-full h-18 flex items-center border-b border-mauve_alpha-400">
      <div className="container flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-2">
          <ToggleTheme />
          {!!user && <Button>Logout</Button>}
        </div>
      </div>
    </header>
  );
};
