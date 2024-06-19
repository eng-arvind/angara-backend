import { Request, Response ,NextFunction} from 'express';
import pool from '../config/db';
import { Product } from '../models/product';
import { Order } from '../models/order';



export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM product');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'There are no product' });
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await pool.query(`select * from product where id=${id}`);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Task not found' });
      
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try{
    const { title, imageUrl, price }: Product = req.body;
    const addQuery=`insert into product(title,imageUrl,price) values('${title}','${imageUrl}','${price}')`;
    await pool.query(addQuery);
    res.status(201).json({ message: 'product created successfully'})
  }
  catch{
      res.status(400).json({ message: 'product creation failed'})
  }
};

export const placeOrder = async (req: Request, res: Response): Promise<void> => {
  try{
    const { title,price,order_no, imageUrl,  }: Order = req.body;
    console.log(req.body);
    
    const addQuery=`insert into "Order" (title,price,order_no,"imageUrl") values('${title}',${price},${order_no},'${imageUrl}')`;
    await pool.query(addQuery);
    res.status(201).json({ message: 'Order placed created successfully'})
  }
  catch{
      res.status(400).json({ message: 'Order not placed'})
  }
};

export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('select * from product where cart=true');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'There are no product' });
  }
};

export const updateCart = async (req: Request, res: Response): Promise<void> => {
  try{
    const { productId  } = req.body;
    const addQuery=`update product set cart=true where id=${productId}`;
    await pool.query(addQuery);
    res.status(201).json({ message: 'cart updated successfully'})
  }
  catch{
      res.status(400).json({ message: 'cart not updated'})
  }
};
export const deleteCart = async (req: Request, res: Response): Promise<void> => {
  try{
    const { productId  } = req.body;
    const addQuery=`update product set  cart='${false}' where id=${productId}`;
    await pool.query(addQuery);
    res.status(201).json({ message: 'cart deleted successfully'})
  }
  catch{
      res.status(400).json({ message: 'cart not deleted'})
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const product_id = req.params.id
  const { title, imageUrl, price } = req.body;
  const idpresentquery = `select * from product where id=${product_id}`;
  const idpresent = await pool.query(idpresentquery)
  try{
      if(idpresent.rows[0] != undefined){
          const updateQuery = `update product set  title='${title}', imageUrl='${imageUrl}', price='${price}' where id=${product_id}`
          await pool.query(updateQuery)
          res.status(200).json({ message: 'product updated successfully' })
      }
      else{
          res.status(404).json({ message: 'product not found!' })
      }
  }
  catch{
          res.status(200).json({ message: 'product updation failed' })
  
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM "Order"');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'There are no Order placed' });
  }
};
