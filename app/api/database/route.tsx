import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL as string, {ssl: 'require'});


export async function GET(req: Request) {
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const sort = searchParams.get("sortalpha");
    if(id != null){
        const res = await sql`SELECT * FROM inventory WHERE item_id=${id}`;
        if(res.count == 0){
            return new Response("Item does not exist", { status: 404 });
        }
        console.log(res);
        return Response.json(res);
    }
    if(sort != null || sort != undefined){
        const res = await sql`SELECT * FROM inventory ORDER BY item_name`;
        return Response.json(res);
    }
    const res = await sql`SELECT * FROM inventory`;
    
    return Response.json(res);


}

export async function POST(req: Request){
    const {item_id, item_name, quantity} = await req.json();

    try{
        const res = await sql`INSERT INTO inventory(item_id, item_name, quantity) values(${item_id}, ${item_name}, ${quantity})`
        return NextResponse.json(res);
    }
    catch(e){
        console.log(e);
        return new NextResponse("No duplicate keys allowed", { status: 409});
    }

}

export async function PUT(req: Request){
    
    try{
        const { item_id, new_item_name, new_quantity} = await req.json();

        if(new_item_name === "" && new_quantity > 0){
            await sql`UPDATE inventory SET quantity=${new_quantity} WHERE item_id=${item_id}`;
            return new Response("Updated item quantity.", { status: 200 });
        }
        else if(new_quantity === "" || new_quantity < 1){
            await sql`UPDATE inventory SET item_name=${new_item_name} WHERE item_id=${item_id}`
            return new Response("Updated item name.", { status: 200 });
        }
        else{
            await sql`UPDATE inventory SET item_name=${new_item_name}, quantity=${new_quantity} WHERE item_id=${item_id}`
            return new Response("Updated item name and quantity", { status: 200 });
        }
    }
    catch(e){
        console.log(e);
    }


}

export async function DELETE(req: Request){
    try{
        const { searchParams } = await new URL(req.url);
        const id = searchParams.get("id");
        if(id == null || id == undefined || id == ""){
            return new Response("ERROR");
        }
        const searchItem = await sql`SELECT * FROM inventory WHERE item_id=${id}`;

        if(searchItem.count == 0){
            return new Response("Item does not exists", { status: 404 });
        }
        else{
            await sql`DELETE FROM inventory WHERE item_id=${id}`;
            return new Response("Successfully deleted item", { status: 200 });
        }
        
    }
    catch(e) {
        console.log(e);
    }
}
 

