package db

import (
	"context"
	"fmt"
	"os"

	"github.com/redis/go-redis/v9"
)

var RedisClient *redis.Client

func ConnectRedis() error {
	redisURL := os.Getenv("REDIS_URL")

	options, err := redis.ParseURL(redisURL)
	if err != nil {
		return fmt.Errorf("invalid redis URL: %w", err)
	}

	RedisClient = redis.NewClient(options)

	if err := RedisClient.Ping(context.Background()).Err(); err != nil {
		return fmt.Errorf("redis connection failed: %w", err)
	}
	fmt.Println("Redis instance running")
	return nil
}
