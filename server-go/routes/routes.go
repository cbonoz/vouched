package routes


import (

	"github.com/gin-gonic/gin"
)


// RegisterRoutes registers all routes
func RegisterRoutes(r *gin.Engine) {
	// Register user routes
	registerUserRoutes(r)
	
}

