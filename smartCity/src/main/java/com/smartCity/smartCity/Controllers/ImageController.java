package com.smartCity.smartCity.Controllers;

import com.mysql.jdbc.Blob;
import com.smartCity.smartCity.Entities.ImageModel;
import com.smartCity.smartCity.Entities.Parking;
import com.smartCity.smartCity.Repositories.ImageRepository;
import com.smartCity.smartCity.Repositories.ParkingRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


import java.io.IOException;


@RestController
@RequestMapping(value = "/api")
public class ImageController {

    private ImageRepository imageRepository;

    @Autowired
    public ImageController(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;

    }

    @PostMapping("/addImage")
    public void handleFileUpload(@RequestParam("file") MultipartFile file,
                                 @RequestParam("uploader") String uploader) throws IOException {


        ImageModel imageModel = new ImageModel(file.getOriginalFilename(), file.getContentType(), file.getBytes(), uploader);
        if (this.imageRepository.findByUploader(uploader) == null) {
            this.imageRepository.save(imageModel);
        } else {
            this.imageRepository.delete(this.imageRepository.findByUploader(uploader).getId());
            this.imageRepository.save(imageModel);
        }

    }

    @GetMapping("/getImage")
    public byte[] handleFileUpload(@RequestParam("uploader") String uploader) throws IOException {

        if (this.imageRepository.findByUploader(uploader) != null) {
            return this.imageRepository.findByUploader(uploader).getPic();
        }
        else return null;
    }

}
