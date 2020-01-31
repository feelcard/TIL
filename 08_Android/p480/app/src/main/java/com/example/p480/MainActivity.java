package com.example.p480;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    TextView textView,textView2,textView3;
    ImageView imageView,imageView2,imageView3;
    MyHandler myHandler;
    MyTask task;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        textView = findViewById(R.id.textView);
        textView2 = findViewById(R.id.textView2);
        textView3 = findViewById(R.id.textView3);
        imageView = findViewById(R.id.imageView);
        imageView2 = findViewById(R.id.imageView2);
        imageView3 = findViewById(R.id.imageView3);
        myHandler = new MyHandler();
    }

    Thread t= new Thread(){

        @Override
        public void run() {

           while (true) {
               try {
                   Thread.sleep(100);
               } catch (InterruptedException e) {
               }

               runOnUiThread(new Runnable() {
                   @Override
                   public void run() {
                       final int km = (int) Math.round(Math.random() * 150);
                       textView.setText(km+"km");
                       if(km>100){
                           imageView.setImageResource(R.drawable.up2);
                       }else{
                           imageView.setImageResource(R.drawable.down2);
                       }
                   }
               });

           }

        }
    };

    @Override
    protected void onStart() {
        super.onStart();
        Thread t2 = new Thread(r);
        t.start();
        t2.start();
        task = new MyTask();
        task.execute(1000);
    }

    class MyTask extends AsyncTask<Integer,Integer,String>{

        @Override
        protected void onPreExecute() {

        }

        @Override
        protected String doInBackground(Integer... integers) {
            int cnt = integers[0].intValue();
            int rpm = 0;
            while(true) {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                }
                rpm = (int)Math.round(Math.random() * 1000);
                publishProgress(rpm);
            }

        }

        @Override
        protected void onProgressUpdate(Integer... values) {
            int i = values[0].intValue();
            textView3.setText(i+"rpm");
            if(i>500){
                imageView3.setImageResource(R.drawable.up3);
            }else{
                imageView3.setImageResource(R.drawable.down3);
            }
        }

        @Override
        protected void onPostExecute(String s) {
            textView3.setText(s);
        }

        @Override
        protected void onCancelled() {


        }
    }


    class MyHandler extends Handler{
        @Override
        public void handleMessage(@NonNull Message msg) {
            Bundle bundle = msg.getData();
            int oc = bundle.getInt("oc");

            if(oc>15){
                imageView2.setImageResource(R.drawable.up2);
            }else{
                imageView2.setImageResource(R.drawable.down2);
            }

            textView2.setText(oc+"oc");

        }
    }

    Runnable r = new Runnable() {       //인터페이스 형태로 만든 스레드(둘중 뭘로하든 상관없음)
        @Override
        public void run() {                     //모든 스레드의 동작은 run 안에서 실행됨
            while (true) {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {

                }
                // ************************** 핸들러 방식************************************************
                // *****************서브스레드에서 계속 변하는 i값을 메인 스레드로 보내주는 방식임**************
                Message message = myHandler.obtainMessage(); // 핸들러에서 메시지를 끄집어내
                Bundle bundle = new Bundle();
                bundle.putInt("oc", (int) Math.round(Math.random() * 30));   //번들을 이렇게 보낼때는 키벨류("")를 함께 보내야 함
                message.setData(bundle);
                myHandler.sendMessage(message); //핸들러가 메시지를 보낸다. 어디로? 메인 액티비티로, 어떻게? 위에 클래스 만든 myHandler 안에 잇는 핸들메시지 메소드로.
            }

        }
    };



}


