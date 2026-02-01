package com.samuelsanpo.messages.config;

import com.samuelsanpo.messages.model.Message;
import com.samuelsanpo.messages.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final MessageRepository repository;

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            repository.save(new Message(null, "Global Side", "This is a  message to test the app.", null));
            repository.save(new Message(null, "Welcome to the app", "Welcome evaluators", null));
        }
    }
}
