import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import db from '../utils/db';

export const getProducts = async (req: Request, res: Response,  next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const products = await db.all('SELECT * FROM products LIMIT ? OFFSET ?', [limit, offset]);
    res.json(products);  // Respond with the products list
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return; // Ensure early return on validation failure
  }

  try {
    const { id } = req.params;
    const product = await db.get('SELECT * FROM products WHERE id = ?', [id]);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;  // Ensure early return if product is not found
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return; // Ensure early return on validation failure
  }

  try {
    const { name, price, description } = req.body;
    const result = await db.run(
      'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
      [name, price, description]
    );
    res.status(201).json({ id: result.lastID, name, price, description });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return; // Ensure early return on validation failure
  }

  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    await db.run(
      'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
      [name, price, description, id]
    );
    res.json({ message: 'Product updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return; // Ensure early return on validation failure
  }

  try {
    const { id } = req.params;
    await db.run('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const searchProducts = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return; // Ensure early return on validation failure
  }

  try {
    const { q } = req.query;
    const products = await db.all('SELECT * FROM products WHERE name LIKE ?', [`%${q}%`]);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
