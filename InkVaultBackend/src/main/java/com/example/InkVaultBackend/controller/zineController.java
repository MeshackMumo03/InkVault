package com.example.InkVaultBackend.controller;

import com.example.InkVaultBackend.entity.Zine;
import com.example.InkVaultBackend.service.ZineService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/zines")
@CrossOrigin(origins = "http://localhost:9002") //TODO: Maybe remove this??
@RequiredArgsConstructor
public class zineController {
    private final ZineService service;

    @GetMapping
    public List<Zine> getAllZines() {
        return service.getAllZines();
    }

    @PostMapping
    public Zine createZine(@RequestBody Zine zine) {
        return service.createZine(zine);
    }

    @DeleteMapping
    public void deleteZine(Long zineId) {
        service.deleteZine(zineId);
    }

}
