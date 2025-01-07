package routes

import (
	"net/http"
	"vouched-api/db"
	"vouched-api/middleware"
	"vouched-api/models"

	"github.com/gin-gonic/gin"
)

func registerProfileRoutes(r *gin.Engine) {
	user := r.Group("/api/")
	user.Use(middleware.RequireAuth())
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

func createProfile(c *gin.Context) {
	var profile models.Profile
	if err := c.ShouldBindJSON(&profile); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	profile.UserID = c.GetString("userID")
	// DB save logic here
	c.JSON(http.StatusCreated, profile)
}

func getProfile(c *gin.Context) {
	userID := c.GetString("userID")
	var profile models.Profile
	// DB fetch logic here
	c.JSON(http.StatusOK, profile)
}

func updateProfile(c *gin.Context) {
	var profile models.Profile
	if err := c.ShouldBindJSON(&profile); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	profile.UserID = c.GetString("userID")
	// DB update logic here
	c.JSON(http.StatusOK, profile)
}

func activateProfile(c *gin.Context) {
	userID := c.GetString("userID")

	db.DB.Model(&models.Profile{}).Where("user_id = ?", userID).Update("active", true)
	// DB activation logic here
	c.JSON(http.StatusOK, gin.H{"message": "Profile activated"})
}
