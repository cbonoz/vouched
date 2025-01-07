package handlers

import (
	"net/http"

	"vouched-api/config"
	"vouched-api/models"

	"github.com/gin-gonic/gin"
)

func GetProfile(c *gin.Context) {
	handle := c.Param("handle")

	// Use gorm to get the profile response
	profileResponse := models.ProfileResponse{}

	


	c.JSON(http.StatusOK, user)
}

func UpdateProfile(c *gin.Context) {
	var updateData models.User
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, _ := c.Get("user")
	userId := user.(string)

	err := config.SupabaseClient.DB.From("users").
		Update(updateData).
		Eq("id", userId).
		Execute(nil)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, updateData)
}
