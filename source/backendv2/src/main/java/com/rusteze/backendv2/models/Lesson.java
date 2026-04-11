package com.rusteze.backendv2.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
    name = "lessons",
    uniqueConstraints = {
        @UniqueConstraint(name = "uq_lessons_slug", columnNames = "slug")
    }
)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Lesson {

    @Id
    @GeneratedValue (strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 120)
    private String slug; // e.g. "intro-hello-world"

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "order_index", nullable = false)
    private int orderIndex;

    /**
     * JSON payload that includes:
     * {
     *   "content": "...markdown...",
     *   "baseCode": "...",
     *   "examples": [{"title":"...", "code":"..."}]
     * }
     */
    @Lob
    @Column(name = "content", nullable = false)
    private String content; // store JSON string

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();
}
