import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.URI);
const db = client.db(process.env.DB_NAME);
const collection = db.collection(process.env.COLLECTION_NAME);

const pizza1 = {
    pizzaType: 1,
    name: 'Pepperoni',
    crust: 'traditional',
    cheese: 'mozzarella',
    topping1: 'pepperoni',
    topping2: null,
    topping3: null,
    size: 'medium',
    price: 15,
};

const pizza2 = {
    pizzaType: 2,  
    name: 'Hawaiian',
    crust: 'thin-crust',
    cheese: 'mozzarella',
    topping1: 'ham',
    topping2: 'pineapple',
    topping3: null,
    size: 'small',
    price: 12,
}

const pizza3 = {
    pizzaType: 3,
    name: 'Veggie',
    crust: 'traditional',
    cheese: 'mozzarella',
    topping1: 'green peppers',
    topping2: 'olives',
    topping3: 'onions',
    size: 'large',
    price: 18,
}

const customer1 = {
    customType: 1, 
    name: 'Daniel Silva', 
    address: '7035 Beracasa Way #207, Boca Raton, FL 33433',
    phone: '5617880987',
    email: 'bocacode@gmail.com', 
    loyalty_points: 'ds123',
}

const customer2 = {
    customType: 2, 
    name: 'Todd Albert', 
    address: '21803 Oakwood Park #207, Boca Raton, FL 33433',
    phone: '5616781234',
    email: 'talbertboca@gmail.com', 
    loyalty_points: 'ta123',
}

const orderItem1 = {
    orderItem: {'63cae859cc0486edeea504bf': 1},
    customer_id: {'63cae99fd60efe1e3f71d363' : 1}, 
    delivery: true, 
}

const orderItem2 = {
    orderItem: [{'63cae859cc0486edeea504bf': 1}, {'63cae935d974d77e8aebf528': 2}, {'63cae959296bac5dda8adcd8': 3}],
    customer_id: {'63cae9a0d60efe1e3f71d364' : 1}, 
    delivery: true, 
}

const orderItem4 = {
    orderItem: pizza3, //{'63cae935d974d77e8aebf528': 2},
    customer_id: customer2, //'63cae9a0d60efe1e3f71d364', 
    delivery: true, 
}


/* CRUD: CREATE 
*********************************** */
const insertItem = async thisItem => {
    const result = await collection.insertOne(thisItem);
    console.log('Item Added:', thisItem);
}
/* CRUD: DELETE
*********************************** */
const deleteItem = async(thisId) => {
    const itemId = { _id: new ObjectId(thisId) }
    await collection.deleteOne(itemId);
    console.log('Item Deleted:', itemId);
}

/* CRUD: READ 
*********************************** */

const getListing = async (customerId, queryLimit) => {
    const cusId = {_id: new ObjectId(customerId)}
    const result = await collection.find(cusId).limit(queryLimit).toArray()
    console.table(result); 
}

//await insertItem(orderItem4);
//await insertItem(orderItem2);
//await deleteItem("63cae86ed250b11796c9af9c")
await getListing('63cae9a0d60efe1e3f71d364', 0);

client.close();
