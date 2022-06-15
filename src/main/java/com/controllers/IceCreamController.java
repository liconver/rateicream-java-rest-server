package com.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DAOs.IceCreamRepository;
import com.models.IceCream;

@RestController
@RequestMapping("/api")
public class IceCreamController {
	
	private final IceCreamRepository repository;

	  IceCreamController(IceCreamRepository repository) {
	    this.repository = repository;
	  }
	  
	  @GetMapping("/geticecream")
	  List<IceCream> all() {
	    return repository.findAll();
	  }

}
