package com.example.InkVaultBackend;

import com.example.InkVaultBackend.entity.Zine;
import com.example.InkVaultBackend.repository.ZineRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class InkVaultBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(InkVaultBackendApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(ZineRepository repository) {
		return args -> repository.save(new Zine(
                null,
                "Cars and Lovers",
                "Ridhwan Farhan",
                "https://static.wikia.nocookie.net/disney/images/1/10/Profile_-_Lightning_McQueen.png/revision/latest?cb=20221003093816",
                "Automotives",
                "An exploration on passion and cars"
        ));
	}

}
