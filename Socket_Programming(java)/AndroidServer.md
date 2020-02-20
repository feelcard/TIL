# Android Server

Main Activity

```java
package com.example.tabserver;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import java.io.*;
import java.net.*;
import java.net.Socket;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;
import java.util.ArrayList;
import java.util.*;
import java.net.ServerSocket;
import tcpip2.*;


public class MainActivity extends AppCompatActivity {
    ListView listView;
    TextView name1, name2, name3, name4,
             data1, data2, data3, data4;

    HashMap<String, ObjectOutputStream>
            maps = new HashMap<String, ObjectOutputStream>();
    HashMap<String, String>
            ids = new HashMap<String, String>();

    ArrayAdapter<String> adapter;

    ServerSocket serverSocket;
    boolean aflag = true;
    int port = 8888;

    Sender sender;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        makeUi();
        new serverReady().start();
    }

    class serverReady extends Thread{

        public serverReady(){
            try {
                serverSocket = new ServerSocket(port);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        @Override
        public void run() {
            while(aflag) {
                Socket socket = null;

                Log.d("-----","Server Ready..");
                try {
                    socket = serverSocket.accept();
                    new Receiver(socket).start();
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            setList();
                        }
                    });
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    public ArrayList<String> getIds() {
        Collection<String>
                id = ids.values();
        Iterator<String> it = id.iterator();
        ArrayList<String> list = new ArrayList<String>();
        while(it.hasNext()) {
            list.add(it.next());
        }
        return list;
    }
    public void sendIp() {
        Set<String>
                keys = maps.keySet();
        Iterator<String>
                its = keys.iterator();
        ArrayList<String> list = new ArrayList<String>();
        while(its.hasNext()) {
            list.add(its.next());
        }
    }

    public void setList(){
        adapter =
                new ArrayAdapter<String>(
                        MainActivity.this,
                        android.R.layout.simple_list_item_1,
                        getIds()
                );
        adapter.notifyDataSetChanged();
        listView.setAdapter(adapter);
    }

    class Receiver extends Thread{

        InputStream is;
        ObjectInputStream ois;

        OutputStream os;
        ObjectOutputStream oos;

        Socket socket;
        public Receiver(Socket socket) throws IOException {
            this.socket = socket;
            is = socket.getInputStream();
            ois = new ObjectInputStream(is);

            os = socket.getOutputStream();
            oos = new ObjectOutputStream(os);
            maps.put(socket.getInetAddress().toString(),
                    oos);
            try {
                Msg msg = (Msg) ois.readObject();
                final Msg finalmsg = msg;
                ids.put(socket.getInetAddress().toString(),
                        msg.getId());
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        while (true){

                            data1.setText(finalmsg.getTxt());
                            name1.setText(finalmsg.getTxt());
                        }


                    }
                });
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        }

        @Override
        public void run() {
            while(ois != null) {
                Msg msg = null;
                try {

                    msg = (Msg) ois.readObject();
                    System.out.println(
                            msg.getId()+":"+msg.getTxt());
                    if(msg.getTxt().equals("q")) {
                        System.out.println(
                                ids.get(socket.getInetAddress().toString())+":Exit ..");

                        maps.remove(
                                socket.getInetAddress().toString()
                        );

                        ids.remove(socket.getInetAddress().toString()
                        );
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                setList();
                            }
                        });
                        break;
                    }
                    sendMsg(msg);
                } catch (Exception e) {
                    maps.remove(
                            socket.getInetAddress().toString()
                    );

                    ids.remove(socket.getInetAddress().toString()
                    );
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            setList();
                        }
                    });
                    break;
                }
            } // end while
            try {
                if(ois != null) {
                    ois.close();
                }
                if(socket != null) {
                    socket.close();
                }
            }catch(Exception e) {
                e.printStackTrace();
            }
        }

    }

    class Sender extends Thread{
        Msg msg;
        public Sender(Msg msg) {
            this.msg = msg;
        }
        @Override
        public void run() {

            Collection<ObjectOutputStream>
                    cols = maps.values();
            Iterator<ObjectOutputStream>
                    its = cols.iterator();
            while(its.hasNext()) {
                try {
                    its.next().writeObject(msg);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    class Sender2 extends Thread{
        Msg msg;
        public Sender2(Msg msg) {
            this.msg = msg;
        }
        @Override
        public void run() {
            String tid = msg.getTid();
            try {
                Collection<String>
                        col = ids.keySet();
                Iterator<String> it = col.iterator();
                String sip = "";
                while(it.hasNext()) {
                    String key = it.next();
                    if(ids.get(key).equals(tid)) {
                        sip = key;
                    }
                }
                System.out.println(sip);
                maps.get(sip).writeObject(msg);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }


    public void sendMsg(Msg msg) {
        String tid = msg.getTid();

        if(tid == null || tid.equals("")) {
            Sender sender =
                    new Sender(msg);
            sender.start();
        }else {
            Sender2 sender2 =
                    new Sender2(msg);
            sender2.start();
        }

    } // end sendMsg




    private void makeUi() {
        listView = findViewById(R.id.listView);
        name1 = findViewById(R.id.name1);
        name2 = findViewById(R.id.name2);
        name3 = findViewById(R.id.name3);
        name4 = findViewById(R.id.name4);
        data1 = findViewById(R.id.data1);
        data2 = findViewById(R.id.data2);
        data3 = findViewById(R.id.data3);
        data4 = findViewById(R.id.data4);
    }

    public void ckbt(View v){
        Msg msg = null;
        if(v.getId() == R.id.button){
            msg = new Msg("server","1",null);
        }else if(v.getId() == R.id.button2){
            msg = new Msg("server","0",null);
        }
        sendMsg(msg);
    }
}

```







