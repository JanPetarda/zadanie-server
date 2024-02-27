
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FormSchema = z.object({
    jedzenie: z
      .string({
        required_error: "Wybierz jedzenie!",
      })
});

export default function FoodForm() {
    const [selectedFood, setSelectedFood] = useState(""); 

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        setSelectedFood(data.jedzenie); 
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="jedzenie"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Jedzenie</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Wybierz" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="warzywa">Warzywa</SelectItem>
                                    <SelectItem value="owoce">Owoce</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
            {selectedFood && <h1>Wybrałeś {selectedFood}</h1>} 
        </Form>
    );
}
