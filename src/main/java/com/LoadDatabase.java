package com;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.DAOs.IceCreamRepository;
import com.models.IceCream;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class LoadDatabase {
//
//	@Bean
//	CommandLineRunner initDatabase(IceCreamRepository repository) {
//		return args -> {
//			log.info("Preloading " + repository.save(new IceCream("Ben & Jerry's", "Phish Food")));
//			log.info("Preloading " + repository.save(new IceCream("Ben & Jerry's", "Salted Caramel Core")));
//			log.info("Preloading " + repository.save(new IceCream("Ben & Jerry's", "Chunky Monkey")));
//			log.info("Preloading " + repository.save(new IceCream("Ben & Jerry's", "New York Super Fudge Chunk")));
//			log.info("Preloading " + repository.save(new IceCream("Ben & Jerry's", "Chocolate Chip Cookie Dough")));
//			log.info("Preloading " + repository.save(new IceCream("Ben & Jerry's", "Everything But The...")));
//			log.info("Preloading " + repository.save(new IceCream("Ben & Jerry's", "Cherry Garcia")));
//			log.info("Preloading " + repository.save(new IceCream("Ben & Jerry's", "Coffee, Coffee BuzzBuzz Buzz!")));
//			log.info("Preloading " + repository.save(new IceCream("Ben & Jerry's", "half baked")));
//			log.info("Preloading " + repository.save(new IceCream("Ben & Jerry's", "Pistachio Pistachio")));
//			log.info("Preloading " + repository.save(new IceCream("Ben & Jerry's", "Coffee Toffee Bar Crunch")));
//			log.info("Preloading " + repository.save(new IceCream("Ben & Jerry's", "Peanut Butter Cup")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Caramel Cone")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Dulce De Leche")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Green Tea")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Vanilla")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Strawberry")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Coffee")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "White Chocolate Raspberry Truffle")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Java Chip")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Chocolate Chocolate Chip")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Chocolate Peanut Butter")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Rocky Road")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Vanilla Swiss Almond")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Butter Pecan")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Lemon")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Trio Crispy Layers White Chocolate & Caramel Sauce Vanilla & Caramel")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Trio Crispy Layers Belgian Chocolate White & Milk Chocolate")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Trio Crispy Layers Belgian Chocolate Vanilla & Blackberry")));
//			log.info("Preloading " + repository.save(new IceCream("H\u00E4agen-Dazs", "Trio Crispy Layers Belgian Chocolate Vanilla & Blackberry")));
//			log.info("Preloading " + repository.save(new IceCream("Edy's", "Slow Churned Butter Pecan")));
//			log.info("Preloading " + repository.save(new IceCream("Edy's", "Slow Churned Chocolate Chip")));
//			log.info("Preloading " + repository.save(new IceCream("Edy's", "Slow Churned Coffee")));
//			log.info("Preloading " + repository.save(new IceCream("Edy's", "Slow Churned Mint Chocolate Chip")));
//			log.info("Preloading " + repository.save(new IceCream("Edy's", "Slow Churned Double Fudge Brownie")));
//			log.info("Preloading " + repository.save(new IceCream("Edy's", "Slow Churned Cookie Dough")));
//			log.info("Preloading " + repository.save(new IceCream("Edy's", "Slow Churned French Silk")));
//			log.info("Preloading " + repository.save(new IceCream("Edy's", "Slow Churned Caramel Delight")));
//			log.info("Preloading " + repository.save(new IceCream("Edy's", "Slow Churned Chocolate")));
//			log.info("Preloading " + repository.save(new IceCream("Edy's", "Slow Churned Neapolitan")));
//			log.info("Preloading " + repository.save(new IceCream("Edy's", "Slow Churned Vanilla Bean")));
//			log.info("Preloading " + repository.save(new IceCream("Edy's", "Slow Churned Classic Vanilla")));
//			log.info("Preloading " + repository.save(new IceCream("Edy's", "Slow Churned French Vanilla")));
//			log.info("Preloading " + repository.save(new IceCream("Edy's", "Slow Churned Classic Vanilla")));
//			log.info("Preloading " + repository.save(new IceCream("Breyers", "French Vanilla")));
//			log.info("Preloading " + repository.save(new IceCream("Breyers", "Natural Vanilla")));
//			log.info("Preloading " + repository.save(new IceCream("Breyers", "Vanilla Chocolate")));
//			log.info("Preloading " + repository.save(new IceCream("Breyers", "Vanilla Chocolate Strawberry")));
//			log.info("Preloading " + repository.save(new IceCream("Breyers", "Chocolate Chip Cookie Dough")));
//			log.info("Preloading " + repository.save(new IceCream("Breyers", "Coffee")));
//			
//	};
//
//}
}
