# Android TCP/IP

## 1. Android

### 1.1 manifests

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.clientapp">
    <uses-permission android:name="android.permission.INTERNET"></uses-permission>


    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

### 1.2 activity_main

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity" >

    <EditText
        android:id="@+id/editText"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:ems="10"
        android:inputType="textPersonName"
        android:text="Name" />

    <EditText
        android:id="@+id/editText2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:ems="10"
        android:inputType="textPersonName"
        android:text="Name" />

    <Button
        android:id="@+id/button"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:onClick="ckbt"
        android:text="Button" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="match_parent"
        android:layout_height="270dp"
        android:background="#90DAF7"
        android:backgroundTint="#90DAF7"
        android:text="TextView" />

    <EditText
        android:id="@+id/editText3"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:ems="10"
        android:inputType="textPersonName"
        android:text="Name" />

    <EditText
        android:id="@+id/editText4"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:ems="10"
        android:inputType="textPersonName"
        android:text="Name" />

    <Button
        android:id="@+id/button2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:onClick="ckbt"
        android:text="Send" />

</LinearLayout>
```

### 1.3 MainActivity

```java
package com.example.chatclient2;

import androidx.appcompat.app.AppCompatActivity;

import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.net.Socket;

import tcpip2.Msg;

public class MainActivity extends AppCompatActivity {
    EditText editText,editText2,editText3,editText4;
    Button button,button2;
    TextView textView;

    Socket socket;
    Sender sender;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        makeUi();
    }

    private void makeUi(){
        editText =findViewById(R.id.editText);
        editText2 =findViewById(R.id.editText2);
        editText3 =findViewById(R.id.editText3);
        editText4 =findViewById(R.id.editText4);
        textView = findViewById(R.id.textView);

    }

    class ConnectThread extends Thread {

        String ip;
        int port;

        public ConnectThread() {

        }

        public ConnectThread(String ip, int port) {
            this.ip = ip;
            this.port = port;
        }

        @Override
        public void run() {
            try {

                socket = new Socket(ip, port);
                textView.setText("Connected \n" + textView.getText().toString());

            } catch (Exception e) {

                while (true) {
                    textView.setText(ip + " Retry \n" + textView.getText().toString());

                    try {

                        Thread.sleep(1000);

                        socket = new Socket(ip, port);

                        break;

                    } catch (Exception e1) {

                        e1.printStackTrace();

                    }
                }
            }
            try {
                sender = new Sender(socket);
                new ReceiverThread().onPreExecute();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }// end run

    }

    class Sender implements Runnable {

        OutputStream os;

        ObjectOutputStream oos;

        Msg msg;

        public Sender(Socket socket) throws IOException {

            os = socket.getOutputStream();

            oos = new ObjectOutputStream(os);

        }

        public void setMsg(Msg msg) {

            this.msg = msg;

        }

        @Override

        public void run() {

            if (oos != null) {

                try {
                    Log.d("===","id "+msg.getId());
                    oos.writeObject(msg);
                    Log.d("===","writeObject");
                } catch (IOException e) {

                    e.printStackTrace();

                }

            }

        }

    }

    class Receiver extends Thread {

        InputStream is;

        ObjectInputStream ois;

        public Receiver(Socket socket) throws IOException {

            is = socket.getInputStream();

            ois = new ObjectInputStream(is);

        }

        @Override

        public void run() {

            while (ois != null) {

                Msg msg = null;

                try {

                    msg = (Msg) ois.readObject();

                    textView.setText(msg.getId()+":"+msg.getMsg()+"\n"+ textView.getText().toString());
                    Log.d("-----",msg.getId()+" "+msg.getMsg() );
                } catch (Exception e) {

                    System.out.println("Server Die");

                    break;

                }

            }

            try {

                if (ois != null) {

                    ois.close();

                }

                if (socket != null) {

                    socket.close();

                }

            } catch (Exception e) {

                e.printStackTrace();

            }

        }

    }


    class ReceiverThread extends AsyncTask<Integer,Integer,String> {

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            try{
                new Receiver(socket).start();
            }catch (Exception e){

            }

        }

        @Override
        protected String doInBackground(Integer... integers) {
            return null;
        }
    }

    public void ckbt(View v){
        if (v.getId() == R.id.button){
            String ip = editText.getText().toString();
            int port = Integer.parseInt(editText2.getText().toString());
            ConnectThread r = new ConnectThread(ip,port);
            r.start();


        }else if(v.getId() == R.id.button2){
            Msg msg= null;
            String ip = editText3.getText().toString();
            String text = editText4.getText().toString();

            if(ip == null || ip.equals("")){
                msg = new Msg("id0101",text,null);
            }else{
                msg = new Msg("id0101",text,ip);
            }
            sender.setMsg(msg);
            new Thread(sender).start();
        }
    }
}



```

### 1.4 Msg

```java
package tcpip2;

import java.io.Serializable;

public class Msg implements Serializable {

   /**
    *
    */
   private static final long serialVersionUID = 1L;
    //다른 개체끼리 통신할떄( ex) Android,java ) 둘의 싱크를 맞춰주기위한 암호 설정
   String id;
   String msg;
   String ip;

   public Msg() {

   }

   public Msg(String id, String msg, String ip) {
      super();
      this.id = id;
      this.msg = msg;
      this.ip = ip;
   }

   public String getId() {
      return id;
   }

   public void setId(String id) {
      this.id = id;
   }

   public String getMsg() {
      return msg;
   }

   public void setMsg(String msg) {
      this.msg = msg;
   }

   public String getIp() {
      return ip;
   }

   public void setIp(String ip) {
      this.ip = ip;
   }



}
```

## 2. AWS에 등록하고 서버 돌리기



## 2.1 jar 생성

> 이클립스에서 패키지단위에서 우클릭>export하면 워크스페이스 안의 메인함수를 가지고 있는 모든 파일이 나오는데 그중 jar로 만들 java를 선택한다. 그 후  Runnable jar로 익스포트한다.

## 2.2 aws 에서 반영구적으로 jar 실행시키기

> 인스턴스 실행 후 다음과 같은 명령을 쳐준다

```
screan -R <세션 이름> //영구적으로 실행시킬 세션의 이름을 생성한다.

만약에 명령어를 못찾으면 (sudo) yum install screen

해당 명령을 실행하면 새 화면이 뜨는데 거기서 jar파일 경로로 들어가서 실행한다.

java -jar ㅇㅇㅇ.jar

그후 실행한 상태로 원래 스크린으로 돌아가려면 Ctrl+a +d를 누른다. 

실행 목록 보기는 screen -list

실행을 종료하고 싶으면

pkill screen


```

