package routes

import (
	"net/http"
	"vouched-api/db"

	"../middleware"
	"../models"
	"github.com/gin-gonic/gin"
)

// RegisterRoutes registers all routes
func registerUserRoutes(r *gin.Engine) {
    user := r.Group("/api/user")
    user.Use(middleware.AuthRequired())
    {
        // Profile routes
        user.POST("/profile", createProfile)
        user.GET("/profile", getProfile)
        user.PUT("/profile", updateProfile)
        user.POST("/profile/activate", activateProfile)

        // Dashboard
        user.GET("/dashboard", getDashboardData)
    }
}

func getDashboardData(c *gin.Context) {
    userID := c.GetString("userID")
    // Fetch profile, endorsements, etc.
    c.JSON(http.StatusOK, gin.H{
        "profile": models.Profile{},
        "endorsements": []models.Endorsement{},
    })
}
