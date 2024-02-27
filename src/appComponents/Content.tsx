import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FrontendFruit } from "./ListContainer"

type ContentProps = {
    updateCheckStatus: (id: number) => void
    fruits: FrontendFruit[]
}

export default function Content({ updateCheckStatus, fruits }: ContentProps) {
    
    return (
        <>
            {fruits.map((fruit) => (
                <div key={fruit.id} className="flex items-center mb-4 ml-10 space-x-2">
                <Checkbox 
                    className="w-6 h-6 mr-6 "
                    id={`fruit-${fruit.id}`} 
                    checked={fruit.isChecked}
                    onCheckedChange={() => updateCheckStatus(fruit.id)}
                /> 
                <Label className="text-xl m-4" htmlFor={`fruit-${fruit.id}`}>{fruit.name}</Label>
                <p className="text-xl">{fruit.price}</p>
            </div>
      ))}
        </>
    )
}