package com.example.InkVaultBackend.controller;

import com.example.InkVaultBackend.entity.Zine;
import com.example.InkVaultBackend.service.ZineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/zines")
@CrossOrigin(origins = "http://localhost:9002")
@RequiredArgsConstructor
public class ZineController {
    private final ZineService service;
    private final ZineService zineService;

    @GetMapping
    public List<Zine> getAllZines() {
        return service.getAllZines();
    }

    @PostMapping
    public Zine createZine(@RequestBody Zine zine) {
        return service.createZine(zine);
    }

    @PostMapping("/upload-multiple-zines")
    public ResponseEntity<List<Zine>> saveAllZines(@RequestBody List<Zine> zines) {
        List<Zine> savedZines = zineService.saveAll(zines);
        return ResponseEntity.ok(savedZines);
    }

    @DeleteMapping("/{zineId}")
    public void deleteZineById(@PathVariable Long zineId) {
        zineService.deleteZine(zineId);
    }

}
