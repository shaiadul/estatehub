package handler

import (
	"net/http"

	apphttp "github.com/estatehub/backend/internal/handler/http"
	"github.com/estatehub/backend/internal/domain"
	"github.com/estatehub/backend/pkg/jwt"
	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"gorm.io/gorm"
)

type RouterParams struct {
	AllowedOrigins  []string
	TokenManager    *jwt.TokenManager
	DB              *gorm.DB
	AuthHandler     *apphttp.AuthHandler
	PropertyHandler *apphttp.PropertyHandler
	TourHandler     *apphttp.TourHandler
	OfferHandler    *apphttp.OfferHandler
	VdrHandler      *apphttp.VdrHandler
	ClosingHandler  *apphttp.ClosingHandler
	AdminHandler    *apphttp.AdminHandler
	StorageHandler  *apphttp.StorageHandler
}

func NewRouter(p RouterParams) *chi.Mux {
	r := chi.NewRouter()

	// Global Middleware
	r.Use(chimiddleware.RequestID)
	r.Use(chimiddleware.RealIP)
	r.Use(chimiddleware.Logger)
	r.Use(chimiddleware.Recoverer)

	// CORS Setup
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   p.AllowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "X-Request-ID"},
		ExposedHeaders:   []string{"Link", "X-Total-Count"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Health Checks
	r.Get("/healthz", func(w http.ResponseWriter, r *http.Request) {
		apphttp.JSON(w, http.StatusOK, map[string]string{
			"status": "healthy",
			"system": "EstateHub Sovereign Real Estate Engine",
		})
	})

	r.Get("/readyz", func(w http.ResponseWriter, r *http.Request) {
		sqlDB, err := p.DB.DB()
		if err != nil || sqlDB.Ping() != nil {
			apphttp.Error(w, http.StatusServiceUnavailable, "DB_DOWN", "Database ping failed")
			return
		}
		apphttp.JSON(w, http.StatusOK, map[string]string{"status": "ready"})
	})

	// API v1 Routing Tree
	r.Route("/api/v1", func(v1 chi.Router) {
		// Public Auth
		v1.Route("/auth", func(a chi.Router) {
			a.Post("/register", p.AuthHandler.Register)
			a.Post("/login", p.AuthHandler.Login)
			a.Post("/refresh", p.AuthHandler.Refresh)
			a.Post("/oauth/google", p.AuthHandler.GoogleOAuth)

			// Protected Profile
			a.Group(func(pr chi.Router) {
				pr.Use(apphttp.AuthMiddleware(p.TokenManager))
				pr.Get("/me", p.AuthHandler.Me)
			})
		})

		// Properties
		v1.Route("/properties", func(pr chi.Router) {
			pr.Get("/", p.PropertyHandler.List)
			pr.Get("/{slug}", p.PropertyHandler.GetBySlug)
			pr.Get("/id/{id}", p.PropertyHandler.GetByID)

			// Authenticated Property Operations
			pr.Group(func(authPr chi.Router) {
				authPr.Use(apphttp.AuthMiddleware(p.TokenManager))

				// Bookmarks
				authPr.Get("/saved", p.PropertyHandler.ListSaved)
				authPr.Post("/{id}/bookmark", p.PropertyHandler.ToggleBookmark)

				// Sellers, Brokers, and Admins can create/manage listings
				authPr.Group(func(sellerPr chi.Router) {
					sellerPr.Use(apphttp.RequireRole(domain.RoleSeller, domain.RoleBroker, domain.RoleAdmin))
					sellerPr.Post("/", p.PropertyHandler.Create)
					sellerPr.Put("/{id}", p.PropertyHandler.Update)
					sellerPr.Delete("/{id}", p.PropertyHandler.Delete)
				})
			})
		})

		// Private Tours
		v1.Route("/tours", func(tr chi.Router) {
			tr.Use(apphttp.AuthMiddleware(p.TokenManager))
			tr.Get("/", p.TourHandler.List)
			tr.Post("/", p.TourHandler.BookTour)
			tr.Put("/{id}/status", p.TourHandler.UpdateStatus)
		})

		// Offers & Institutional LOI
		v1.Route("/offers", func(o chi.Router) {
			o.Use(apphttp.AuthMiddleware(p.TokenManager))
			o.Get("/", p.OfferHandler.List)
			o.Post("/", p.OfferHandler.Submit)
			o.Post("/{id}/counter", p.OfferHandler.Counter)
			o.Post("/{id}/accept", p.OfferHandler.Accept)
			o.Post("/{id}/reject", p.OfferHandler.Reject)
		})

		// Virtual Data Room (VDR)
		v1.Route("/vdr", func(vd chi.Router) {
			vd.Use(apphttp.AuthMiddleware(p.TokenManager))
			vd.Get("/properties/{property_id}/documents", p.VdrHandler.ListDocuments)
			vd.Post("/documents/{id}/download", p.VdrHandler.Download)
		})

		// Bilateral Closing Desk
		v1.Route("/closing", func(cl chi.Router) {
			cl.Use(apphttp.AuthMiddleware(p.TokenManager))
			cl.Get("/", p.ClosingHandler.List)
			cl.Get("/{id}", p.ClosingHandler.Get)
			cl.Post("/{id}/disburse", p.ClosingHandler.DisburseWire)
		})

		// S3 Presigned Media Storage
		v1.Route("/storage", func(st chi.Router) {
			st.Use(apphttp.AuthMiddleware(p.TokenManager))
			st.Post("/presign-upload", p.StorageHandler.PresignUpload)
			st.Get("/presign-download", p.StorageHandler.PresignDownload)
		})

		// Admin Master Governance (Restricted to RoleAdmin)
		v1.Route("/admin", func(ad chi.Router) {
			ad.Use(apphttp.AuthMiddleware(p.TokenManager))
			ad.Use(apphttp.RequireRole(domain.RoleAdmin))

			ad.Get("/overview", p.AdminHandler.Overview)
			ad.Get("/users", p.AdminHandler.ListUsers)
			ad.Put("/users/{id}/kyc", p.AdminHandler.UpdateKYC)
			ad.Put("/properties/{id}/moderate", p.AdminHandler.ModerateProperty)
			ad.Get("/audit", p.AdminHandler.AuditLogs)
		})
	})

	return r
}
