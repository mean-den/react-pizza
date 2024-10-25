import React from 'react';

import { useSelector } from 'react-redux';

import { Skeleton, PizzaBlock, Categories, Sort, Pagination } from '../components';

import { selectPizzaData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const {items, status} = useSelector(selectPizzaData);
  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);

  const onClickCategory=React.useCallback((idx: number)=>{
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) =>{
    dispatch(setCurrentPage(page));
  }

  const getPizzas=async()=>{
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

      dispatch(
        fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }));
      window.scrollTo(0, 0);
  }

  // React.useEffect(()=>{
  //   if(isMounted.current){
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
       
  //      navigate(`?${queryString}`);
  //   }
  //   //isMounted.current=true;
  //   if(!window.location.search){
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  // }, [categoryId,sort.sortProperty,searchValue,currentPage]);

  React.useEffect(() => {
      getPizzas();
  }, [categoryId,sort.sortProperty,searchValue,currentPage]);

  //can't touch this
  // React.useEffect(() => {
  //   window.scrollTo(0,0);

  //   if(!isSearch.current){
  //     getPizzas();
  //   }
    
  //   isSearch.current = false;
  // }, [categoryId,sort.sortProperty,searchValue,currentPage]);

  // React.useEffect(()=>{
  //   if(window.location.search){
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj)=>obj.sortProperty===params.sortBy);
  //     dispatch(setFilters({
  //       searchValue: params.search,
  //       categoryId: Number(params.category),
  //       currentPage: Number(params.currentPage),
  //       sort: sort || sortList[0],   
  //     }));
  //   }
  //   isMounted.current = true;
  // }, []);

  const pizzas = items.map((obj: any) => (
    <PizzaBlock key={obj.id} {...obj} />
  ));
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
    <div className="content__top">
            <Categories 
            value={categoryId} 
            onClickCategory={onClickCategory} 
            />
            <Sort value={sort}/>
          </div>
          <h2 className="content__title">All pizzas</h2>
          {
            status === 'error' ? (
            <div className="content__error-info">
            <h2>An error has occured😕</h2>
            <p>Failed to get pizzas</p>
            </div>
            ):(
            <div className="content__items">
            {status === 'loading'
              ? skeletons
              : pizzas}
            </div>
            )
          }
          
          <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  );
};

export default Home;
