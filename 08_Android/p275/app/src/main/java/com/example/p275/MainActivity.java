package com.example.p275;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import java.util.Date;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Log.d("---","onCreate");
    }

    protected void restoreState(){
        SharedPreferences sp = getSharedPreferences(
                "st", Activity.MODE_PRIVATE
        );
        if(sp != null && sp.contains("dt")){
            String result = sp.getString("dt","");
            Toast.makeText(this,
                    result, Toast.LENGTH_SHORT).show();
        }
    }
    protected void saveState(){
        SharedPreferences sp = getSharedPreferences(
                "st", Activity.MODE_PRIVATE
        );
        SharedPreferences.Editor editor = sp.edit();
        Date d = new Date();
        editor.putString("dt",d.toString());
        editor.commit();
    }
    protected void clearState(){

    }



    @Override
    protected void onStart() {
        super.onStart();
        Log.d("---","onStart");
        restoreState();
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d("---","onResume");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d("---","onPause");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d("---","onStop");
        saveState();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d("---","onDestroy");
    }
}
