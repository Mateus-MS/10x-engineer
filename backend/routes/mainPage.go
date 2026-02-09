package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
	utils "github.com/Mateus-MS/10x-engineer/backend/utils"
	frontend "github.com/Mateus-MS/10x-engineer/frontend"
)

func MainPageRoute(c *gin.Context) {
	fileTree, err := utils.BuildFolderTree("frontend/levels")
	if err != nil {
		c.String(500, err.Error())
		return
	}

	err = frontend.Index(fileTree).Render(c.Request.Context(), c.Writer)
	if err != nil {
		c.String(http.StatusInternalServerError, "render error: %v", err)
	}
}