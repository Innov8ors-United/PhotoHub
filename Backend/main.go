package main

import (
	"net/http"
	"path/filepath"
	"runtime"
	"log"
	"github.com/go-chi/chi/v5"
)

func main() {

	_, currentFile, _, _ := runtime.Caller(0)
	projectRoot := filepath.Dir(filepath.Dir(currentFile))

	frontendDir := filepath.Join(projectRoot, "Frontend")

	router := chi.NewRouter();
	fsHandler := http.FileServer(http.Dir(frontendDir))

	router.Handle("/", fsHandler)
	router.Handle("/*", fsHandler)

	corsMux := middlewareCors(router)
	server := &http.Server {
		Addr: ":8080",
		Handler: corsMux,
	}

	log.Println("Server is getting started at port: 8080 ....")
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
	log.Println("Server is running at port: 8080 ....")

}
