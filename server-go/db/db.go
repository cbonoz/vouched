package db

import (
	"vouched-api/constants"
	"vouched-api/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() *gorm.DB {

	dsn := constants.DATABASE_URL
	DB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	DB.AutoMigrate(
		&models.User{},
		&models.Profile{},
		&models.Endorsement{},
	)
	return DB
}
