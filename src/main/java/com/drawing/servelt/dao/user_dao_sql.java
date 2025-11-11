package com.drawing.servelt.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


public class user_dao_sql implements user_dao{
    static Connection con = null;

    static void connect(){
        try {
            if (con == null){
                con = DriverManager.getConnection(   "jdbc:mysql://mysql:3306/nombre_base_de_datos",
                        "root",
                        "root"
                );
            }
            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println(con);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public boolean checkLogin(String username, String password) {
        try{
        connect();
        PreparedStatement sql =  con.prepareStatement(
                "SELECT * FROM users WHERE username = ? AND password = ?"

        );
        sql.setString(1,username);
        sql.setString(2,password);
        ResultSet rs = sql.executeQuery();
        int filas = 0;
        while(rs.next()){
            filas++;
        }
        return filas == 1;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public void add_user(String username, String password, String name) {
        connect();
    }
    @Override
    public boolean user_exists(String username) {
        connect();
        return false;
    }
}
