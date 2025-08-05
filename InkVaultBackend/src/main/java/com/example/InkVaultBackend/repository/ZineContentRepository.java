package com.example.InkVaultBackend.repository;

import com.example.InkVaultBackend.entity.ZineContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZineContentRepository extends JpaRepository<ZineContent, Long> {
}
