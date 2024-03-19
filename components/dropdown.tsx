import { onValue } from "firebase/database";
import { useEffect, useState } from "react"


export default function Dropdown(props: {handleChange: any}){

    interface Item {
        item_id: string;
        item_name: string;
        quantity: number;
    }

    const [ inventory, setInventory ] = useState<Item[]>([]);

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
            <select onChange={props.handleChange} className="text-center w-min py-3 mx-auto border border-black rounded-md">
                <option value="---">--- Select Item ---</option>
                {inventory.map((item) => <option value={item.item_id} key={item.item_id} id={item.item_id}>{item.item_name}</option>)}
            </select>
        </>
    )
}