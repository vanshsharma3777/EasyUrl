package api

import (
	"fmt"
	"net/http"
)

func Test(w http.ResponseWriter, r *http.Request) {

	fmt.Println("/test working")

	fmt.Fprintln(w, "working")

}
