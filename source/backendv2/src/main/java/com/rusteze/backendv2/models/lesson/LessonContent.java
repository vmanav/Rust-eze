package com.rusteze.backendv2.models.lesson;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LessonContent {
    private String content;   // markdown
    private String baseCode;
    private List<LessonExample> examples;
}
