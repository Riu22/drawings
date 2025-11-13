package com.drawing.servelt.dao;

import java.sql.*;


public class user_dao_sql implements user_dao{
    static Connection con = null;

    static void connect(){
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            if (con == null){
                con = DriverManager.getConnection("jdbc:mysql://mysql:3306/drawing_app",
                        "admin",
                        "admin"
                );
            }
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
        try {
            PreparedStatement sql = con.prepareStatement("INSERT INTO users (username, password, name) VALUES(?,?,?)");
            sql.setString(1,username);
            sql.setString(2,password);
            sql.setString(3,name);
            sql.executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
        @Override
    public boolean user_exists(String username) {
        connect();
        return false;
    }
}
