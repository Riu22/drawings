package com.drawing.servelt.model;

public class figura {
    String imageData;
    String author;
    String title;
    int id;

    public figura(String imageData, String author, String title, int id){
        this.imageData = imageData;
        this.author = author;
        this.title = title;
        this.id = id;
    }

    public String getImageData() {
        return imageData;
    }
    public void setImageData(String imageData) {
        this.imageData = imageData;
    }

    public String getAuthor(){
        return author;
    }

    public void setAuthor(String author){
        this.author = author;
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

}
