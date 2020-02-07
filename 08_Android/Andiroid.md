1. Google API 키젠

2. SHA 인증

3. Manifest 파일에 키 입력

4. Gradle. app 에 Map Library 추가 및 Sync

5. MainActivity.xml 에 fragment 강제 선언 및 추가

   ## Manifest xml

6. [MainActivity.java](http://mainactivity.java) 에서 fragment 불러오기

   

   ```xml
   <?xml version="1.0" encoding="utf-8"?> <manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.example.p669"> 
   
   <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
   
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="@여기에 구글 api 키 입력하세요"/>
   
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
   
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
   ```

   </manifest>

## MainActivity xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="<http://schemas.android.com/apk/res/android>"
    xmlns:app="<http://schemas.android.com/apk/res-auto>"
    xmlns:tools="<http://schemas.android.com/tools>"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity" >

  

    <fragment
        android:id="@+id/map"
        android:name="com.google.android.gms.maps.SupportMapFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        />
</LinearLayout>
```

## Gradle app

```gradle
apply plugin: 'com.android.application'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.3"
    defaultConfig {
        applicationId "com.example.p669"
        minSdkVersion 24
        targetSdkVersion 29
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    implementation 'com.google.android.gms:play-services-maps:17.0.0'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test:runner:1.2.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
}
```

## MainActivity java

```java
package com.example.p502;

import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {


    EditText editText, editText2;
    ProgressDialog progressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        editText = findViewById(R.id.editText);
        editText2 = findViewById(R.id.editText2);
        progressDialog = new ProgressDialog(this);

        if(SaveSharedPreference.getUserName(MainActivity.this).length() != 0) {
            Intent intent =
                    new Intent(getApplicationContext(),
                            SecondActivity.class);

            startActivity(intent);
	//로그인 페이지를 띄울때 세션에 로그인정보가 남아있으면 바로 리스트 페이지로 넘어간다.
        }
    }
    public void login (View v) {
        String id = editText.getText().toString();
        String pwd = editText2.getText().toString();
        HttpTask task = new HttpTask(id,pwd);
        task.execute();


    }
    class HttpTask extends AsyncTask<Void, Void, String> {

        String url ;

        public HttpTask(String id, String pwd){
            Log.d("----","HttpTask");
            url = "http://70.12.113.248/webview/login.jsp?";
            url += "id="+id+"&pwd="+pwd;
        }

        //thread와 동일 형식
        @Override //시작하기전
        protected void onPreExecute() {
            Log.d("----","onPreExecute");
            progressDialog.setTitle("HTTP Connection...");
            progressDialog.setTitle("Please Wait...");

            progressDialog.setCancelable(false);
            progressDialog.show();

        }

        @Override // 시작
        protected String doInBackground(Void... voids) {
            Log.d("----","onPreExecute");
            Log.d("----",url);
            return HttpHandler.getString(url);
            //이 로직이 우리가 만든 HttpHandler.java이다
            //이 로직이 있으면 doinbackgroud에서 가져다 쓸 수 있고, 재사용 가능하다.
        }

        @Override //끝날때
        protected void onPostExecute(String s) {
            progressDialog.dismiss();

            if(s.trim().equals("1")) {
                if(SaveSharedPreference.getUserName(MainActivity.this).length() == 0)
                    SaveSharedPreference.setUserName(MainActivity.this, editText.getText().toString());

                Intent intent =
                        new Intent(getApplicationContext(),
                                SecondActivity.class);

                startActivity(intent);

// 첫 로그인시 로그인에 성공하면 세션에 아이디와 비밀번호 정보를 저장하고 다음 로그인에 사용할 수 있도록 한다.
            }else {
                Toast.makeText(MainActivity.this,"틀렸습니다.", Toast.LENGTH_SHORT);
            }


        }


    }

}

```

## HttpHandler.java

```java
package com.example.p502;



import android.util.Log;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;

import java.net.URL;

public class HttpHandler {
    public static String getString(String urlstr) {
        //http 프로토콜을 구현하는 것이다.
        String result = null;
        URL url = null;
        HttpURLConnection hcon = null;
        InputStream is = null;
        try {
            url = new URL(urlstr);
            hcon = (HttpURLConnection) url.openConnection();
            hcon.setConnectTimeout(2000);
            hcon.setRequestMethod("GET"); //POST도 가능
            Log.d("---- HttpHandler",hcon.toString());
            is = new BufferedInputStream(hcon.getInputStream());
            // -> url객체 만들고, open하면 연결됨, 객체만들고 inputstream해서
            // 서버를 연결할 객체를 만듦?

            //여기 is(inputstream)에서 결과값을 꺼낸다.
            result = convertStr(is);

        } catch (Exception e) {
            e.printStackTrace();
        }


        return result;
    }


