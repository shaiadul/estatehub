package logger

import (
	"context"
	"log/slog"
	"os"
)

type ctxKey string

const (
	RequestIDKey ctxKey = "request_id"
	UserIDKey    ctxKey = "user_id"
)

var Log *slog.Logger

func Init(env string) {
	var handler slog.Handler
	opts := &slog.HandlerOptions{
		Level: slog.LevelDebug,
	}

	if env == "production" {
		opts.Level = slog.LevelInfo
		handler = slog.NewJSONHandler(os.Stdout, opts)
	} else {
		handler = slog.NewTextHandler(os.Stdout, opts)
	}

	Log = slog.New(handler)
	slog.SetDefault(Log)
}

func FromContext(ctx context.Context) *slog.Logger {
	l := Log
	if reqID, ok := ctx.Value(RequestIDKey).(string); ok && reqID != "" {
		l = l.With(string(RequestIDKey), reqID)
	}
	if userID, ok := ctx.Value(UserIDKey).(string); ok && userID != "" {
		l = l.With(string(UserIDKey), userID)
	}
	return l
}
