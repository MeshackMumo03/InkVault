package com.example.InkVaultBackend.service;

import com.example.InkVaultBackend.entity.Zine;
import com.example.InkVaultBackend.repository.ZineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ZineService {
    private final ZineRepository repository;

    public List<Zine> getAllZines() {
        return repository.findAll();
    }

    public Zine createZine(Zine zine) {
        return repository.save(zine);
    }

    public void deleteZine(Long zineId) {
        repository.deleteById(zineId);
    }

    public List<Zine> saveAll(List<Zine> zines) {
        return repository.saveAll(zines);
    }
}