    public static String convertStr(InputStream is){
        String result = null;
        BufferedReader bi = null;
        StringBuilder sb = new StringBuilder();
        try{
            bi = new BufferedReader(
                    new InputStreamReader(is)
            );
            String temp = "";
            while((temp =bi.readLine()) != null){
                sb.append(temp);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return sb.toString();
    }
}

```







## SaveSharedPreference.java

자동로그인 기능이 담겨있는 Bean

```java
package com.example.p502;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

public class SaveSharedPreference {

    static final String PREF_USER_NAME = "id";

    static SharedPreferences getSharedPreferences(Context ctx) {
        return PreferenceManager.getDefaultSharedPreferences(ctx);
    }

    // 계정 정보 저장
    public static void setUserName(Context ctx, String userName) {
        SharedPreferences.Editor editor = getSharedPreferences(ctx).edit();
        editor.putString(PREF_USER_NAME, userName);
        editor.commit();
    }

    // 저장된 정보 가져오기
    public static String getUserName(Context ctx) {
        return getSharedPreferences(ctx).getString(PREF_USER_NAME, "");
    }

    // 로그아웃
    public static void clearUserName(Context ctx) {
        SharedPreferences.Editor editor = getSharedPreferences(ctx).edit();
        editor.clear();
        editor.commit();
    }
}
```



------

------

# 나의 위치도 같이 찍어보기

## Permission Manifest 에 추가

```
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```

## Permission [MainAcitivity.java](http://mainacitivity.java) 에서 확인

```
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textView = findViewById(R.id.textView);

        String[] permissons = {
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION
        };
        ActivityCompat.requestPermissions(this, permissons, 101);

... 중략


...
// permission 확인 ( 자동생성 )
// allow 가 아니면 return 해버린다. ( 즉 allow 하지 않으면 취소된다. ) 

if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                    return;
                }
```

------

------

# Second_Activity

```java
package com.example.p502;

import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.RatingBar;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.InputStream;

import java.io.Serializable;
import java.net.URL;
import java.util.ArrayList;

public class SecondActivity extends AppCompatActivity {
    ListView listView;
    LinearLayout container;
    ArrayList<Item> list;// Json으로 Item 객체를 저장할 ArrayList
    ItemAdapter itemAdapter;// 지도 Activity에 데이터를 보내기위한 Adepter선언
    ProgressDialog progressDialog;