## manifest

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.tabserver">
    <uses-permission android:name="android.permission.INTERNET"/>
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



## layout

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity" >

    <ListView
        android:id="@+id/listView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_weight="2" />

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:background="#5A484C">

        <TextView
            android:id="@+id/data4"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="268dp"
            android:layout_marginTop="92dp"
            android:text="17"
            android:textColor="#F7F6F5"
            android:textSize="100sp"
            app:layout_constraintStart_toEndOf="@+id/data3"
            app:layout_constraintTop_toBottomOf="@+id/name4" />

        <TextView
            android:id="@+id/name1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="128dp"
            android:layout_marginTop="52dp"
            android:text="TextView"
            android:textColor="#FFEB3B"
            android:textSize="24sp"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <TextView
            android:id="@+id/name2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="284dp"
            android:layout_marginTop="52dp"
            android:text="TextView"
            android:textColor="#FFEB3B"
            android:textSize="24sp"
            app:layout_constraintStart_toEndOf="@+id/name1"
            app:layout_constraintTop_toTopOf="parent" />

        <TextView
            android:id="@+id/name3"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="140dp"
            android:layout_marginTop="280dp"
            android:text="TextView"
            android:textColor="#FFEB3B"
            android:textSize="24sp"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/name1" />

        <TextView
            android:id="@+id/name4"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="280dp"
            android:layout_marginTop="288dp"
            android:text="TextView"
            android:textColor="#FFEB3B"
            android:textSize="24sp"
            app:layout_constraintStart_toEndOf="@+id/name3"
            app:layout_constraintTop_toBottomOf="@+id/name2" />

        <TextView
            android:id="@+id/data1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="128dp"
            android:layout_marginTop="76dp"
            android:text="26"
            android:textColor="#F8F8F4"
            android:textSize="100sp"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/name1" />

        <TextView
            android:id="@+id/data2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="268dp"
            android:layout_marginTop="76dp"
            android:text="35"
            android:textColor="#F8F8F6"
            android:textSize="100sp"
            app:layout_constraintStart_toEndOf="@+id/data1"
            app:layout_constraintTop_toBottomOf="@+id/name2" />

        <TextView
            android:id="@+id/data3"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="128dp"
            android:layout_marginTop="92dp"
            android:text="17"
            android:textColor="#F7F6F5"
            android:textSize="100sp"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/name3" />
    </androidx.constraintlayout.widget.ConstraintLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_weight="2"
        android:background="#BD9AA4"
        android:orientation="vertical">

        <Button
            android:id="@+id/button"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:onClick="ckbt"
            android:text="START" />

        <Button
            android:id="@+id/button2"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:onClick="ckbt"
            android:text="STOP" />
    </LinearLayout>
</LinearLayout>
```

