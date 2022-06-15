package com.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import lombok.Data;

@Data
@Entity
public class IceCream {
	
	private @Id @GeneratedValue Long icecreamId;
	private String brand;
	private String flavor;
	private Double avgRating;
	
	@OneToMany
	@JoinColumn(name="icecreamId", referencedColumnName="icecreamId" )
	private List<Rating> ratings;
	
	public IceCream() {}
	
	public IceCream(String brand, String flavor) {
		this.brand = brand;
		this.flavor = flavor;
	}
	
	public IceCream(String brand, String flavor, Double rating) {
		this.brand = brand;
		this.flavor = flavor;
		this.avgRating = rating;
	}


}
