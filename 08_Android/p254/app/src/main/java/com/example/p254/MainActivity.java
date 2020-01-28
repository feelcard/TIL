package com.example.p254;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.PermissionChecker;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        String [] permissions = {
                Manifest.permission.CALL_PHONE
        };
        ActivityCompat.requestPermissions(
                this,permissions,101
        );
    }
    public void ckbt(View v){
        Intent intent = null;
        if(v.getId() == R.id.button){
            intent = new Intent(Intent.ACTION_VIEW,
                    Uri.parse("tel:010-2233-2323"));
        }else if(v.getId() == R.id.button2){
            intent = new Intent(Intent.ACTION_VIEW,
                    Uri.parse("content://contacts/people"));
        }else if(v.getId() == R.id.button3){
            int check =
                    PermissionChecker.checkSelfPermission(
                            this,Manifest.permission.CALL_PHONE
                    );
            if(check == PackageManager.PERMISSION_GRANTED){
                intent = new Intent(Intent.ACTION_CALL,
                        Uri.parse("tel:010-2233-2323"));
            }else{
                return;
            }

        }else if(v.getId() == R.id.button4){
            intent = new Intent(getApplicationContext(),
                    SecondActivity.class);
            Bundle bundle = new Bundle();
            bundle.putInt("num1",100);
            bundle.putInt("num2",200);
            intent.putExtra("nums",bundle);
        }
        startActivity(intent);
    }
}
