import { FC, useState } from 'react';

import Details from '../details/details';

import arrowSvg from './../../../../../public/arr.svg';

import style from './tabPanel.module.sass';

type TabPanelData = {
  name: string;
  text: string;
  id: number;
  details?: DetailsData[];
};

type DetailsData = {
  name: string;
  desc: string;
  id: number;
};
const TabPanel: FC<{ product: any }> = ({ product }) => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const onItemClick = (index: number): void => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  const data: TabPanelData[] = [
    {
      name: 'Описание',
      text: product.description && product.description,
      details: [
        {
          name: 'Бренд',
          desc: product.brand && product.brand.NAME,
          id: 0,
        },
        {
          name: 'Производитель',
          desc: product.props && product.props[48].value,
          id: 1,
        },
        {
          name: 'Проблемы',
          desc: product.props && product.props[26].value && product.props[26].value.join(', '),
          id: 2,
        },
        {
          name: 'Тип кожи',
          desc: product.props && product.props[27].value && product.props[27].value.join(', '),
          id: 3,
        },
      ],
      id: 0,
    },
    {
      name: 'применение',
      text: product.props && product.props[21].value?.TEXT,
      id: 1,
    },
    {
      name: 'состав',
      text: product.props && product.props[22].value?.TEXT,
      id: 2,
    },
    {
      name: 'о бренде',
      text: product.brand && product.brand?.PREVIEW_TEXT,
      id: 3,
    },
    {
      name: 'дополнительно',
      text: product.props && product.props[47].value?.TEXT,
      id: 4,
    },
  ];

  return (
    <div>
      <div className={style.tabPanel}>
        <div className={style.tabs}>
          {data.map(({ name, id }) => (
            <div
              key={id}
              className={style.tab + ' ' + (activeTabId === id && style.active)}
              onClick={() => setActiveTabId(id)}>
              {name}
              <img src="" alt="" />
            </div>
          ))}
        </div>
        {data.map(({ text, id, details }) => (
          <div key={id} style={{ display: activeTabId === id ? 'block' : 'none' }}>
            <div
              className={style.text}
              dangerouslySetInnerHTML={{ __html: text || 'Данных нет' }}></div>

            {details && <Details detailsData={details} />}
          </div>
        ))}
      </div>
      <div className={style.accordion}>
        {data.map(({ name, text, details, id }): any => (
          <div className={style.item} key={id} onClick={() => onItemClick(id)}>
            <div className={style.column}>
              <div className={style.text}>
                <div className={style.title}>
                  {name}
                  <img
                    src={arrowSvg.src}
                    alt=""
                    className={activeIndex === id ? style.rotate : ''}
                  />
                </div>
                {text ? (
                  <div
                    className={
                      style.description + ' ' + (activeIndex === id ? style.active : style.hidden)
                    }>
                    {text}
                    <div className={style.details}>
                      {details &&
                        details.map(
                          ({ name, desc, id }) =>
                            desc && (
                              <div className={style.detailItem} key={id}>
                                <div className={style.title}>{name}</div>
                                <div className={style.detailDesc}>{desc}</div>
                              </div>
                            ),
                        )}
                    </div>
                  </div>
                ) : (
                  <div
                    className={
                      style.description + ' ' + (activeIndex === id ? style.active : style.hidden)
                    }>
                    Данных нет
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabPanel;