    public static final int REQUEST_CODE_THIRD = 101;
    public static final String KEY_LOCATION = "loc";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);
        listView = findViewById(R.id.listView);
        container = findViewById(R.id.container);
        list = new ArrayList<>();
        progressDialog = new ProgressDialog(this);
        getData();
    }

    private void getData() {
        String url = "http://70.12.113.248/webview/cafe.jsp";//데이터를 가지고오기 위한 서버의 주소
        ItemAsync itemAsync = new ItemAsync(url);
        itemAsync.execute();
    }


    class ItemAsync extends AsyncTask<Void,Void,String>{
        String url;

        public ItemAsync(String url){
            this.url = url;
        }

        @Override
        protected void onPreExecute() {
            progressDialog.setTitle("HTTP Connect ..");
            progressDialog.setMessage("Please Wait..");
            progressDialog.setCancelable(false);
            progressDialog.show();
        }

        @Override
        protected String doInBackground(Void... voids) {
            String result = null;
            result = HttpHandler.getString(url);
            return result;
        }

        @Override
        protected void onPostExecute(String s) {
            Log.d("---",s.trim());

            progressDialog.dismiss();
            JSONArray ja = null;
            try {
                ja = new JSONArray(s);
                for(int i=0;i<ja.length();i++){
                    JSONObject jo = ja.getJSONObject(i);
                    String name = jo.getString("name");
                    String description = jo.getString("description");
                    String img = jo.getString("image");
                    int  star = jo.getInt("star");
                    double leti  = jo.getDouble("leti");
                    double longti  = jo.getDouble("longti");
                    Item item = new Item(name,img,star,description,leti,longti);
                    list.add(item);
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }
            itemAdapter = new ItemAdapter(list);
            listView.setAdapter(itemAdapter);

            listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
//                    Intent intent =
//                            new Intent(getApplicationContext(),
//                                    ThirdActivity.class);

                    Intent intent =
                            new Intent(getApplicationContext(),
                                    MapsActivity.class);
                    intent.putExtra("loc", (Serializable) list.get(position));

                    startActivity(intent);
                }
            });



        }
    }




    class ItemAdapter extends BaseAdapter{
        ArrayList<Item> alist;

        public ItemAdapter(ArrayList<Item> alist){
            this.alist = alist;
        }

        @Override
        public int getCount() {
            return alist.size();
        }

        @Override
        public Object getItem(int position) {
            return alist.get(position);
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            View itemView = null;
            LayoutInflater inflater = (LayoutInflater)
                    getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            itemView = inflater.inflate(R.layout.list_layout,container,true);
            TextView description = itemView.findViewById(R.id.textView2);
            TextView name = itemView.findViewById(R.id.textView);
            RatingBar ratingBar = itemView.findViewById(R.id.ratingBar);
            final ImageView imageView = itemView.findViewById(R.id.imageView);


            name.setText(alist.get(position).getName());
            description.setText(alist.get(position).getDescription());
            ratingBar.setRating(alist.get(position).getStar());
            String img = alist.get(position).getImage();

            img = "http://70.12.113.248/webview/img/"+img;
            final String finalImg = img;
            Thread t = new Thread(new Runnable() {
                @Override
                public void run() {
                    URL url = null;
                    InputStream is = null;
                    try{
                        url = new URL(finalImg);
                        is = url.openStream();
                        final Bitmap bm = BitmapFactory.decodeStream(is);
                        //바이트로 들어온 정보를 한번에 번들화 해서 이미지로 출력해주는 함수
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                imageView.setImageBitmap(bm);
                            }
                        });


                    }
                    catch (Exception e){

                    }
                }
            });
            t.start();

            return itemView;
        }
    }

}

```



## item.java

```java
package com.example.p502;

import java.io.Serializable;

public class Item implements Serializable{//데이터를 전송하기위해 Serializable을 해줘야 한다.
    String name;
    String image;
    int star;
    String description;
    double leti;
    double longti;

    public Item(){
        super();
    }

