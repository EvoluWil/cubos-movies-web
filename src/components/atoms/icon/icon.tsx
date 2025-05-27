import React from 'react';

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
  | 'info'
  | 'close'
  | 'camera';

enum IconNameEnum {
  'chevron-down' = 'chevron_down',
  'chevron-left' = 'chevron_left',
  'chevron-right' = 'chevron_right',
  'chevron-up' = 'chevron_up',
  filter = 'tune',
  moon = 'mode_night',
  search = 'search',
  sun = 'light_mode',
  spinner = 'autorenew',
  info = 'info',
  close = 'close',
  camera = 'photo_camera',
}

type IconProps = {
  name: IconName;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  return (
    <i className={`material-icons ${className}`} aria-hidden="true">
      {IconNameEnum[name]}
    </i>
  );
};
