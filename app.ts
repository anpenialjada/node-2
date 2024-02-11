import express, { Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import { config } from 'dotenv';

config();

export const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

interface User {
  id: number;
  name: string;
  email: string;
}

// Base de datos en memoria
let users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

app.get('/status', (req: Request, res: Response) => {
  res.sendStatus(200);
});

// Obtiene todos los usuarios
app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

// Obtiene un usuario por ID
app.get('/users/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Inserta un nuevo usuario
app.post('/users', (req: Request, res: Response) => {
  const user: User = req.body;
  user.id = users.length + 1; // Asigna un nuevo ID basado en la longitud del arreglo
  users.push(user);
  res.status(201).json(user);
});

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
