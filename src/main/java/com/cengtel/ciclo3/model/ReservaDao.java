/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.model;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author yeison
 */
public interface ReservaDao extends CrudRepository<ReservaDto, Integer> {
    //custome queries
   
    public List<ReservaDto> findAllByStatus(String status);
    
    public List<ReservaDto> findAllByStartDateAfterAndStartDateBefore(Date start, Date end);
    
    //select id_client, count(*) as total from rentafincas.reservation where status="completed" group by id_client;
    @Query ("SELECT c.client, COUNT(c.client) from ReservaDto AS c group by c.client order by COUNT(c.client)DESC")
    public List<Object[]> countTotalReservationsByClient();
    
}
