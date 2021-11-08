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
public class FincaServicioImpl implements FincaServicio {
    @Autowired
    private FincaDao fincaDao;

    @Override
    public List<FincaDto> listarFincas() {
        return (List<FincaDto>) fincaDao.findAll();
    }

    @Override
    public FincaDto guardarFinca(FincaDto finca) {
        return fincaDao.save(finca);
    }

    @Override
    public FincaDto actualizarFinca(FincaDto finca) {
        FincaDto fincaTmp = fincaDao.findById(finca.getId()).orElse(null);
        
        //Verificar si la categoria ya existe
        if(fincaTmp != null){
            //Agregar los nuevos valores
            System.out.println(finca.getExtension());
            if(finca.getName() != null){
                fincaTmp.setName(finca.getName());
            }
            if(finca.getAddress() != null){
                fincaTmp.setAddress(finca.getAddress());
            }
            if(finca.getExtension() != 0){
                fincaTmp.setExtension(finca.getExtension());
            }
            if(finca.getDescription() != null){
                fincaTmp.setDescription(finca.getDescription());
            }            
            if(finca.getCategory() != null){
                fincaTmp.setCategory(finca.getCategory());
            }
        }
        return fincaDao.save(fincaTmp);
    }

    @Override
    public boolean borrarFinca(FincaDto farm) {
        FincaDto finca = fincaDao.findById(farm.getId()).orElse(null);
        if (finca != null) {
            fincaDao.delete(finca);
            return true;
        } else{
            return false;
        }  
    }

    @Override
    public FincaDto encontrarFincaPorId(FincaDto finca) {
        return fincaDao.findById(finca.getId()).orElse(null);
    }
    
}
