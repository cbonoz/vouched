package routes

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "../middleware"
    "../models"
)

func registerEndorsementRoutes(r *gin.Engine) {
    endorsements := r.Group("/api/endorsements")
    endorsements.Use(middleware.AuthRequired())
    {
        endorsements.POST("", createEndorsement)
        endorsements.GET("", getEndorsements)
        endorsements.PUT("/:id", updateEndorsement)
        endorsements.DELETE("/:id", deleteEndorsement)
        endorsements.PUT("/:id/approve", approveEndorsement)
    }
}

func createEndorsement(c *gin.Context) {
    var endorsement models.Endorsement
    if err := c.ShouldBindJSON(&endorsement); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    endorsement.EndorserUserID = c.GetString("userID")
    // DB save logic here
    c.JSON(http.StatusCreated, endorsement)
}


func getEndorsements(c *gin.Context) {
    userID := c.GetString("userID")
    var endorsements []models.Endorsement
    // DB fetch logic here
    c.JSON(http.StatusOK, endorsements)
}

func updateEndorsement(c *gin.Context) {
    id := c.Param("id")
    userID := c.GetString("userID")
    var endorsement models.Endorsement
    // Verify ownership and update
    c.JSON(http.StatusOK, endorsement)
}

func deleteEndorsement(c *gin.Context) {
    id := c.Param("id")
    userID := c.GetString("userID")
    // Verify ownership and delete
    c.JSON(http.StatusOK, gin.H{"message": "Endorsement deleted"})
}

func approveEndorsement(c *gin.Context) {
    id := c.Param("id")
    userID := c.GetString("userID")
    // Verify ownership and approve
    c.JSON(http.StatusOK, gin.H{"message": "Endorsement approved"})
}
