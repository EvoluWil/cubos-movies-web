import { Copyright } from '@/components/atoms/copyright/copyright';

export const Footer = async () => {
  return (
    <footer className="flex items-center mt-auto p-5 lg:p-6 border-t border-mauve_alpha-400 justify-center">
      <Copyright />
    </footer>
  );
};
