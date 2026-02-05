package routes

import "github.com/gin-gonic/gin"

func MainPageRoute(c *gin.Context) {
	c.File("frontend/index.html")
}
