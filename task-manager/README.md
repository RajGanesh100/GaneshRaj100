# Task Manager / To-Do App

A simple Java + Angular task manager application.

## Run the backend

1. Install Java 17 and Maven.
2. From `task-manager/backend`:

```bash
mvn spring-boot:run
```

The backend runs at `http://localhost:8080` and exposes:
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/{id}`
- `DELETE /api/tasks/{id}`

## Run the frontend

1. Install Node.js and npm.
2. From `task-manager/frontend`:

```bash
npm install
npm start
```

This uses `proxy.conf.json` to forward `/api` requests to the backend at `http://localhost:8080`.

The Angular app opens at `http://localhost:4200`.

## Notes

- The backend is configured with an in-memory H2 database.
- CORS is enabled for `http://localhost:4200`.
- The frontend calls the backend API directly from the browser.
