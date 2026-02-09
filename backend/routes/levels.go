package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func LevelsRoute(c *gin.Context){
	fullPath := c.Query("path")
	if fullPath == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing fullPath"})
		return
	}

	c.File(fullPath)
}