import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
// Components
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
// Styles
import { Wrapper } from "./App.styles";
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

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch(baseURL)).json();

const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  console.log(data);

  return (
    <div>
      <h1>Hello</h1>
      <h1>There</h1>
    </div>
  );
};

export default App;
