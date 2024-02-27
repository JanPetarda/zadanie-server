// import { Checkbox } from "@/components/ui/checkbox"
import Header from "@/appComponents/Header"
import Content from "@/appComponents/Content"
import { useState, useEffect } from "react"; 
import Price from "./Price";
import { Fruit, useGetFruits } from "../hooks/useGetFruits";

//Declaration of a types
export type FrontendFruit = Fruit & {
    isChecked: boolean
}

//Main component functionality

export default function ListContainer() {
    const [isOpen, setIsOpen] = useState(false);
    const [checkAll, setCheckAll] = useState(false)
    
    const { data, isLoading, isError } = useGetFruits()
        
    const [fruits, setFruits] = useState<FrontendFruit[]>([])

    useEffect(() => {
        if (!isLoading && !isError && data) {
            setFruits(prevFruits =>
              data.map(fruit => {
                const prevFruit = prevFruits.find(prevFruit => prevFruit.id === fruit.id);
                return {
                  ...fruit,
                  isChecked: prevFruit ? prevFruit.isChecked : false
                };
              })
            );
          }
        }, [data, isLoading, isError]);

    useEffect(()=> {
        setFruits((fruits) => fruits.map(f => 
            ({...f, isChecked: checkAll})))
    }, [checkAll])
    

    const updateCheckStatus = (id: number) => {
        setFruits((fruits) =>
            fruits.map((fruit) =>
                fruit.id === id ? 
                    { ...fruit, isChecked: !fruit.isChecked } : fruit ) 
                )
            }

    const setPrice = (index: number, newPrice: number) => {
        setFruits(fruits =>
            fruits.map((fruit, currentIndex) =>
                currentIndex === index
                    ? { ...fruit, price: newPrice } : fruit)
                )
            }

    const handleExpandChange = () => {
        setIsOpen(prev => !prev)
    }

    const toggleCheckAll = () => {
        setCheckAll(prevState => !prevState)
    }

    return(
        <div>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error fetching data</div>}
            {!isLoading && !isError && (
            <>
                <Header onExpandChange={handleExpandChange} onCheckedChange={toggleCheckAll} />
                {isOpen && <Content fruits={fruits} updateCheckStatus={updateCheckStatus} />}
                {fruits.map((fruit, index) => {
                    return fruit.isChecked && <Price key={fruit.id} index={index} setFruitPrice={setPrice} />;
                })}
            </>
      )}
        </div>
    )
}

