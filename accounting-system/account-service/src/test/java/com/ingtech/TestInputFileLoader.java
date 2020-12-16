/*
 * Copyright (c) 2018 Primatics, Inc. All rights reserved.
 */
package com.ingtech;

import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

/**
 * This class is responsible to load sql file in DB in given DataSource.
 */
public class TestInputFileLoader {

    /**
     * It will execute the sql files in given order in database with given data source.
     * 
     * @param sqlFileNames
     *            the sql files path to execute
     * @param dataSource
     * @throws SQLException
     */
    public static void executeSQLs(List<String> sqlFileNames, DataSource dataSource) throws SQLException {

        try (Connection connection = dataSource.getConnection()) {
            for (String sqlFile : sqlFileNames) {
                ScriptUtils.executeSqlScript(connection, new ClassPathResource(sqlFile));
            }
        }
    }

}
