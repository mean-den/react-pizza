import { createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaItem, SearchPizzaParams } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
    'pizzas/fetchPizzasStatus',
    async (params) => {
      const { sortBy, order, category, search, currentPage } = params;
      const { data } = await axios.get<PizzaItem[]>(
        `https://63971dca86d04c76338b4c05.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      );
  
      return data;
    },
  );