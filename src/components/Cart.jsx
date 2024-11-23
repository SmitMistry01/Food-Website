//will update the cart component with the help of redux when we click the add btn on resItems will dispatch an action --> that will call the reducer fxn  --> which updates the slice of our redux store --> and the header component is subscribed to the store using selector --> cart is updated
export const Cart = () => {
  return (
    <div className="aboutus">
      <h1>Cart Page</h1>
    </div>
  );
};
