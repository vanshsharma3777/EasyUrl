package helper

import (
	"github.com/skip2/go-qrcode"
)

func CreateQR(url string) ([]byte, bool) {
	png, err := qrcode.Encode(url, qrcode.Medium, 256)

	if err != nil {
		return nil, false
	}

	return png, true
}
