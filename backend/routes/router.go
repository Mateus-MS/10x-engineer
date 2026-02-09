package routes

import "github.com/gin-gonic/gin"

func InitRoutes(r *gin.Engine){
	r.GET("/", MainPageRoute)
	r.GET("/levels", LevelsRoute)
}