import ProductItem from './ProductItem';
import classes from './Products.module.css';

const PRODUCTS = [
  {
    id: 'p1', 
    title: 'white shoe', 
    description: 'New in the market, amazing shoe',
    price: 6
  },
  {
    id: 'p2', 
    title: 'Woolen jacket', 
    description: 'New in the market, amazing jacket',
    price: 15
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {PRODUCTS.map(product => 
          <li key={product.id}>
            <ProductItem
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          </li>)}
      </ul>
    </section>
  );
};

export default Products;
