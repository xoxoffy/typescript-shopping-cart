import { useState } from "react";
import { useQuery } from "react-query";
// Components
import Item from "./components/Item/Item";
import Cart from "./components/Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
// Styles
import { Wrapper, StyledButton } from "./App.styles";
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const baseURL = "https://fakestoreapi.com/products";

// await and await??
const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch(baseURL)).json();

const App = () => {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  // I have no idea how useQuery works and what it does exactly. Why useQuery instead of useEffect?
  // What are the differences
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  // wtf is ack?
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  // How are we accessing the previousState??
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((previousState) => {
      // Is the item already in the cart?
      const isItemInCart = previousState.find(
        (item) => item.id === clickedItem.id
      );

      if (isItemInCart) {
        return previousState.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...previousState, { ...clickedItem, amount: 1 }];
    });
  };

  // ack?!
  const handleRemoveFromCart = (id: number) => {
    setCartItems((previousState) =>
      previousState.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div> Something went wrong.. </div>;

  return (
    <Wrapper>
      <Drawer
        anchor="right"
        open={cartIsOpen}
        onClose={() => setCartIsOpen(false)}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <StyledButton onClick={() => setCartIsOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>

      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
