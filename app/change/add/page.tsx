'use client';

import Link from "next/link";
import { useState } from "react";


export default function Add(){

    

    const [ formData, setFormData ] = useState({
        item_id: "",
        item_name: "",
        quantity: 0,
    });

    function handleSubmit(e: any){
        if(formData.item_id == "" || formData.item_name == "" || formData.quantity < 1){
            alert("One or more fields are blank. All fields must be filled out");
            return 0;
        }
        createItem(formData);
        
    }

    const handleIdChange = (e: any) => {
        setFormData(existingValues => ({
            ...existingValues,
            item_id: e.target.value
        }))
    };

    const handleNameChange = (e: any) => {
        setFormData(existingValues => ({
            ...existingValues,
            item_name: e.target.value
        }))
    }

    const handleQuantityChange = (e: any) => {
        setFormData(existingValues => ({
            ...existingValues,
            quantity: e.target.value
        }))
    }

    async function createItem(formData: {item_id: string, item_name: string, quantity: number}){
        try{
            const res = await fetch("../api/database", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    item_id: formData.item_id,
                    item_name: formData.item_name,
                    quantity: formData.quantity
                })

            })
            
            if(res.status == 409){
                console.log("Item ID already exists");
                alert("ERROR: Item ID already exists");
            }
            else{
                console.log("Succesfully added to database");
                alert("Item has been successfully added to the database");
            }
            
        }
        catch(e){
            alert(e);
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

        <div className="flex flex-col w-screen h-dvh justify-center items-center gap-10">
            <h1 className="text-3xl">Add Item</h1>
            <form action={handleSubmit} className="flex flex-col">
                <label htmlFor="id" className="">Item ID:</label>
                <input type="text" className="border border-black p-2" placeholder="Item ID" id="id" onChange={handleIdChange}/>
                <label htmlFor="name" className="pt-4">Item Name:</label>
                <input type="text" className="border border-black p-2" placeholder="Item Name" id="name" onChange={handleNameChange}/>
                <label htmlFor="quantity" className="pt-4">Quantity:</label>
                <input type="number" className="border border-black p-2" placeholder="Quantity" id="quantity" onChange={handleQuantityChange}/>
                <input type="submit" className="mt-8 p-2 border border-black" />
            </form>
        </div>
        </>
    )
} 
