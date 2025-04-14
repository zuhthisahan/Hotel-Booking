package com.sahan.Hotel.Management.Exception;

import java.sql.SQLException;

public class PhotoRetrievedException extends RuntimeException {
    public PhotoRetrievedException(SQLException e) {
    }
}
