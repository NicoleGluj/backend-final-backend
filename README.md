# Proyecto Final Full Stack – Mimuri 🧸

Aplicación **Full Stack** desarrollada como **proyecto final de la Diplomatura en Programación Web Full Stack (UTN)**.  
El objetivo de este proyecto es desarrollar Mimuri, una tienda de muebles infantiles, como parte del Trabajo Práctico: Desarrollo y Deploy de una API REST en TypeScript:

- **Frontend:** React + Vite.
- **Backend:** API REST con Node.js + Express + TypeScript + MongoDB.
- **Servicios adicionales:** Cloudinary para imágenes y Resend para envío de correos.

---

## 🧭 Repositorios

- **Backend:** https://backend-final-backend.onrender.com
- **Frontend:** https://backend-final-backend.onrender.com

---

## 🧱 Tecnologías principales

### Backend

- **Runtime:** Node.js
- **Lenguaje:** TypeScript
- **Framework:** Express
- **Base de datos:** MongoDB (Mongoose)
- **Autenticación:** JWT + bcryptjs
- **Subida de archivos:** multer + multer-storage-cloudinary + Cloudinary
- **Emailing:** Resend
- **Logs HTTP:** morgan + logger personalizado
- **Validación:** zod
- **Otros:** cors, dotenv, path, fs

### Frontend

- **Framework:** React
- **Bundler / Dev server:** Vite
- **Routing:** React Router DOM
- **Estilos:** CSS / Tailwind / estilos personalizados (según implementación)
- **Estado:** React Hooks (`useState`, `useEffect`, contextos como `AuthContext`)
- **Consumo de API:** `fetch` o `axios` contra el backend desplegado

---

## 📁 Estructura del proyecto

### Backend (`backend-final-backend/src/`)

```text
src/
  config/
    cloudinary.ts         # Configuración de Cloudinary
    logger.ts             # Logger con morgan hacia archivos locales
    mongodb.ts            # Conexión a MongoDB
  controllers/
    authController.ts     # Registro y login de usuarios
    productController.ts  # CRUD de productos
  interfaces/
    IProduct.ts           # Interfaz de producto
    IUser.ts              # Interfaz de usuario
    IUserTokenPayload.ts  # Payload del JWT
  middleware/
    authMiddleware.ts     # Verifica JWT en rutas protegidas
    rateLimitMiddlware.ts # Límite de peticiones en auth/login
    uploadMiddleware.ts   # Configuración de multer + Cloudinary
  model/
    ProductModel.ts       # Modelo de producto
    UserModel.ts          # Modelo de usuario
  routes/
    authRouter.ts         # Rutas /auth
    productRouter.ts      # Rutas /products
  services/
    emailServices.ts      # Servicio /email/send
  templates/
    emailTemplate.ts      # Template HTML para correos
  index.ts                # Punto de entrada de la app

uploads/                  # Carpeta de archivos (para uso local)
logs/                     # Archivos de logs HTTP
```

### Frontend (`backend-final-frontend/` – estructura aproximada)

```text
src/
  components/
    Layout.tsx / .jsx         # Layout general de la app
    Navbar.tsx                # Barra de navegación
    Footer.tsx                # Pie de página
    UpdateProduct.tsx         # Formulario de edición de producto
    ProductCard.tsx           # Tarjetas de productos
  pages/
    Home.tsx                  # Listado de productos, sliders, hero, etc.
    Products.tsx              # Vista de catálogo con filtros
    Login.tsx                 # Inicio de sesión de administrador
    Register.tsx              # Registro de usuario (si aplica)
    Contact.tsx               # Formulario de contacto
    Admin.tsx                 # Panel para CRUD de productos (protegido)
  context/
    AuthContext.tsx           # Manejo de autenticación (token, usuario)
  constants/
    categories.ts             # Constantes de categorías de productos
  router/
    AppRouter.tsx             # Rutas principales con React Router
  main.tsx                    # Punto de entrada de React + Vite
```

> La estructura exacta puede variar, pero la idea general es separar **componentes reutilizables**, **páginas**, **contextos** y **configuración de rutas**.

---

## 🔧 Instalación y configuración – Backend

1. **Clonar el repositorio**

```bash
git clone <https://github.com/NicoleGluj/backend-final-backend>
cd backend-final-backend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Crear archivo `.env` en la raíz del proyecto**

Ejemplo de configuración mínima:

```env
# Puerto en el que se levanta el servidor
PORT=3000

# Conexión a MongoDB
URI_DB=mongodb+srv://usuario:password@cluster/mi_base?retryWrites=true&w=majority

