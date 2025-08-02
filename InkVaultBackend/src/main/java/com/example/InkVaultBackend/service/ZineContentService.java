package com.example.InkVaultBackend.service;

import com.example.InkVaultBackend.entity.Zine;
import com.example.InkVaultBackend.entity.ZineContent;
import com.example.InkVaultBackend.repository.ZineContentRepository;
import com.example.InkVaultBackend.repository.ZineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ZineContentService {

    @Autowired
    private ZineContentRepository zineContentRepository;

    @Autowired
    private ZineRepository zineRepository;

    public List<ZineContent> getAllZineContent() {
        return zineContentRepository.findAll();
    }

    public List<ZineContent> getAllContentsByZineId(Long zineId) {
        return zineContentRepository.findAll().stream()
                .filter(zineContent -> zineContent.getZine().getZineId().equals(zineId))
                .toList();
    }

    public ZineContent createZineContent( Long zineId, ZineContent zineContents) {
        Zine zine = zineRepository.findById(zineId).orElseThrow(() -> new RuntimeException("Zine with id " + zineId + " not found"));
        zineContents.setZine(zine);
        return zineContentRepository.save(zineContents);
    }

    public void deleteZineContent(Long zineContentId) {
        zineContentRepository.deleteById(zineContentId);
    }
}
