package com.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DAOs.IceCreamRepository;
import com.DAOs.RatingRepository;
import com.DAOs.UserRepository;
import com.models.IceCream;
import com.models.Rating;

@RestController
@RequestMapping("/api")
public class RatingController {

	private final RatingRepository ratRepository;
	private final IceCreamRepository icRepository;
	
	RatingController(RatingRepository repository, IceCreamRepository icRepository) {
		this.ratRepository = repository;
		this.icRepository = icRepository;
	}

	@PostMapping("/addrating")
	Rating addRating(@RequestBody Rating newRating) {
		System.out.println(newRating);

		List<Rating> currList = ratRepository.findByicecreamId(newRating.getIcecreamId());
		System.out.println(currList);
		int sum = 0;
		for(Rating i : currList) {
			sum += i.getScore();
		}
		Double avgRating = (sum + newRating.getScore()) / (currList.size() + 1.0);
		icRepository.findById(newRating.getIcecreamId()).map(icecream -> {
			icecream.setAvgRating(avgRating);
			return icRepository.save(icecream);
		});

		return ratRepository.save(newRating);
	}

}
