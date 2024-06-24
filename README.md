# Requeriments
- Docker
  
# Build Project
Go to `forum-laravel` folder and rename `.env.example` as `.env`
`docker compose build`

# Run Project
`RUN_MIGRATIONS=true RUN_DB_SEED=true docker compose up`

## Without Running Migrations and Seed 
`docker compose up`

# Visualize
- Front End Run on `http://localhost:80`
- Back End run on `http://api.localhost:8080`
