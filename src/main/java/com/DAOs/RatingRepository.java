package com.DAOs;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.models.Rating;
import com.models.Users;

public interface RatingRepository extends JpaRepository<Rating, Long> {
	
	List<Rating> findByicecreamId(Long icreamId);

}
