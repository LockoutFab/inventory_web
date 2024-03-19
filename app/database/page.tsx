"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Database(){

    type Inventory = {
        item_id: number;
        item_name: string;
        quantity: number;
    }

    const [ inventory, setInventory ] = useState<Inventory[]>([]);

    

    useEffect(() => {
        async function getInventory(){

            try{
                const req = await fetch("/api/database?sortalpha=true", {
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

    return(
        <>
            
            <div className="flex w-screen p-0 m-0 h-20">
            <div className=" flex grow bg-black items-center justify-center">
                <div className="text-white text-[2rem] h-min w-fit">Lockout USA</div>
            </div>
            </div>
            <div className="flex w-1/4 items-center justify-center h-20 mx-auto">
                <div className="border-black border rounded-md px-2 py-1">
                    <Link href="/change"><button>Edit Inventory</button></Link>
                </div>
            </div>
            <div className="flex flex-col w-2/3 mx-auto">
                <table className="border-collapse border-black border table-auto">
                    <thead>
                        <tr>
                            <th className="border border-black">ID</th>
                            <th className="border border-black">Device</th>
                            <th className="border border-black">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map(function(data){
                            return (
                                <>
                                    <tr key={data.item_id}>
                                        <td key={data.item_id} className="border border-black">{data.item_id}</td>
                                        <td key={data.item_name} className="border border-black">{data.item_name}</td>
                                        <td key={data.quantity} className="border border-black">{data.quantity}</td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}