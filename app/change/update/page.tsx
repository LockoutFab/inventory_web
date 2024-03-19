'use client';

import Link from "next/link";
import Dropdown from "@/components/dropdown";
import { useEffect, useState } from "react";



export default function Update(){


    interface UpdatedItem {
        item_id: string;
        new_item_name: string;
        new_quantity: number;
    }

    const [ new_item, set_new_item ] = useState<UpdatedItem>({
        item_id: "---",
        new_item_name: "",
        new_quantity: 0
    });

    let item = "";

    const handleItemChange = (e: any) => {
        set_new_item(existingValues => ({
            ...existingValues,
            item_id: e.target.value
        }))
    }

    const handleNameChange = (e: any) => {
        set_new_item(existingValues => ({
            ...existingValues,
            new_item_name: e.target.value
        }))
    }

    const handleQuantityChange = (e: any) => {
        set_new_item(existingValues => ({
            ...existingValues,
            new_quantity: e.target.value
        }))
    }

    function handleSubmit(){
        if(new_item.item_id == "---" || new_item.item_id == ""){
            alert("Please select an item");
        }
        else if(new_item.new_quantity < 0){
            alert("Number can not be negative");
        }
        else{
            callApi();
            
        }
    }

    async function callApi(){
        try{
            const res = await fetch("../api/database", {
                method: "PUT",
                body: JSON.stringify({
                    item_id: new_item.item_id,
                    new_item_name: new_item.new_item_name,
                    new_quantity: new_item.new_quantity
                })
            })

            if(res.status == 200){
                alert(`Item ${new_item.item_id} has been updated successfully`);
            }
            
        }
        catch(e){
            console.log(e);
        }
    }


    return(
        <>
            <div className="flex w-screen p-0 m-0 h-20 absolute">
                <div className=" flex grow bg-black items-center justify-center">
                    <Link href="/"><div className="text-white text-[2rem] h-min w-fit">Lockout USA</div></Link>
                </div>
            </div>

            <div className="container flex flex-col w-3/4 mx-auto justify-center gap-5 h-dvh">
                <Dropdown handleChange={handleItemChange}/>
                <form action={handleSubmit} className="flex mx-auto flex-col items-center justify-center gap-5">
                    <div className="text-center flex flex-col justify-center items-center">
                        <label htmlFor="item_name">New Item Name: {item}</label>
                        <input type="text" name="item_name" className="border-2 border-black rounded-md p-2" onChange={handleNameChange}/>
                    </div>
                    <div className="text-center flex flex-col justify-center items-center">
                        <label htmlFor="quantity">New Quantity:</label>
                        <input type="number" name="quantity" min="0" className="border-2 border-black rounded-md p-2 w-1/2" onChange={handleQuantityChange}/>
                    </div>
                    <div>
                        <input type="submit" className="border border-black px-3 py-1 hover:bg-sky-500 hover:shadow-md transition ease-out duration-500" />
                    </div>
                </form>
            </div>

        </>
    )
}