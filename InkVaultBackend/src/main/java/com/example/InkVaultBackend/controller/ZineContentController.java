package com.example.InkVaultBackend.controller;

import com.example.InkVaultBackend.entity.ZineContent;
import com.example.InkVaultBackend.service.ZineContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/zines/{zineId}/zine-contents")
@CrossOrigin(origins = "http://localhost:9002")
public class ZineContentController {

    @Autowired
    private ZineContentService zineContentService;

    @GetMapping
    public List<ZineContent>getZineContents(@PathVariable Long zineId) {
        return zineContentService.getAllContentsByZineId(zineId);
    }

    @PostMapping
    public ZineContent createZine(@PathVariable Long zineId, @RequestBody ZineContent zineContent) {
        return zineContentService.createZineContent(zineId, zineContent);
    }

    @DeleteMapping("/{contentId}")
    public void deleteZine(@PathVariable Long contentId) {
        zineContentService.deleteZineContent(contentId);
    }
}
