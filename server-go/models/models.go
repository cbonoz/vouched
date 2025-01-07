package models

import (
	"time"
)

type User struct {
	ID          string     `json:"id" gorm:"primarykey"`
	Email       string     `json:"email" gorm:"uniqueIndex"`
	FirstName   string     `json:"firstName"`
	LastName    string     `json:"lastName"`
	ActivatedAt *time.Time `json:"activatedAt"`
	CreatedAt   time.Time  `json:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt"`
	DeletedAt   *time.Time `json:"deletedAt" gorm:"index"`
}

type Profile struct {
	ID           string        `json:"id" gorm:"primarykey"`
	UserID       string        `json:"userId" gorm:"uniqueIndex"`
	Handle       string        `json:"handle" gorm:"uniqueIndex"`
	ImageURL     string        `json:"imageUrl"`
	Title        string        `json:"title"`
	Bio          string        `json:"bio"`
	ActivatedAt  *time.Time    `json:"activatedAt"`
	CreatedAt    time.Time     `json:"createdAt"`
	UpdatedAt    time.Time     `json:"updatedAt"`
	DeletedAt    *time.Time    `json:"deletedAt" gorm:"index"`
	User         User          `json:"-" gorm:"foreignKey:UserID"`
	Endorsements []Endorsement `json:"endorsements" gorm:"foreignKey:UserID"`
}

type Endorsement struct {
	ID             string     `json:"id" gorm:"primarykey"`
	Message        string     `json:"message"`
	Name           string     `json:"name"`
	CreatedAt      time.Time  `json:"createdAt"`
	UpdatedAt      time.Time  `json:"updatedAt"`
	DeletedAt      *time.Time `json:"deletedAt" gorm:"index"`
	ApprovedAt     *time.Time `json:"approvedAt"`
	EndorserUserID string     `json:"endorserId"`
	Endorser       User       `json:"endorser" gorm:"foreignKey:EndorserUserID"`
}

// ProfileResponse is used for API responses
type ProfileResponse struct {
	Profile Profile `json:"profile"`
	User    struct {
		ID        string `json:"id"`
		FirstName string `json:"firstName"`
		LastName  string `json:"lastName"`
	} `json:"user"`
	Endorsements []Endorsement `json:"endorsements"`
}
