import axios from 'axios';

export const fetchCosmetics = (sortBy, category) => (dispatch) => {
  dispatch({
    type: 'SET_LOADED',
    payload: false,
  });

  axios
  .get(
    `/cosmetics?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${
      sortBy.order
    }`,
  )
  .then(({ data }) => {
    dispatch(setCosmetics(data));
  });
};

export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});

export const setCosmetics = (items) => ({
  type: 'SET_COSMETICS',
  payload: items,
});
