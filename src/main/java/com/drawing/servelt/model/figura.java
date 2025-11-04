package com.drawing.servelt.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class figura {
    String imageData;
    String author;
    String title;
    int id;
    int object_count;
    LocalDateTime creation_date;
    LocalDateTime modification_date;


    public figura(String imageData, String author, String title, int id, int object_count){
        this.imageData = imageData;
        this.author = author;
        this.title = title;
        this.id = id;
        this.object_count = object_count;
        this.modification_date = LocalDateTime.now();
        this.creation_date = LocalDateTime.now();

    }

    public int getObjectCount() {
        return object_count;
    }

    public void setObjectcount(int object_count) {
        this.object_count = object_count;
    }

    public LocalDateTime getCreationdate() {
        return creation_date;
    }

    public void setCreationdate(LocalDateTime creation_date) {
        this.creation_date = creation_date;
    }

    public LocalDateTime getModificationdate() {
        return modification_date;
    }
    public void setModificationdate(LocalDateTime modification_date) {
        this.modification_date = modification_date;
    }

    public String getImageData() {
        return imageData;
    }
    public void setImageData(String imageData) {
        this.imageData = imageData;
        this.modification_date = LocalDateTime.now();
    }

    public String getAuthor(){

        return author;
    }

    public void setAuthor(String author){
        this.author = author;
        this.modification_date = LocalDateTime.now();
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public String getFormattedCreationDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        return creation_date.format(formatter);
    }

    public String getFormattedModificationDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        return modification_date.format(formatter);
    }



}
