# Monorepo: React Native App + Laravel API

Este repositorio contiene una aplicación móvil React Native (IndriverReactNative) y una API REST en Laravel (ApiRestLaravel) para un sistema de transporte compartido.

## Estructura del Proyecto

```
.
├── IndriverReactNative/     # App móvil React Native
│   ├── App.tsx
│   ├── assets/
│   ├── package.json
│   └── presentation/
└── ApiRestLaravel/          # API backend Laravel
    ├── app/
    ├── database/
    ├── routes/
    └── config/
```

## Requisitos

- **Node.js** >= 18
- **PHP** >= 8.1
- **Composer**
- **MySQL** (XAMPP recomendado)

## Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/diegobeteta24/reactnative.git
cd reactnative
```

### 2. Configurar la API Laravel

```bash
cd ApiRestLaravel

# Instalar dependencias
composer install

# Copiar configuración
cp .env.example .env

# Generar clave
php artisan key:generate

# Configurar base de datos en .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

# Crear base de datos y migrar
php artisan migrate

# Iniciar servidor
php artisan serve
```

### 3. Configurar la App React Native

```bash
cd ../IndriverReactNative

# Instalar dependencias
npm install

# Iniciar Expo
npx expo start
```

## API Endpoints

### Autenticación
- `POST /api/register` - Registro de usuario
- `POST /api/login` - Inicio de sesión
- `POST /api/logout` - Cerrar sesión (requiere token)
- `GET /api/user` - Obtener usuario actual (requiere token)

### Ejemplo de uso con cURL

```bash
# Registro
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "+1234567890",
    "role": "passenger"
  }'

# Login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

## Tecnologías

- **Frontend**: React Native + Expo
- **Backend**: Laravel 12 + MySQL
- **Autenticación**: Laravel Sanctum
- **Monorepo**: Git con estructura plana

## Desarrollo

- API: `http://localhost:8000`
- App: Expo Dev Client en dispositivo/emulador

## Contribución

1. Crea una rama para tu feature
2. Commit tus cambios
3. Push y crea un Pull Request