/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.model;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author yeison
 */
@Service
public class CategoriaServicioImpl implements CategoriaServicio{
    @Autowired
    private CategoriaDao categoryDao;

    @Override
    public List<CategoriaDto> listarCategorias() {
        return (List<CategoriaDto>) categoryDao.findAll();
    }

    @Override
    public CategoriaDto guardarCategoria(CategoriaDto category) {
        return categoryDao.save(category);
    }

    @Override
    public CategoriaDto actualizarCategoria(CategoriaDto category) {        
        CategoriaDto categoryTmp = categoryDao.findById(category.getId()).orElse(null);
        
        //Verificar si la categoria ya existe
        if(categoryTmp != null){
            //Agregar los nuevos valores
            if(category.getName() != null){
                categoryTmp.setName(category.getName());
            }
            if (category.getDescription() != null) {
                categoryTmp.setDescription(category.getDescription());
            }
        } 
        return categoryDao.save(categoryTmp);
    }

    @Override
    public boolean borrarCategoria(CategoriaDto category) {
        CategoriaDto categoria = categoryDao.findById(category.getId()).orElse(null);
        if (categoria != null) {
            categoryDao.delete(category);
            return true;
        } else{
            return false;
        }        
    }

    @Override
    public CategoriaDto encontrarCategoriaPorId(CategoriaDto category) {
        return categoryDao.findById(category.getId()).orElse(null);
    }
    
}
