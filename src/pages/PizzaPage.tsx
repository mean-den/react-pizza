import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const PizzaPage: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();  
  const {id} = useParams();
  const navigate = useNavigate();

  React.useEffect(()=>{
    async function fetchPizza() {
        try {
            const {data} = await axios.get('https://63971dca86d04c76338b4c05.mockapi.io/items/'+ id);
            setPizza(data);
        } catch (error) {
            alert('Error while getting pizza!');
            navigate('/');
        }
    }

    fetchPizza();
  }, []); 

  if(!pizza){
    return <>Loading...</>;
  }

  return (
    <div className="container">
        <img src={pizza.imageUrl}/>
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} €</h4>
        <Link to='/notfoundnigga'>
          <button className="button button--outline button--add">
            <span>Back</span>
          </button>
        </Link>
    </div>
  )
}
 
export default PizzaPage