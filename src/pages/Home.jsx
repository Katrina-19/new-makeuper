import React from 'react';
import { Categories, SortPopup, CosmeticBlock, CosmeticLoadingBlock, Button } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchCosmetics } from '../redux/actions/cosmetic';

const categoryNames = ['Губы', 'Глаза', 'Кожа лица', 'Уходовая', 'Аксессуары'];
const sortItems = [
  { name: 'популярности', type: 'popular', order:'desc' },
  { name: 'цене', type: 'price', order:'desc' },
  { name: 'алфавиту', type: 'name', order:'asc' },
];
function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ cosmetics }) => cosmetics.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ cosmetics }) => cosmetics.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  React.useEffect(() => {
    dispatch(fetchCosmetics(sortBy, category));
  }, [category, sortBy]);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const handleAddCosmeticsToCart = (obj) => {
    dispatch({
      type: 'ADD_COSMETICS_CART',
      payload: obj,
    });
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
        activeSortType={sortBy.type}
        items={sortItems}
        onClickSortType={onSelectSortType} />

      </div>
      <h2 className="content__title">Вся косметикa</h2>
      <div className="content__items">
      {isLoaded
          ? items.map((obj) => (
              <CosmeticBlock
                onClickAddCosmetics={handleAddCosmeticsToCart}

                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                {...obj}
              />
            ))
          : Array(items.length)
              .fill(0)
              .map((_, index) => <CosmeticLoadingBlock key={index} />)}
      </div>

    </div>
  );
}

export default Home;
