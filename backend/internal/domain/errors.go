package domain

import "errors"

var (
	ErrNotFound          = errors.New("requested resource not found")
	ErrAlreadyExists     = errors.New("resource already exists")
	ErrInvalidInput      = errors.New("invalid input parameters")
	ErrUnauthorized      = errors.New("unauthorized request")
	ErrForbidden         = errors.New("insufficient privileges for this action")
	ErrConflict          = errors.New("resource conflict")
	ErrInternalServer    = errors.New("internal server error")
	ErrKycRequired       = errors.New("accredited KYC verification required to access this resource")
	ErrInvalidCredentials = errors.New("invalid email or password")
)
