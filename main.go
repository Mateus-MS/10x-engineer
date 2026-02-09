package main

import (
	routes "github.com/Mateus-MS/10x-engineer/backend/routes"
	"github.com/gin-gonic/gin"
)

func main(){
	r := gin.Default()
	routes.InitRoutes(r)

	r.Static("/frontend", "./frontend")

	r.Run("0.0.0.0:8080")
}