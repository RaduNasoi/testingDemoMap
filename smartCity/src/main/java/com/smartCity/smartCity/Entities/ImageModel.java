package com.smartCity.smartCity.Entities;



import javax.persistence.*;
import java.sql.Blob;
import java.util.Arrays;


@Entity
@Table(name="image_model")
public class ImageModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Lob
    @Column(name="pic")
    private byte[] pic;

    @Column(name = "uploader")
    private String uploader;

    public ImageModel(){}

    public ImageModel(String name, String type, byte[] pic, String uploader) {
        this.name = name;
        this.type = type;
        this.pic = pic;
        this.uploader = uploader;
    }

    public Long getId(){
        return this.id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getType(){
        return this.type;
    }

    public void setType(String type){
        this.type = type;
    }

    public byte[] getPic() {
        return pic;
    }

    public String getUploader() {
        return uploader;
    }

    public void setUploader(String uploader) {
        this.uploader = uploader;
    }

    public void setPic(byte[] pic) {
        this.pic = pic;
    }

    @Override
    public String toString() {
        return "ImageModel{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", pic=" + Arrays.toString(pic) +
                ", uploader='" + uploader + '\'' +
                '}';
    }
}