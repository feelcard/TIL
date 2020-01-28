package com.example.p254;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import org.w3c.dom.Text;

public class SecondActivity extends AppCompatActivity {
    TextView textView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);
        textView = findViewById(R.id.textView);
        Intent intent = getIntent();
        Bundle bundle =
                intent.getBundleExtra("nums");
        int num1 = bundle.getInt("num1",0);
        int num2 = bundle.getInt("num2",0);
        textView.setText((num1+num2)+"");
    }
}



