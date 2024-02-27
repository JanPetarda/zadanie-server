
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "../components/ui/button";

type PriceProps = {
    setFruitPrice: (index: number, price: number) => void;
    index: number;
}

export default function Price({ setFruitPrice, index }: PriceProps) {
    const [price, setPrice] = useState<string>("");

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    return (
        <div className="m-6 py-6">
            <Input type="number" placeholder="Cena" value={price} onInput={handlePriceChange}></Input>
            <Button className="mt-4" onClick={() => setFruitPrice(index, parseFloat(price))}> Dodaj cenę</Button>
        </div>
    )
}

