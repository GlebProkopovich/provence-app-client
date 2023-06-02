import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../state';
import { IDishesInCart } from '../../types';
import './Menubar.scss';

const Menubar: FC = () => {
  const [isSearchbarOpen, setIsSearchbarOpen] = useState<boolean>(false);
  const [qtyOfTheDishesInCart, setQtyOfTheDishesInCart] = useState<number>(0);

  const dishesInCart = useSelector((state: IDishesInCart) => state.cart.dishes);

  const dispatch = useDispatch();

  const { getValueSearchInput, clearSearchInput } = actionCreators;

  const handleQtyOfTheDishesInCart = (): void => {
    let totalQty = 0;
    for (const key in dishesInCart) {
      if (dishesInCart.hasOwnProperty(key)) {
        totalQty += dishesInCart[key];
        setQtyOfTheDishesInCart(totalQty);
      }
    }
  };

  const handleSearchInputValue = (value: string): void => {
    dispatch(getValueSearchInput(value));
  };

  const handleClickCloseSearch = (): void => {
    dispatch(clearSearchInput());
  };

  const handleClickSearchbar = (): void => {
    setIsSearchbarOpen(!isSearchbarOpen);
  };

  useEffect(() => {
    handleQtyOfTheDishesInCart();
  }, [dishesInCart]);

  return (
    <div className="menubar-container">
      <div className="menubar-subcontainer">
        <div className="dishes-container">
          <NavLink to="/menu/breakfasts">Breakfasts</NavLink>
          <NavLink to="/menu/maindishes">Main dishes</NavLink>
          <NavLink to="/menu/soups">Soups</NavLink>
          <NavLink to="/menu/crepes">Crepe with fillings</NavLink>
          <NavLink to="/menu/wafflesandwiches">Waffle sandwiches</NavLink>
          <NavLink to="/menu/waffleburgers">Waffle burgers</NavLink>
          <NavLink to="/menu/sweetwaffles">Sweet waffles</NavLink>
          <NavLink to="/menu/croissants">Croissants</NavLink>
          <NavLink to="/menu/salads">Salads</NavLink>
          <NavLink to="/menu/pizzas">Pizzas</NavLink>
          <NavLink to="/menu/georgiandishes">Georgian dishes</NavLink>
          <NavLink to="/menu/desserts">Desserts</NavLink>
        </div>
        <div className="menubar-btns">
          {isSearchbarOpen ? (
            <div className="searchbar">
              <span className="material-symbols-outlined search-icon">
                search
              </span>
              <input
                type="search"
                placeholder="Write a dish..."
                onChange={(e) => handleSearchInputValue(e.target.value)}
              />
              <button
                onClick={() => {
                  handleClickSearchbar();
                  handleClickCloseSearch();
                }}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          ) : (
            <button
              className="search-btn menubar-btn"
              onClick={handleClickSearchbar}
            >
              <span className="material-symbols-outlined">search</span>
            </button>
          )}
          <NavLink to="/cart" className="cart-btn menubar-btn">
            <span className="material-symbols-outlined">shopping_cart</span>
            <p>{qtyOfTheDishesInCart}</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Menubar;
