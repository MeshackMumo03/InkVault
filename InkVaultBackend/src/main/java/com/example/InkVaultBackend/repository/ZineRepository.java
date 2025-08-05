package com.example.InkVaultBackend.repository;

import com.example.InkVaultBackend.entity.Zine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZineRepository extends JpaRepository<Zine, Long> {

}
