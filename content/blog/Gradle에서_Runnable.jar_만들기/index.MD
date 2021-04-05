---
title: "Gradle에서 Runnable.jar 만들기"
date: "2021-03-17T22:40:32.169Z"
description: "Gradle에서 Runnable.jar 만들기"
category: "experience"
---

Gradle을 이용해서 Runnable.jar를 만들기 위해선 설정이 필요합니다. 설정 없이 jar를 만들어보면 처음에는 Manifest가 없다고 할 겁니다! 
그러면 아래와 같이 build.gradle에 코드를 추가해주세요.

```
mainClassName = 'wesbin.toy.blog'
version = '1.0'

jar {
    manifest {
        attributes 'Version': version, 'Main-Class': mainClassName
    }
}
```

attributes 중 Version은 없어도 됩니다. Main-Class만 입력하면 동작해요. 
mainClassName은 내가 jar를 실행할 때 실행하고 싶은 Class를 지정해주면 됩니다. 
아래의 코드를 참고하시면 금방 어떻게 작성해 넣어야 하는지 아실 거에요.
  
```
package wesbin.tory

import ...

public class Blog {

~~
    
}
```

이렇게만 해도 jar를 만들어 실행하면 되는 분이 계실 겁니다. 
하지만 자기가 dependencies를 추가하여 코드를 작성하셨다면 ClassNotFoundException이 반기지 않을까 생각합니다.
~~저도 그랬거든요. 젠장. 한 번에 되는 꼴이 없죠. 역시.~~ 만든 jar를 열어보면 작성한 코드만 있을 뿐 dependencies는 어디에도 없죠. 그러면 역시 검색이죠.

```
jar {
    manifest {
        attributes 'Version': version, 'Main-Class': mainClassName
    }
    from {
        configurations.compile.collect {
            it.isDirectory() ? it : zipTree(it)
        }
    }
}
```

하지만 이번에도 역시! 안됩니다. 이유는 dependencies를 추가할 때 사용한 방식이 compile을 사용했는가 혹은 implementation을 사용했는가입니다. 
implementation을 compile로 바꾸고 위의 코드를 사용하면 jar에 dependencies가 제대로 추가된 모습을 볼 수 있죠.

~~**하지만!! 자존심이 허락하지 않습니다!! implementation!!**~~

하하... 아닙니다. 조금 더 그럴듯한 이유가 있습니다. compile은 gradle 3.0버전부터 deprecated 되었습니다. 
그리고 gradle 7.0버전에서는 삭제될 예정입니다(길게도 살아남았네요). 아래는 Gradle 6.8.1 User Manual에서 가져온 사진입니다.

![Gradle 6.8.1 The Java Library plugin configurations](./Gradle_6.8.1_The_Java_Library_plugin_configurations.png)

주목할 부분은 implementation과 compileClasspath. 
그리고 Stack Overflow의 답변 중 휠을 내려 조금 아래에 있는 답변에서 찾은 코드.

```
jar {
    manifest {
        attributes 'Version': version, 'Main-Class': mainClassName
    }
    from {
        configurations.compileClasspath.collect {
            it.isDirectory() ? it : zipTree(it)
        }
    }
}
```

이러면 완벽합니다. **dependencies를 추가할 때 사용한 방식이 complie이면 complie, implementation이면 compileClasspath를 사용하면 된다.** 끝!
