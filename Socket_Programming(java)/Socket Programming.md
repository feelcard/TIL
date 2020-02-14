# Socket Programming 



## Client

1. 클라이언트의 기능



```java
package tcpip2;

import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.util.Scanner;

public class Client {

	Socket socket;
	Sender sender;
	
	public Client() {}
	public Client(String address,int port) throws IOException {
		try {
			socket = new Socket(address, port);
		
		}catch(Exception e) {
			while(true) {
				System.out.println("Retry..");
				try {
					Thread.sleep(1000);
					socket = new Socket(address, port);
					
					break;
				} catch (Exception e1) {
					e1.printStackTrace();
				}
			}
		}
		
		System.out.println("Connected Server:"+address);
		
		sender = new Sender(socket);
		new Receiver(socket).start();
	}
	
	class Sender implements Runnable{

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
			if(oos != null) {
				try {
					oos.writeObject(msg);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
	}
	
	
class Receiver extends Thread{
		
		InputStream is;
		ObjectInputStream ois;
		
		
		Socket socket;
		public Receiver(Socket socket) throws IOException {
			this.socket = socket;
			is = socket.getInputStream();
			ois = new ObjectInputStream(is);
			
		
		}

		@Override
		public void run() {
			while(ois != null) {
				Msg msg = null;
				try {
					msg = (Msg) ois.readObject();
					System.out.println(
						msg.getId()+":"+msg.getMsg());
					if(msg.getMsg().equals("q")) {
						System.out.println(
								msg.getId()+":Exit ..");
					
						break;
					}
				} catch (Exception e) {
					System.out.println("Server Closed..");
					
  				    break;
				}	
			}
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
	
	
	
	public void startClient() {
		Scanner sc = new Scanner(System.in);
		while(true) {
			System.out.println("Input Msg");
			String txt = sc.nextLine();
			Msg msg = null;
			if(txt.equals("w")) {
				System.out.print("귓속말 할 ip를 입력해주세요: ");
				String nickname = sc.nextLine();
				System.out.print("메세지를 입력해주세요: ");
				txt = sc.nextLine();
				msg = new Msg("User1",txt,nickname); 
			}
			else {
				msg = new Msg("User1",txt); 
			}
		
			sender.setMsg(msg);
			new Thread(sender).start();
			if(txt.equals("q")) {
				try {
					Thread.sleep(500);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				break;
			}
		}
		try {
			socket.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("End Client.");
		sc.close();
	}
	
	
	public static void main(String[] args) {
		Client client = null;
		try {
			client = new Client("70.12.113.202", 8888);
		} catch (IOException e) {
			e.printStackTrace();
		}
		client.startClient();
	}

}


```

## Server

```java
package tcpip2;

import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Scanner;

public class Server {

	HashMap<String, ObjectOutputStream>
	maps = new HashMap<>();
	
	ServerSocket serverSocket;
	boolean aflag = true;
	
	public Server() {}
	public Server(int port) throws IOException {
		serverSocket = new ServerSocket(port);
		System.out.println("Start Server");
		Runnable r = new Runnable() {
			@Override
			public void run() {
				while(aflag) {
					Socket socket = null;
					try {
						System.out.println("Server Ready..");
						socket = 
								serverSocket.accept();
						new Receiver(socket).start();
						System.out.println(socket.getInetAddress().toString());
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		};
		new Thread(r).start();
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
			System.out.println("접속자 수:"+maps.size());
		}

		@Override
		public void run() {
			while(ois != null) {
				Msg msg = null;
				try {
					msg = (Msg) ois.readObject();
					System.out.println(
						msg.getId()+":"+msg.getMsg());
					if(msg.getwUser() == null) {
						new Sender(msg).start();
					}else {
						new Whisper(msg,socket).start();
					}
					
					
					
					if(msg.getMsg().equals("q")) {
						System.out.println(
								msg.getId()+":Exit ..");
						maps.remove(
								socket.getInetAddress().toString()
								);
						System.out.println("접속자 수:"+maps.size());
						break;
					}
				} catch (Exception e) {
					maps.remove(
							socket.getInetAddress().toString()
							);
					System.out.println(
							socket.getInetAddress()+":Exit ..");
					System.out.println("접속자 수:"+maps.size());
  				    break;
				}	
			}
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
					System.out.println("--");

				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
	}
	
	class Whisper extends Thread{
		Msg msg;
		Socket socket;
		public Whisper(Msg msg,Socket socket) {
			this.msg = msg;
			this.socket = socket;
		}
		@Override
		public void run() {
			
			try {
				maps.get(msg.getwUser()).writeObject(msg);
			} catch (IOException e) {
				e.printStackTrace();
			}catch (NullPointerException e) {
				try {
					System.out.println(socket.getInetAddress().toString());
					maps.get(socket.getInetAddress().toString()
							).writeObject(
							new Msg("Admin","대상이 없습니다.",
									socket.getInetAddress().toString())
							);
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		}
		
	}
	
	public void sendMsg(Msg msg) {
		Sender sender = 
				new Sender(msg);
		sender.start();
	}
	
	public void serverStart() {
		Scanner sc = new Scanner(System.in);
		while(true) {
			System.out.println("Input Msg");
			String txt = sc.nextLine();
			if(txt.equals("q")) {
				break;
			}
			Msg msg = new Msg("Admin",txt); 
			sendMsg(msg);
		}
		sc.close();
	}
	
	
	public static void main(String[] args) {
		Server server = null;
		try {
			server = new Server(8888);
			server.serverStart();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}



```

## Msg

```java
package tcpip2;

import java.io.Serializable;

public class Msg implements Serializable{
	String id;
	String msg;
	String wUser;
	public Msg() {
	}
	public Msg(String id, String msg) {
		this.id = id;
		this.msg = msg;
	}
	public Msg(String id, String msg,String wUser) {
		this.id = id;
		this.msg = msg;
		this.wUser = wUser;
	}
	
	
	public String getwUser() {
		return wUser;
	}
	public void setwUser(String wUser) {
		this.wUser = wUser;
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
	
}

```