    public Item(String name, String image, int star, String description, double leti, double longti) {
        this.name = name;
        this.image = image;
        this.star = star;
        this.description = description;
        this.leti = leti;
        this.longti = longti;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getStar() {
        return star;
    }

    public void setStar(int star) {
        this.star = star;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getLeti() {
        return leti;
    }

    public void setLeti(double leti) {
        this.leti = leti;
    }

    public double getLongti() {
        return longti;
    }

    public void setLongti(double longti) {
        this.longti = longti;
    }
}

```



# Map APIs



```java
package com.example.p502;

import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.fragment.app.FragmentActivity;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

import java.util.ArrayList;
import java.util.Random;

import static android.app.PendingIntent.getActivity;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    Intent intent;
    Item item;
    LocationManager locationManager;
    Thread t;
    ArrayList<Marker> array_marker = new ArrayList<>();
    int i = 10;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        intent = getIntent();
        item = (Item) intent.getSerializableExtra("loc");
        String[] permitions =
                {
                        Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.ACCESS_COARSE_LOCATION
                };
        ActivityCompat.requestPermissions(this, permitions, 101);
        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        MyLocation myLocation = new MyLocation();
        long minTime = 1000;
        float minDistance = 0;
        if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) !=
                PackageManager.PERMISSION_GRANTED && checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        locationManager.requestLocationUpdates(
                LocationManager.NETWORK_PROVIDER,
                minTime,
                minDistance,
                myLocation
        );





    }

    private com.example.p502.Location startLocationService() {
        Log.d("---", "startLocationService");
        try {
            Location location = null;
            if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED && checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                location = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                //GPS는 avd 용 network는 핸드폰 용
                Log.d("---", "checkSelfPermission");
                double lat = location.getLatitude();
                double lon = location.getLongitude();
                Log.d("---", lat + "," + lon);
                com.example.p502.Location myloc = new com.example.p502.Location(lat, lon);
                return myloc;

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    class MyLocation implements LocationListener {


        @Override
        public void onLocationChanged(Location location) {
            double lat = location.getLatitude();
            double lon = location.getLongitude();

        }

        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {

        }

        @Override
        public void onProviderEnabled(String provider) {

        }

        @Override
        public void onProviderDisabled(String provider) {

        }
    }

    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */



    @Override
    public void onMapReady(final GoogleMap googleMap) {

        mMap = googleMap;

        LatLng mc = new LatLng(item.getLeti(), item.getLongti());
//        coupon = mMap.addMarker(new MarkerOptions().position(
//                new LatLng(item.getLeti()+new Random().nextDouble(),item.getLongti()+new Random().nextDouble())).title("coupon"));
        mMap.addMarker(new MarkerOptions().position(mc).title(item.getName()));
        Log.d("----test","mc Marker & coupon");

        final Handler handler = new Handler();
        mMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener() {
            @Override
            public boolean onMarkerClick(Marker marker) {

                Thread t = new Thread(new Runnable() {
                    public void run() {
                        while (i > 0) {
                            final Random random = new Random();
                            final float ran = ((float) (random.nextInt()*0.000000000003));
                            final float rsn = ((float) (random.nextInt()*0.000000000002));
                            runOnUiThread(new Runnable() {
                                public void run() {
                                    LatLng latLng = new LatLng(item.getLeti()+rsn, item.getLongti()+ran);
                                    array_marker.add(mMap.addMarker(new MarkerOptions().position(latLng).title("coupon")));
                                    for(int i = 0; i < array_marker.size()-1; i++)
                                    {
                                        Marker tmp =  array_marker.get(i);
                                        tmp.setVisible(false);
                                    }
                                    mMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener() {
                                        @Override
                                        public boolean onMarkerClick(Marker marker) {
                                            Toast.makeText(getApplicationContext(), "쿠폰 획득!!!",Toast.LENGTH_SHORT).show();
                                            for(int i = 0; i < array_marker.size(); i++)
                                            {
                                                Marker tmp =  array_marker.get(i);
                                                tmp.remove();
                                            }
                                            array_marker.clear();
                                            i = 0;
                                            return false;
                                        }
                                    });
                                }
                            });
                            try {
                                Thread.sleep(500);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                            i--;
                        }
                    }
                });
                t.start();


                return false;
            }
        });
        Log.d("----test",mc.toString()+" mc value");
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(mc, 14));

        mMap.setMyLocationEnabled(true);
    }
}

```





## (자동완성을 사용하지않은)ThirdActivity

```java
package com.example.p502;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

public class ThirdActivity extends AppCompatActivity {
    Item item;
    GoogleMap mMap;
    SupportMapFragment supportMapFragment;
    Intent intent;
    Marker coupon;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_third);
        supportMapFragment = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);

        intent = getIntent();
        item = (Item) intent.getSerializableExtra("loc");

        supportMapFragment.getMapAsync(new OnMapReadyCallback() {
            @Override
            public void onMapReady(GoogleMap googleMap) {
                mMap = googleMap;

                LatLng mc = new LatLng(item.getLeti(), item.getLongti());
                coupon = mMap.addMarker(new MarkerOptions().position(mc).title("coupon"));
                mMap.addMarker(new MarkerOptions().position(mc).title(item.getName()));
                Log.d("----test","mc Marker & coupon");


                mMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener() {
                    @Override
                    public boolean onMarkerClick(Marker marker) {
                        Thread t = new Thread(new Runnable() {

                            public void run() {
                                int i = 20;
                                while (i > 0) {
                                    final int ran = (int)(Math.random()*10) + 1;
                                    runOnUiThread(new Runnable() {
                                        public void run() {
                                            LatLng latLng = new LatLng(item.getLeti(), item.getLongti()+ran); //최초 시작했을 때 지도의 위치
                                            mMap.addMarker(new MarkerOptions().position(latLng).title("coupon"));
                                        }
                                    });
                                    try {
                                        Thread.sleep(500);
                                    } catch (InterruptedException e) {
                                        e.printStackTrace();
                                    }
                                    i--;
                                }
                            }
                        });
                        t.start();

                        return false;
                    }
                });
                Log.d("----test",mc.toString()+" mc value");
                mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(mc, 14));

                mMap.setMyLocationEnabled(true);

            }


        });


    }


}

```





