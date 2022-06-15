package com.DAOs;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.models.Users;


public interface UserRepository extends JpaRepository<Users, Long> {
	
	Optional<Users>  findBySocialId(String socialId);

}
