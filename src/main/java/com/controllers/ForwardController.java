package com.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ForwardController {
	@GetMapping(value = {"/...", "/profile", "/ratings","community","blog"})
    public String frontend() {
        return "forward:/";
    }

}
