import { useQuery } from "react-query";

export type Fruit = {
    id: number;
    name: string;
    price: number | null;
}

export const useGetFruits = () => {
  const { data, isLoading, isError } = useQuery<Fruit[]>('fruits', async () => {
    const response = await fetch('http://localhost:3001/fruits');
    return response.json();
  });

  return { data, isLoading, isError };
}