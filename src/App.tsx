import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Gap } from '@alfalab/core-components/gap';
import { Typography } from '@alfalab/core-components/typography';
import { CSSProperties, useCallback, useState } from 'react';
import p1 from './assets/p1.png';
import p10 from './assets/p10.png';
import p11 from './assets/p11.png';
import p12 from './assets/p12.png';
import p13 from './assets/p13.png';
import p2 from './assets/p2.png';
import p3 from './assets/p3.png';
import p4 from './assets/p4.png';
import p5 from './assets/p5.png';
import p6 from './assets/p6.png';
import p7 from './assets/p7.png';
import p8 from './assets/p8.png';
import p9 from './assets/p9.png';
import { BoxItem } from './BoxItem';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { sendDataToGA } from './utils/events';

const data: { title: string; img: string; imgStyle?: CSSProperties }[] = [
  {
    title: 'Реферальная программа',
    img: p1,
  },
  {
    title: 'Ваши счета',
    img: p2,
    imgStyle: {
      marginBottom: '13px',
    },
  },
  {
    title: 'Персональные предложения',
    img: p3,
    imgStyle: {
      marginBottom: '13px',
    },
  },
  {
    title: 'Поиск и QR',
    img: p4,
    imgStyle: {
      margin: '0 13px 13px 13px',
    },
  },
  {
    title: 'Контекстные рекомендации',
    img: p5,
  },
  {
    title: 'Реферальная программа',
    img: p6,
  },
  {
    title: 'Переводы',
    img: p7,
  },
  {
    title: 'Кэшбэк',
    img: p8,
  },
  {
    title: 'Рекомендация сервисов',
    img: p9,
  },
  {
    title: 'Первые шаги в инвестировании',
    img: p10,
  },
  {
    title: 'Валюта и Металлы',
    img: p11,
    imgStyle: {
      marginBottom: '13px',
    },
  },
  {
    title: 'Банкоматы и отделения',
    img: p12,
  },
  {
    title: 'Платежи',
    img: p13,
  },
];

export const App = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));

  const submit = useCallback(() => {
    if (!selectedItems.length) {
      setError('У вас не выбрано ни одного элемента экрана');
      return;
    }
    setLoading(true);
    const choice = selectedItems
      .map(i => {
        const [name, index] = i.split('_');

        return Number(index) === 0 ? `${name} 1` : Number(index) === 5 ? `${name} 2` : name;
      })
      .join(', ');
    sendDataToGA(choice).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  }, [selectedItems]);

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.titleBox}>
          <Typography.TitleResponsive tag="h1" view="large" font="system" weight="medium">
            Много рекламы? Оставь полезное для себя
          </Typography.TitleResponsive>
          <Typography.TitleResponsive
            style={{ maxWidth: '280px' }}
            color="secondary"
            tag="h2"
            view="xsmall"
            font="system"
            weight="medium"
          >
            Выберите элементы экрана, которые будут отображаться
          </Typography.TitleResponsive>
        </div>
        {data.map((d, index) => (
          <BoxItem
            key={`${d.title}_${index}`}
            checked={selectedItems.includes(`${d.title}_${index}`)}
            img={d.img}
            onToggle={item =>
              setSelectedItems(items =>
                items.includes(`${item}_${index}`)
                  ? items.filter(v => v !== `${item}_${index}`)
                  : items.concat(`${item}_${index}`),
              )
            }
            title={d.title}
            imgStyle={d.imgStyle}
          />
        ))}
      </div>
      <Gap size={96} />
      <div className={appSt.bottomBtn}>
        <ButtonMobile loading={loading} onClick={submit} block view="primary" hint={err}>
          Выбрать
        </ButtonMobile>
      </div>
    </>
  );
};
