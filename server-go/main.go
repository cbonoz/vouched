package main

import (
	"log"
	"os"
	"vouched-api/config"
	"vouched-api/routes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Printf("Error loading .env file: %v", err)
	}

	r := gin.Default()

	// Initialize Supabase client
	config.InitSupabase()

	// Register routes
	routes.RegisterRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}
