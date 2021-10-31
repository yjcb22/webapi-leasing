/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cengtel.ciclo3.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

/**
 *
 * @author yeison
 */

@Configuration
public class SeguridadWeb extends WebSecurityConfigurerAdapter{
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()               
                .antMatchers("/","/error", "/webjars/**", "/js/**", "/api/**").permitAll()
                .anyRequest().authenticated()
                .and().csrf().ignoringAntMatchers("/api/**", "/logout")
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                .and().oauth2Login().defaultSuccessUrl("/", true)
                .and().logout().logoutSuccessUrl("/").permitAll();
    }
}
