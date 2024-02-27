"use client"
import ListContainer from "@/appComponents/ListContainer"
import FoodForm from "./appComponents/FoodForm"
import { useSignIn } from "./hooks/useSignIn";
 
export default function App() {
  const { mutate } = useSignIn();
  

  return (
    <div className="m-6">
      {/* probowalem zaimplemenowac button ktory zasymyluje zalogowanie uzytkownika przez pobranie secured cookies */}
      {/* <button onClick={() => mutate()}>Zaloguj</button> */}
      <FoodForm />
      <ListContainer />
    </div>

  )
}