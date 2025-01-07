package setup



import (
	"vouched-api/constants"
)


func InitGorm() {

	// Migrate gorm models
	db := config.DB
	db.AutoMigrate(&models.User{})
}

