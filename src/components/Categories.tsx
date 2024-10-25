import React from 'react';

type CategoriesProps = {
  value: number,
  onClickCategory: (idx: number)=>void;
  getCategories?: (categories: string[]) => void;
};

export const categories=[
  'All',
  'Meat',
  'Vegan',
  'Grill',
  'Spicy',
  'Closed',
];

export const Categories: React.FC<CategoriesProps> = React.memo(({value, onClickCategory}) =>{

  //getCategories?.(categories); //если этой функции не будет, то сл часть не вызовется

    return (
      <div className="categories">
        <ul>
           {categories.map((categoryName,i)=>(
            <li key={i} onClick={()=>onClickCategory(i)} className={value === i ? 'active' : ''}>{categoryName}</li>
           ))}
        </ul>
      </div>
    );
  })
