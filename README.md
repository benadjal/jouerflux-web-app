# JouerFlux Web App

Frontend Angular application for managing **Firewalls**, **Policies**, and **Rules**.  
This project consumes the [JouerFlux Mini API backend](https://github.com/0x726974636879/jouerflux-mini) and provides a responsive UI built with **Angular**, **PrimeNG**, **PrimeFlex**, and **RxJS**.

---

## Features

**Firewall, policy and rule Management**
  - View paginated list of each entity  
  - Create a new entity through a dialog form  
  - View detailed information about a specific firewall  
  - Delete an existing entity with confirmation  
  - Client-side search and filtering (across all pages)  
  - Local pagination and reactive data updates using RxJS streams  
  - Responsive design
  - Notification after each actions (create, delete, error and cancel)


**Developer Experience**
  - ESLint + Prettier integration for linting and formatting  
  - Modular Angular architecture with clear folder structure  
  - Reactive data handling with RxJS 

---

## 🚀 Setup Instructions

### Run the backend

Clone and start the backend API first

### Run this project

```bash
git clone https://github.com/benadjal/jouerflux-web-app.git

cd jouerflux-web-app

npm install

npm run start
```

Access the application at 

```yaml
http://localhost:4200/
```

## Tech Stack
- Angular 20
- PrimeNG 20 + PrimeFlex 4
- RxJS
- TypeScript
- ESLint + Prettier

## Design Choices

- PrimeNG + PrimeFlex for a nice and responsive UI .
- Modular architecture : Each feature (firewall, policies, rules) is isolated under src/app/features/ with its own components, models, and services.
- Shared services : shared-service.ts handles refresh triggers (e.g., reload lists after CRUD actions) to get updated data
- ESLint + Prettier :Used to enforce consistent code style and linting across the project.
- Implemented client-side filtering and pagination using RxJS operators after fetching all required data from the API.
