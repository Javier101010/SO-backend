# Servicio-tiendaVirtual

API REST para la tienda virtual de artesanías. Gestiona artesanos, categorías, productos, usuarios, direcciones, carrito, pedidos y pagos sobre una base de datos MySQL.

## Tecnologías

| Herramienta | Versión |
|---|---|
| Node.js | 24.21.0 |
| pnpm | 12.8.1 |
| TypeScript | 7 |
| Express | 5 |
| MySQL | 8 (driver `mysql2`) |

Node 24 ejecuta TypeScript directamente (_type stripping_), por eso no se usa `ts-node`, `tsx` ni `nodemon`. `tsc` solo se usa para verificar los tipos y compilar para producción.

## Requisitos

- [Volta](https://volta.sh) (recomendado): fija automáticamente la versión de Node del proyecto.
  Si no usas Volta, instala Node `24.21.0` (ver `.node-version`).
- pnpm `12.8.1`.
- Un servidor MySQL 8.

> **No uses `npm`** para instalar dependencias. El proyecto usa pnpm con políticas de seguridad contra ataques a la cadena de suministro (ver [Seguridad](#seguridad)).

## Instalación

```bash
git clone git@github.com:Javier101010/SO-backend.git
cd SO-backend

# Con Volta
volta install node@24.21.0 pnpm@12.8.1

pnpm install
```

## Configuración

Copia el archivo de ejemplo y completa las credenciales de MySQL:

```bash
cp .env.example .env
```

| Variable | Descripción | Por defecto |
|---|---|---|
| `PORT` | Puerto HTTP | `3000` |
| `NODE_ENV` | `development` o `production` | `development` |
| `DB_HOST` | Host de MySQL | `localhost` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `DB_USER` | Usuario de MySQL (**obligatorio**) | — |
| `DB_PASSWORD` | Contraseña de MySQL | _(vacía)_ |
| `DB_NAME` | Nombre de la base de datos | `tienda_artesanal` |
| `DB_CONNECTION_LIMIT` | Conexiones máximas del pool | `10` |

## Base de datos

El script `qallarinan_db` crea la base `tienda_artesanal`, sus tablas y datos de ejemplo:

```bash
mysql -u <usuario> -p < qallarinan_db
```

Tablas: `roles`, `artesanos`, `categorias`, `usuarios`, `productos`, `direcciones`, `carrito`, `pedidos`, `pagos`, `detalle_pedidos`.

## Scripts

| Comando | Descripción |
|---|---|
| `pnpm dev` | Modo desarrollo; se reinicia al guardar cambios |
| `pnpm typecheck` | Verifica los tipos sin compilar |
| `pnpm build` | Compila a `dist/` |
| `pnpm start` | Ejecuta la versión compilada (`dist/server.js`) |

El servidor verifica la conexión a MySQL al iniciar y se detiene si no puede conectarse.

## Estructura

```
src/
├── config/         # Variables de entorno y pool de MySQL
├── models/         # Clases de cada tabla (fila de BD <-> objeto) y enums
├── repositories/   # Acceso a datos (CRUD con SQL parametrizado)
├── services/       # Lógica de negocio; usan los repositorios
├── dtos/           # Esquemas de validación de entrada (y sus tipos)
├── controllers/    # Manejan la petición HTTP y llaman a los servicios
├── routes/         # Definición de rutas
├── middlewares/    # 404 y manejo centralizado de errores
├── utils/          # Validación, errores HTTP, hash de contraseñas
├── app.ts          # Configuración de Express
└── server.ts       # Punto de entrada
```

Flujo de una petición:

```
routes → controllers → services → repositories → MySQL
```

## API

Base: `http://localhost:3000/api`

| Recurso | Ruta | Filtros (query) |
|---|---|---|
| Salud | `GET /health` | — |
| Roles | `/roles` | — |
| Artesanos | `/artesanos` | `comunidad` |
| Categorías | `/categorias` | — |
| Usuarios | `/usuarios` | `idRol` |
| Productos | `/productos` | `idCategoria`, `idArtesano` |
| Direcciones | `/direcciones` | `idUsuario` |
| Carrito | `/carrito` | `idUsuario` |
| Pedidos | `/pedidos` | `idUsuario`, `estado` |
| Detalle de pedido | `/pedidos/:idPedido/detalles` | — |
| Pagos | `/pagos` | `idPedido`, `estadoPago` |

Cada recurso expone:

| Método | Ruta | Respuesta |
|---|---|---|
| `GET` | `/` | Lista (admite `?limit=` de 1 a 100, por defecto 50, y `?offset=`) |
| `GET` | `/:id` | Un registro |
| `POST` | `/` | `201` con el registro creado |
| `PATCH` | `/:id` | Actualización parcial |
| `DELETE` | `/:id` | `204` sin contenido |

En los detalles de pedido, `:id` es el `idProducto`.

Los cuerpos JSON usan **camelCase** (`idCategoria`, `precioUnitario`, ...).

### Ejemplos

```bash
# Listar productos de la categoría 4
curl "http://localhost:3000/api/productos?idCategoria=4"

# Crear un producto
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"idCategoria":1,"idArtesano":2,"nombre":"Poncho","sku":"TXT-003","precio":210.50,"stock":5}'

# Crear un usuario (la contraseña se guarda como hash)
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"idRol":3,"email":"cliente@mail.com","password":"secreta123","nombreCompleto":"Cliente Nuevo"}'

# Agregar un producto a un pedido
curl -X POST http://localhost:3000/api/pedidos/5/detalles \
  -H "Content-Type: application/json" \
  -d '{"idProducto":1,"cantidad":2,"precioUnitario":85}'
```

### Errores

Todas las respuestas de error tienen la forma `{ "message": "...", "detalles"?: [...] }`.

| Código | Cuándo |
|---|---|
| `400` | Datos inválidos, JSON mal formado o referencia a un registro inexistente |
| `404` | Recurso o ruta no encontrada |
| `409` | Valor único duplicado (email, SKU, ...) o registro en uso por otros |
| `500` | Error interno (sin detalles en producción) |

## Seguridad

- **Dependencias**: `pnpm-workspace.yaml` aplica políticas contra paquetes maliciosos:
  - `minimumReleaseAge`: no instala versiones publicadas hace menos de 24 h.
  - `strictDepBuilds` / `onlyBuiltDependencies`: bloquea los scripts `postinstall` no aprobados.
  - `blockExoticSubdeps`: impide subdependencias desde git o tarballs.
  - `trustPolicy: no-downgrade`: rechaza versiones con menor evidencia de procedencia.
- **SQL**: todas las consultas son parametrizadas.
- **Contraseñas**: se guardan con `scrypt` (`node:crypto`); `password_hash` nunca se devuelve en la API.
- **Secretos**: `.env` está en `.gitignore`; solo se versiona `.env.example`.
