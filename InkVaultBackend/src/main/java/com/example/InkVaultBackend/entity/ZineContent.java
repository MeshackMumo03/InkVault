package com.example.InkVaultBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ZineContent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long zineContentId;

    @Column
    private String contentType; // This one checks if it's a paragraph or an image or a quote

    @Column(length = 5000)
    private String text; //This is for paragraph or a quote

    @Column(length = 2000)
    private String imageUrl;

    @Column(length = 1000)
    private String alt; //If the image url ain't available

    @Column(length = 1000)
    private String caption;

    @ManyToOne
    @JoinColumn
    private Zine zine;

}
