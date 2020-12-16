package com.ingtech;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.VendorExtension;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2).select().paths(PathSelectors.ant("/user/**")).build()
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        final Contact owner = new Contact("ingtech", "https://www.ingtech.com/", "saad.shahid@outlook.com");
        final List<VendorExtension> vendorExtensions = new ArrayList<>();

        return new ApiInfo("Account Service", "This api will be used for all clients to get login information", "1.0",
                "termsOfServiceUrl", owner, "license", "licenseUrl", vendorExtensions);
    }

}
