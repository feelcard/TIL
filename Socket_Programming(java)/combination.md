```java
package test;

class Combination {
	
	public static void main(String[] ar) {
		Combination ex = new Combination();
		int[] arr = { 1, 3, 5, 7, 9, 11, 13, 15 ,17 };
		int n = arr.length;
		int r = 4;
		int[] combArr = new int[n];
		ex.doCombination(combArr, n, r, 0, 0, arr);
	}

	public void doCombination(int[] combArr, int n, int r, int index, int target, int[] arr) {
		System.out.println(" r : "+r+" index : "+ index+" target :"+target);
		if (r == 0) {
			for (int i = 0; i < index; i++)
				System.out.print(arr[combArr[i]]+"("+combArr[i]+")"+ " ");// 콤비넹
			//System.out.println("n : "+n+" r : "+r+" index : "+ index+" target :"+target);
			System.out.println();
		} else if (target == n)
			return;
		else {
			combArr[index] = target;
			
			doCombination(combArr, n, r - 1, index + 1, target + 1, arr);
			doCombination(combArr, n, r, index, target + 1, arr);
		}
	}
}


```

