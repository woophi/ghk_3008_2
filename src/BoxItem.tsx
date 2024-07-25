import { Typography } from '@alfalab/core-components/typography';
import { CSSProperties } from 'react';
import { CheckIcon } from './CheckIcon';
import { appSt } from './style.css';

type Props = {
  checked: boolean;
  onToggle: (v: string) => void;
  img: string;
  title: string;
  imgStyle?: CSSProperties;
};

export const BoxItem = ({ checked, img, onToggle, title, imgStyle = {} }: Props) => {
  return (
    <div className={appSt.boxItem({ checked })} onClick={() => onToggle(title)}>
      <div className={appSt.boxTitle}>
        <Typography.Text tag="p" view="component-primary" defaultMargins={false}>
          {title}
        </Typography.Text>

        {checked ? (
          <CheckIcon />
        ) : (
          <div style={{ padding: '3px' }}>
            <div className={appSt.boxCheck} />
          </div>
        )}
      </div>

      <img src={img} style={imgStyle} />
    </div>
  );
};
