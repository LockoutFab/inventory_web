'use client';
import Link from "next/link";
import { useEffect, useState } from "react";



export default function Change(){

    type Inventory = {
        id: number;
        item: string;
        quantity: number;
    }

    const [inventory, setInventory] = useState<Inventory[]>([]);

    let names: string[] = [""];


    useEffect(() => {
        async function getInventory(){
            try{
                const req = await fetch("/api/database", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
    
                const data = await req.json();
                setInventory(data);
    
            }
            catch(e){
                console.log(e);
            }
        }
        getInventory();
    }, [])

    function addToNames(){
        inventory.map((item) => {
            names.push(item.item);
        })
    }

    addToNames();
    

    return(
        <>
            <div className="flex w-screen p-0 m-0 h-20 absolute">
                <div className=" flex grow bg-black items-center justify-center">
                    <Link href="/"><div className="text-white text-[2rem] h-min w-fit">Lockout USA</div></Link>
                </div>
            </div>



            <div className="flex h-dvh w-3/4 mx-auto items-center">
                <div className="w-full grid grid-cols-3 gap-4 text-center">
                    <div className="container border border-black p-5">
                        <Link href="/change/add" className="border border-black px-3 py-1 hover:bg-green-500 hover:shadow-md transition ease-out duration-500 text-2xl">Add</Link>
                        <p className="p-5">This button will add a new item to the database. Please make sure the new item id is unique.</p>
                    </div>
                    <div className="container border border-black p-5">
                        <Link href="/change/update" className="border border-black px-3 py-1 hover:bg-sky-500 hover:shadow-md transition ease-out duration-500 text-2xl">Modify</Link>
                        <p className="p-5">This button will modify the item's parameters such as id, item name, and the quantity.</p>
                    </div>
                    <div className="container border border-black p-5">
                        <Link href="/change/delete" className="border border-black px-3 py-1 hover:bg-red-500 hover:shadow-md transition ease-out duration-500 text-2xl">Delete</Link>
                        <p className="p-5">CAUTION: This button will delete an item from the database.</p>
                    </div>
                    
                </div>
            </div>
        </>
    )
}