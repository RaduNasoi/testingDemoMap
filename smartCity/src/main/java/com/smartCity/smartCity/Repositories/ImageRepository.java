package com.smartCity.smartCity.Repositories;


import com.smartCity.smartCity.Entities.ImageModel;
import org.springframework.data.repository.CrudRepository;

public interface ImageRepository extends CrudRepository<ImageModel, Long> {

    ImageModel findByName(String name);
    ImageModel findByUploader(String uploaderName);
}