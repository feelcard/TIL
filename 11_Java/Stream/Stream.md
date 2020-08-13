```java
package test;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class StreamTest {
	public static void main(String[] args) {
		List<String> names = Arrays.asList("jeong", "pro", "jdk", "java");
		// 기존의 코딩 방식
		long count = 0;
		for (String name : names) {
		    if (name.contains("o")) {
		        count++;
		    }
		}
		System.out.println("Count : " + count); // 2
		System.out.println(names.stream().filter(y ->y.length()>4).count()); 
		// 스트림 이용한 방식
		count = 0;
		count = names.stream().filter(x -> x.contains("o")).count();
		
		System.out.println("Count : " + count); // 2

		
		Stream<Integer> iteratedStream = 
				  Stream.iterate(30, n -> n + 2).limit(30);
        //iterater
		
		System.out.println(iteratedStream.count());



	}
}

```