# Clave secreta para firmar JWT
SECRET_KEY=una_clave_segura_y_larga

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Resend (email)
RESEND_API_KEY=tu_api_key_de_resend
EMAIL_USER=tu_correo_destino@dominio.com
```

> ⚠️ Si falta alguna de estas variables críticas (`PORT`, `URI_DB`, `SECRET_KEY`, `CLOUDINARY_*`, `RESEND_API_KEY`, `EMAIL_USER`), la aplicación puede fallar al iniciar o al usar ciertas funcionalidades.

4. **Compilar (opcional para desarrollo local)**

```bash
npm run build
```

5. **Levantar el servidor en desarrollo**

```bash
npm run dev
```

El servidor se levantará en `http://localhost:3000` (o el puerto definido en `PORT`).

6. **Levantar en producción (después de build)**

```bash
npm start
```

---

## 💻 Instalación y configuración – Frontend (React + Vite)

1. **Clonar el repositorio del frontend**

```bash
git clone https://github.com/NicoleGluj/backend-final-frontend.git
cd backend-final-frontend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno de Vite**

```env
VITE_API_URL= backend desplegado
```

4. **Levantar el frontend en modo desarrollo**

```bash
npm run dev
```

---

## 🌍 Uso general de la aplicación

1. Levantar el **backend** (dev o producción).
2. Configurar `VITE_API_URL` en el frontend apuntando al backend.
3. Levantar el **frontend** con `npm run dev` o acceder a la URL de despliegue (Vercel u otro).
4. Navegar por la tienda:

   - Ver el listado de productos.
   - Usar filtros de nombre/categoría/rango de precio.
   - Enviar consultas desde el formulario de contacto (usa `/email/send`).
   - (Opcional) Iniciar sesión como admin para:
     - Crear productos nuevos.
     - Editar productos existentes.
     - Eliminar productos.

---

## 📜 Scripts disponibles

### Backend (`backend-final-backend`)

En `package.json`:

```json
"scripts": {
  "dev": "ts-node-dev ./src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

- `npm run dev` → Levanta el servidor en modo desarrollo con recarga.
- `npm run build` → Compila TypeScript a JavaScript en `dist`.
- `npm start` → Ejecuta la versión compilada (`dist/index.js`).

### Frontend (`backend-final-frontend`)

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

- `npm run dev` → Modo desarrollo.
- `npm run build` → Build de producción (carpeta `dist`).
- `npm run preview` → Previsualizar el build localmente.

---

## 🌍 Rutas base del backend

La API principal se organiza en:

- `/auth` → Autenticación.
- `/products` → Gestión de productos.
- `/email` → Envío de correos (`/email/send`).

---

## 🔐 Autenticación y seguridad (backend)

- El registro y login se realizan mediante **`/auth/register`** y **`/auth/login`**.
- `login` devuelve un **JWT** firmado con la variable `SECRET_KEY`.
- Las rutas protegidas usan el middleware `authMiddleware` y exigen el header:

```http
Authorization: Bearer <token>
```

Rutas protegidas:

- `POST /products`
- `PATCH /products/:id`
- `DELETE /products/:id`

---

## 📦 Endpoints principales de la API

### 1. Health Check

#### `GET /`

Devuelve el estado básico de la API.

**Response 200**

```json
{
  "status": true
}
```

---

### 2. Autenticación (`/auth`)

#### `POST /auth/register`

Registra un nuevo usuario administrador.

- **Body (JSON):**

```json
{
  "email": "admin@mimuri.com",
  "password": "unaContraseñaSegura123"
}
```

**Respuestas**

- `201 Created` → Usuario registrado con éxito.
- `400 Bad Request` → Datos inválidos o usuario ya existente.
- `500 Internal Server Error` → Error al registrar usuario.

---

#### `POST /auth/login`

Inicia sesión de un usuario registrado y devuelve un **token JWT**.

- **Body (JSON):**

```json
{
  "email": "admin@mimuri.com",
  "password": "unaContraseñaSegura123"
}
```

**Respuestas**

- `200 OK` →

```json
{
  "success": true,
  "message": "Usuario logueado con exito",
  "token": "<jwt_token>"
}
```

- `400 Bad Request` → Datos inválidos.
- `401 Unauthorized` → Usuario no encontrado o contraseña incorrecta.
- `400 Bad Request` → Faltan variables de entorno (`SECRET_KEY`).
- `500 Internal Server Error` → Error al iniciar sesión.

---

### 3. Productos (`/products`)

Modelo de producto (`ProductModel`):

```ts
{
  name: string;         // requerido
  description: string;  // por defecto "No tiene descripcion"
  stock: number;        // requerido, por defecto 0
  price: number;        // requerido, por defecto 0
  category: string;     // por defecto "No tiene categoria"
  image?: string;       // URL de imagen (Cloudinary)
}
```

Validación con **zod** (`productValidator.ts`):

- `name`: string, mínimo 4 caracteres.
- `description`: string, mínimo 10 caracteres.
- `stock`: número positivo.
- `price`: número positivo.
- `category`: string.
- `image`: string (opcional, se carga vía multer/Cloudinary).

---

#### `GET /products`

Obtiene todos los productos, con filtros por query params.

**Query params opcionales:**

- `name` → Filtra por nombre (búsqueda parcial, case-insensitive).
- `stock` → Filtra por stock exacto (número).
- `category` → Filtra por categoría (búsqueda parcial).
- `minPrice` → Precio mínimo.
- `maxPrice` → Precio máximo.

Ejemplos:

- `GET /products`
- `GET /products?name=cuna`
- `GET /products?category=estanteria&minPrice=20000&maxPrice=50000`

**Response 200**

```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "...",
      "description": "...",
      "stock": 10,
      "price": 12345,
      "category": "Categoría",
      "image": "https://..."
    }
  ]
}
```

**Errores**

- `500 Internal Server Error` → Error al cargar los productos.

---

#### `GET /products/:id`

Obtiene un producto por su ID de MongoDB.

**Parámetros de ruta:**

- `id` → ID de producto (ObjectId).

**Respuestas**

- `200 OK` → Producto encontrado.
- `400 Bad Request` → ID requerido o inválido.
- `404 Not Found` → Producto no encontrado.
- `500 Internal Server Error` → Error al buscar el producto.

---

#### `POST /products` (Protegido)

Crea un nuevo producto.  
Requiere autenticación **JWT** y se envía en **multipart/form-data**.

**Headers:**

```http
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Campos del body (form-data):**

- `name` (string, requerido, min 4)
- `description` (string, requerido, min 10)
- `stock` (number, requerido, > 0)
- `price` (number, requerido, > 0)
- `category` (string, requerido)
- `image` (file, opcional) → imagen del producto

**Respuestas**

- `201 Created` → Producto creado.
- `400 Bad Request` → Error de validación (zod) o datos inválidos.
- `401 Unauthorized` → Falta token o token inválido.
- `500 Internal Server Error` → Error al agregar el producto.

---

#### `PATCH /products/:id` (Protegido)

Actualiza un producto existente.

**Headers:**

```http
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Parámetros de ruta:**

- `id` → ID de producto (ObjectId).

**Campos del body (todos opcionales):**

- `name`
- `description`
- `stock`
- `price`
- `category`
- `image` (file)

**Respuestas**

- `200 OK` → Producto actualizado.
- `400 Bad Request` → ID inválido o errores de validación.
- `401 Unauthorized` → Falta token o token inválido.
- `404 Not Found` → Producto no encontrado.
- `500 Internal Server Error` → Error al actualizar el producto.

---

#### `DELETE /products/:id` (Protegido)

Elimina un producto por ID.

**Headers:**

```http
Authorization: Bearer <token>
```

**Parámetros de ruta:**

- `id` → ID de producto (ObjectId).

**Respuestas**

- `200 OK` → Producto eliminado.
- `400 Bad Request` → ID requerido o inválido.
- `401 Unauthorized` → Falta token o token inválido.
- `404 Not Found` → Producto no encontrado.
- `500 Internal Server Error` → Error al eliminar el producto.

---

### 4. Envío de emails (`/email`)

#### `POST /email/send`

Envía un correo al administrador utilizando **Resend** y la plantilla HTML definida en `emailTemplate.ts`.  
Se integra con el formulario de contacto del frontend.

**Body (JSON):**

```json
{
  "subject": "Consulta sobre un producto",
  "email": "usuario@ejemplo.com",
  "message": "Hola, quería consultar por el combo Sara."
}
```

**Respuestas**

- `200 OK` →

```json
{
  "success": true,
  "message": "Correo fue enviado exitosamente",
  "info": { "...": "Respuesta de Resend" }
}
```

- `400 Bad Request` → Faltan `subject`, `email` o `message`.
- `500 Internal Server Error` → Error al enviar el correo.

> 🔐 El destinatario del correo se toma de `process.env.EMAIL_USER`.

---

## 📝 Manejo de logs

- El middleware `logger` (basado en **morgan**) escribe un archivo diario en la carpeta `logs/` con el formato:
  - `logs/access-YYYY-MM-DD.log`
- También se usa `morgan("dev")` para mostrar logs de peticiones por consola en desarrollo.

---

## 🗂 Archivos estáticos (uploads)

En `index.ts` se sirve la carpeta `uploads/` como estática:

```ts
app.use("/uploads", express.static(uploadsPath))
```

Esto permite acceder a los archivos almacenados localmente mediante URLs del tipo:

```text
GET /uploads/<nombre_de_archivo>
```

> Nota: para imágenes de productos se utiliza principalmente Cloudinary, por lo que el campo `image` suele ser una URL de Cloudinary.

---
