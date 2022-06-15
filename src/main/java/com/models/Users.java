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
public class Users {
	
	private @Id @GeneratedValue Long userId;
	private String socialId;
	
	@OneToMany
	@JoinColumn(name="userId", referencedColumnName="userId" )
	private List<Rating> ratings;

}
