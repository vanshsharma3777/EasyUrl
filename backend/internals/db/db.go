package db

import (
	"database/sql"
	"embed"
	"fmt"
	"log/slog"
	"os"
	"time"

	"github.com/vanshsharma3777/EasyUrl/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var migrationFS embed.FS
var DB *gorm.DB

func Init(dsn string) {
	var err error
	var sqlDB *sql.DB

	//retry Loop (for neon cold starts)
	fmt.Println("Init fn in db working")
	for i := 0; i < 10; i++ {
		DB, err = gorm.Open(postgres.Open(dsn))
		if err == nil {
			sqlDB, err = DB.DB()
			if err == nil {
				err = sqlDB.Ping()
				if err == nil {
					slog.Info("connected to PostgreSQL", "attempt", i+1)
					break
				}
			}
		}

		slog.Warn("waiting for database to wake up...", "attempt", i+1, "error", err)
		time.Sleep(2 * time.Second)
	}

	if err != nil {
		slog.Error("failed to connect to database after retries", "error", err)
		os.Exit(1)
	}

	sqlDB.SetMaxOpenConns(25)
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetConnMaxLifetime(5 * time.Minute)

	runMigrations()
}

func runMigrations() {

	fmt.Println("Run migrations fn in db working")

	err := DB.AutoMigrate(
		&models.URL{},
	)

	if err != nil {
		slog.Error("failed to migrate database", "error", err)
		os.Exit(1)
	}

	slog.Info("database migrated successfully")
}
