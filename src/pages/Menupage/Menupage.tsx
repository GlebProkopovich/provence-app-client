import { CSSProperties, FC, useEffect, useState } from 'react';
import Menubar from '../../components/Menubar/Menubar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../state';
import { NavLink } from 'react-router-dom';
import { IDishData, ISearchValue } from '../../types';
import PostDish from '../../components/PostDish/PostDish';
import { BeatLoader } from 'react-spinners';
import { Pagination, PaginationItem } from '@mui/material';
import './Menupage.scss';

const Menupage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataReceived, setDataReceived] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageQty, setPageQty] = useState<number>(0);
  const { dishUrl } = useParams<{ dishUrl: any }>();

  const dishesData = useSelector(
    (state: IDishData) => state.dishesData.dishesAllInfo.dishes
  );
  const totalDishesQty = useSelector(
    (state: IDishData) => state.dishesData.dishesAllInfo.total
  );
  const limitDishesQty = useSelector(
    (state: IDishData) => state.dishesData.dishesAllInfo.limit
  );
  const searchValue = useSelector((state: ISearchValue) => state.search.value);

  const dispatch = useDispatch();

  const { getDishes } = actionCreators;

  const override: CSSProperties = {
    width: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '50px auto',
  };

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        await dispatch(getDishes(dishUrl, page, searchValue));
        setLoading(false);
        setDataReceived(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDishes();
  }, [dishUrl, page, searchValue]);

  useEffect(() => {
    setPage(1);
  }, [dishUrl]);

  useEffect(() => {
    setPageQty(Math.ceil(totalDishesQty / limitDishesQty));
    setDataReceived(false);
  }, [dataReceived]);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        setIsSmallScreen(window.visualViewport.width <= 660);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Menubar />
      {loading ? (
        <BeatLoader
          color={'#c90000'}
          loading={loading}
          cssOverride={override}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : dishesData.length ? (
        <>
          <div className="menuRestaurantpage-container">
            <h2>{dishesData?.[0].category}</h2>
            <div className="postdish-list">
              {dishesData?.map((el: any) => {
                return (
                  <PostDish
                    key={el._id}
                    id={el._id}
                    imgSrc={el.imgSrc}
                    altImg={el.altImg}
                    title={el.title}
                    price={el.price}
                  />
                );
              })}
            </div>
            <div className="pagination-container">
              {pageQty > 1 && (
                <Pagination
                  count={pageQty}
                  page={page}
                  onChange={(_, num) => {
                    setPage(num);
                  }}
                  size={isSmallScreen ? 'small' : 'large'}
                  sx={{ fontSize: '50px' }}
                  renderItem={(item) => (
                    <PaginationItem
                      component={NavLink}
                      to={`/menu/${dishUrl}/?page=${item.page}`}
                      {...item}
                    />
                  )}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="searchResults">
          There isn't this dish here, you can find this one in the other
          category in menu :)
        </div>
      )}
    </>
  );
};

export default Menupage;
