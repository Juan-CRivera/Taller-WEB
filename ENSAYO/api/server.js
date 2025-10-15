// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON
app.use(express.json());

// Datos de prueba 
const data = [
  { id: '1', isActive: true, picture: 'https://picsum.photos/seed/1/100/100', datePublish: '2023-01-15', nameBook: 'El psicólogo', gender: 'terror psicológico' },
  { id: '2', isActive: false, picture: 'https://picsum.photos/seed/2/100/100', datePublish: '2023-02-20', nameBook: 'La sombra', gender: 'suspenso' },
  { id: '3', isActive: true, picture: 'https://picsum.photos/seed/3/100/100', datePublish: '2023-03-10', nameBook: 'Miedo en la noche', gender: 'terror psicológico' },
  { id: '4', isActive: false, picture: 'https://picsum.photos/seed/4/100/100', datePublish: '2023-04-05', nameBook: 'El silencio', gender: 'suspenso' },
  { id: '5', isActive: true, picture: 'https://picsum.photos/seed/5/100/100', datePublish: '2023-05-12', nameBook: 'La casa encantada', gender: 'terror psicológico' },
  { id: '6', isActive: false, picture: 'https://picsum.photos/seed/6/100/100', datePublish: '2023-06-18', nameBook: 'El asesino perfecto', gender: 'suspenso' },
  { id: '7', isActive: true, picture: 'https://picsum.photos/seed/7/100/100', datePublish: '2023-07-22', nameBook: 'El misterio del bosque', gender: 'terror psicológico' },
  { id: '8', isActive: false, picture: 'https://picsum.photos/seed/8/100/100', datePublish: '2023-08-30', nameBook: 'La última llamada', gender: 'suspenso' },
  { id: '9', isActive: true, picture: 'https://picsum.photos/seed/9/100/100', datePublish: '2023-09-01', nameBook: 'El espejo roto', gender: 'terror psicológico' },
  { id: '10', isActive: false, picture: 'https://picsum.photos/seed/10/100/100', datePublish: '2023-10-15', nameBook: 'El hombre sin rostro', gender: 'suspenso' }
];

// Función para obtener fecha y hora actual
const getDateTime = () => {
  const now = new Date();
  return now.toLocaleString('es-ES', { timeZone: 'America/Bogota' });
};

// Endpoint: GET /allData
app.get('/allData', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({
    status: true,
    data: data,
    dateTime: getDateTime()
  });
});

// Endpoint: GET /dataInfo/:idItem
app.get('/dataInfo/:idItem', (req, res) => {
  const { idItem } = req.params;
  const item = data.find(d => d.id === idItem);
  if (!item) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(404).json({
      status: false,
      error: 'Item no encontrado',
      dateTime: getDateTime()
    });
  }
  res.setHeader('Content-Type', 'application/json');
  res.json({
    status: true,
    item: item,
    dateTime: getDateTime()
  });
});



// Endpoint: GET /dataInfoQuery (con parámetros de consulta para status y genero)
app.get('/dataInfoQuery', (req, res) => {
  let filtered = [...data];
  const { status, gender } = req.query;

  // Filtrar por status si existe
  if (status !== undefined) {
    const isActive = status === 'true';
    filtered = filtered.filter(d => d.isActive === isActive);
  }

  // Filtrar por gender si existe
  if (gender) {
    filtered = filtered.filter(d => d.gender.toLowerCase().includes(gender.toLowerCase()));
  }

res.setHeader('Content-Type', 'application/json');
  res.json({
    status: true,
    data: filtered,
    dateTime: getDateTime()
  });
});

// Ruta raíz para evitar "Cannot GET /"
app.get('/', (req, res) => {
  res.json({
    message: "API de Libros - Taller Web",
    endpoints: {
      allData: "/allData",
      itemById: "/dataInfo/:id",
      search: "/dataInfoQuery?status=true&gender=suspenso"
    },
    dateTime: new Date().toLocaleString('es-ES', { timeZone: 'America/Bogota' })
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});