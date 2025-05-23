import LtiChevronDown from '@/assets/icons/chevron_down.svg';
import LtiChevronLeft from '@/assets/icons/chevron_left.svg';
import LtiChevronRight from '@/assets/icons/chevron_right.svg';
import LtiChevronUp from '@/assets/icons/chevron_up.svg';
import LtiFilter from '@/assets/icons/filter.svg';
import LtiInfo from '@/assets/icons/info.svg';
import LtiMoon from '@/assets/icons/moon.svg';
import LtiSearch from '@/assets/icons/search.svg';
import LtiSpinner from '@/assets/icons/spinner.svg';
import LtiSun from '@/assets/icons/sun.svg';

export type IconName =
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'filter'
  | 'moon'
  | 'search'
  | 'sun'
  | 'spinner'
  | 'info';

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
};

const iconsMap: Record<
  IconName,
  React.FC<{ size?: number; color?: string; className?: string }>
> = {
  'chevron-down': LtiChevronDown,
  'chevron-left': LtiChevronLeft,
  'chevron-right': LtiChevronRight,
  'chevron-up': LtiChevronUp,
  filter: LtiFilter,
  moon: LtiMoon,
  search: LtiSearch,
  sun: LtiSun,
  info: LtiInfo,
  spinner: LtiSpinner,
};

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const Component = iconsMap[name];
  return <Component className={className} />;
};
