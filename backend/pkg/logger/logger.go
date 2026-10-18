package logger

import (
	"context"
	"fmt"
	"io"
	"log/slog"
	"os"
	"strings"
	"sync"
)

type ctxKey string

const (
	RequestIDKey ctxKey = "request_id"
	UserIDKey    ctxKey = "user_id"
)

var Log *slog.Logger

type PrettyHandler struct {
	mu     sync.Mutex
	out    io.Writer
	opts   slog.HandlerOptions
	attrs  []slog.Attr
	groups []string
}

func NewPrettyHandler(out io.Writer, opts slog.HandlerOptions) *PrettyHandler {
	return &PrettyHandler{
		out:  out,
		opts: opts,
	}
}

func (h *PrettyHandler) Enabled(_ context.Context, level slog.Level) bool {
	minLevel := slog.LevelDebug
	if h.opts.Level != nil {
		minLevel = h.opts.Level.Level()
	}
	return level >= minLevel
}

func (h *PrettyHandler) Handle(_ context.Context, r slog.Record) error {
	var levelStr string
	switch {
	case r.Level >= slog.LevelError:
		levelStr = "\033[1;31m[ERROR]\033[0m"
	case r.Level >= slog.LevelWarn:
		levelStr = "\033[1;33m[WARN]\033[0m "
	case r.Level >= slog.LevelInfo:
		levelStr = "\033[1;32m[INFO]\033[0m "
	default:
		levelStr = "\033[1;35m[DEBUG]\033[0m"
	}

	timeStr := r.Time.Format("15:04:05")

	var sb strings.Builder
	fmt.Fprintf(&sb, "\033[90m%s\033[0m %s %s", timeStr, levelStr, r.Message)

	for _, a := range h.attrs {
		formatAttr(&sb, a)
	}

	r.Attrs(func(a slog.Attr) bool {
		formatAttr(&sb, a)
		return true
	})

	sb.WriteString("\n")

	h.mu.Lock()
	defer h.mu.Unlock()
	_, err := h.out.Write([]byte(sb.String()))
	return err
}

func formatAttr(sb *strings.Builder, a slog.Attr) {
	if a.Equal(slog.Attr{}) {
		return
	}
	fmt.Fprintf(sb, " \033[90m%s=\033[0m\033[36m%v\033[0m", a.Key, a.Value.Any())
}

func (h *PrettyHandler) WithAttrs(attrs []slog.Attr) slog.Handler {
	newAttrs := make([]slog.Attr, len(h.attrs)+len(attrs))
	copy(newAttrs, h.attrs)
	copy(newAttrs[len(h.attrs):], attrs)
	return &PrettyHandler{
		out:    h.out,
		opts:   h.opts,
		attrs:  newAttrs,
		groups: h.groups,
	}
}

func (h *PrettyHandler) WithGroup(name string) slog.Handler {
	return &PrettyHandler{
		out:    h.out,
		opts:   h.opts,
		attrs:  h.attrs,
		groups: append(append([]string{}, h.groups...), name),
	}
}

func Init(env string) {
	var handler slog.Handler
	if env == "production" {
		handler = slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
			Level: slog.LevelInfo,
		})
	} else {
		handler = NewPrettyHandler(os.Stdout, slog.HandlerOptions{
			Level: slog.LevelDebug,
		})
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
