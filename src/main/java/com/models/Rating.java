package com.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
@Entity
public class Rating {
	
	private @Id @GeneratedValue Long ratingId;
	private Long icecreamId;
	private Long userId;
	private String review;
	private int score;
	private String imageUrl;
	

}
