package com.drawing.servelt.model;

public class figura {
    String json;
    String author;
    String title;
    int id;

    public figura(String json, String author, String title, int id){
        this.json = json;
        this.author = author;
        this.title = title;
    }

    public String getJson() {
        return json;
    }
    public void setJson(String json) {
        this.json = json;
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
