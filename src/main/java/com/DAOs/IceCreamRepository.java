package com.DAOs;

import org.springframework.data.jpa.repository.JpaRepository;

import com.models.IceCream;

public interface IceCreamRepository extends JpaRepository<IceCream, Long> {

}
