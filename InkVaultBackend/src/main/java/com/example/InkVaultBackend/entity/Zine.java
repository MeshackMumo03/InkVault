package com.example.InkVaultBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Zine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long zineId;

    @Column
    private String zineTitle;

    @Column
    private String zineAuthor;

    @Column
    private String coverImage;

    @Column
    private String aiHint;

    @Column
    private String zineDescription;

}
