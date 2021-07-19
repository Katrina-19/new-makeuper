import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button';

function CosmeticBlock ({ id, name, imageUrl, price, types, tons, onClickAddCosmetics, addedCount }) {
  const availableTypes = ['пробник', 'полная'];
  const availableTons = [1, 2, 3];

  const [activeType, setActiveType] = React.useState(types[0]);
  const [activeTone, setactiveTone] = React.useState(0);

  const onSelectType = (index) => {
    setActiveType(index);
  };

  const onSelectTone = (index) => {
    setactiveTone(index);
  };

  const onAddCosmetics = () => {
    const obj = {
      id,
      name,
      imageUrl,
      price,
      tone: availableTons[activeTone],
      type: availableTypes[activeType],
    };
    onClickAddCosmetics(obj);
  };

  return (
    <div className="makeup-block">
      <img className="makeup-block__image" src={imageUrl} alt="makeup" />
      <h4 className="makeup-block__title">{name}</h4>
      <div className="makeup-block__selector">
        <ul>
          {availableTypes.map((type, index) => (
            <li
              key={type}
              onClick={() => onSelectType(index)}
              className={classNames({
                active: activeType === index,
                disabled: !types.includes(index),
              })}>
              {type}
            </li>
          ))}
        </ul>
        <ul>
          {availableTons.map((tone, index) => (
            <li
              key={tone}
              onClick={() => onSelectTone(index)}
              className={classNames({
                active: activeTone === index,
                disabled: !tons.includes(tone),
              })}>
              {tone} вид
            </li>
          ))}
        </ul>
      </div>
      <div className="makeup-block__bottom">
        <div className="makeup-block__price">от {price} Br</div>
        <Button onClick={onAddCosmetics} className="button--add" outline>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount && <i>{addedCount}</i>}
        </Button>
      </div>
    </div>
  );
}

CosmeticBlock.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  types: PropTypes.arrayOf(PropTypes.number),
  tons: PropTypes.arrayOf(PropTypes.number),
  onClickAddCosmetics: PropTypes.func,
  addedCount: PropTypes.number,
};

CosmeticBlock.defaultProps = {
  name: '---',
  price: 0,
  types: [],
  tons: [],
};

export default CosmeticBlock;
