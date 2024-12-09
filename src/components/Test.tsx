import { useCart } from "@/context/CartContext";

const Test = () => {
    const { addToCart } = useCart();
  
    const testAddProduct1 = () => {
      addToCart({ id: 1, name: 'Product 1', price: 10, quantity: 1, imageUrl: 'url1' });
    };
  
    const testAddProduct2 = () => {
      addToCart({ id: 2, name: 'Product 2', price: 20, quantity: 1, imageUrl: 'url2' });
    };
  
    return (
      <div>
        <button onClick={testAddProduct1}>Add Product 1</button>
        <button onClick={testAddProduct2}>Add Product 2</button>
      </div>
    );
  };
  
  export default Test;