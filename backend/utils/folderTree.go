package utils

import (
	"path/filepath"
	"io/fs"
)

type file struct {
	Name string
	Path string
}

type Folder struct {
	Name       string
	Subfolders []*Folder
	Files      []file
}

func BuildFolderTree(rootPath string) (*Folder, error) {
	rootPath = filepath.ToSlash(filepath.Clean(rootPath))

	root := &Folder{
		Name:       filepath.Base(rootPath),
		Subfolders: []*Folder{},
		Files:      []file{},
	}

	folders := map[string]*Folder{
		rootPath: root,
	}

	err := filepath.WalkDir(rootPath, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		path = filepath.ToSlash(path)
		if path == rootPath {
			return nil
		}

		parentPath := filepath.ToSlash(filepath.Dir(path))
		parent, ok := folders[parentPath]
		if !ok {
			return nil
		}

		if d.IsDir() {
			f := &Folder{
				Name:       d.Name(),
				Subfolders: []*Folder{},
				Files:      []file{},
			}

			parent.Subfolders = append(parent.Subfolders, f)
			folders[path] = f
		} else {
			parent.Files = append(parent.Files, file{
				Name: d.Name(),
				Path: path,
			})
		}

		return nil
	})

	return root, err
}