'use client';

import Dropdown from "@/components/dropdown";
import Link from "next/link";
import { useState } from "react";

export default function Delete() {

    const [ item_id, set_item_id ] = useState<string>();

    async function handleSubmit(){
        try{
            const confirmBox = window.confirm("Are you sure you want to proceed? Action can not be undone");
            if(confirmBox === true){
                const res = await fetch(`../api/database?id=${item_id}`, {
                    method: "GET"
                })
                if(res.status == 404){
                    alert(res.json());
                }
                else{
                    await fetch(`../api/database?id=${item_id}`, {
                        method: "DELETE"
                    })
                    alert("Successfully deleted item");
                }
            }
            else{
                return;
            }
        }
        catch(e){
            console.log(e);
        }

    }

    const handleItemChange = (e: any) => {
        set_item_id(e.target.value);
    }

    return(
        <>
            <div className="flex w-screen p-0 m-0 h-20 absolute">
                <div className=" flex grow bg-black items-center justify-center">
                    <Link href="/"><div className="text-white text-[2rem] h-min w-fit">Lockout USA</div></Link>
                </div>
            </div>

            <div className="container flex flex-col w-3/4 mx-auto justify-center gap-5 h-dvh">
                <h1 className="text-center text-[3rem] mb-2">Delete Item</h1>
                <form action={handleSubmit} className="flex mx-auto flex-col items-center justify-center gap-5">
                    <Dropdown handleChange={handleItemChange}/>
                    <input type="submit" className="border border-black px-3 py-1 hover:bg-red-500 hover:shadow-md transition ease-out duration-500" />
                </form>
            </div>
        </>
    )
}