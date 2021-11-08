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
public class ClienteServicioImpl implements ClienteServicio{
    @Autowired
    private ClienteDao clienteDao;

    @Override
    public List<ClienteDto> listarClientes() {
        return (List<ClienteDto>) clienteDao.findAll();
    }

    @Override
    public ClienteDto guardarCliente(ClienteDto cliente) {
        return clienteDao.save(cliente);
        
    }

    @Override
    public ClienteDto actualizarCliente(ClienteDto cliente) {
        ClienteDto clienteTmp = clienteDao.findById(cliente.getIdClient()).orElse(null);
        
        //Verificar si el cliente ya existe
        if(clienteTmp != null){
            //Agregar los nuevos valores
            if(cliente.getName() != null){
                clienteTmp.setName(cliente.getName());
            }
            if(cliente.getEmail() !=null){
                clienteTmp.setEmail(cliente.getEmail());
            }
            if(cliente.getPassword() !=null){
                clienteTmp.setPassword(cliente.getPassword());
            }
            if(cliente.getAge() != 0){
                clienteTmp.setAge(cliente.getAge());
            }
        }
        return clienteDao.save(clienteTmp);
    }

    @Override
    public boolean borrarCliente(ClienteDto client) {
         ClienteDto cliente = clienteDao.findById(client.getIdClient()).orElse(null);
        if (cliente != null) {
            clienteDao.delete(cliente);
            return true;
        } else{
            return false;
        } 
    }

    @Override
    public ClienteDto encontrarClientePorId(ClienteDto cliente) {
        return clienteDao.findById(cliente.getIdClient()).orElse(null);
    }
    
}
