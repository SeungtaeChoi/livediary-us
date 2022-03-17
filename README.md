## 시간을 생생하게 기록하고, 효율적으로 사용하도록 도와줍니다.

## 실행환경
- HOSTING  
    aws > ec2  
- OS  
    linux ubuntu 20.04  
- WEB SERVER  
    nginx, nodejs  

## 개발환경, 프레임워크, 라이브러리
- FRONTEND  
    nodejs  
    react (creact-react-app)  
    html  
    css (material design)  
    javascript
- BACKEND  
    nodejs  
    express  
    mysql  

## BACKEND response state policy 정의
- 2-- 성공  
    200 : GET 요청 성공  
    201 : POST, PUT 요청 성공 - header에 Content-Location을 함께 제공  
    202 : 비동기 작업 요청 (callback, polling) 시 - header에 Content-Location을 함께 제공  
    204 : PUT 요청 시 데이터를 수정할 것이 없을 때, DELETE 완료 시  
  
- 4-- 클라이언트 요청의 에러  
    400 : 잘못된 요청 시  
    401 : 클라이언트가 인증되지 않은 경우 (서버가 클라이언트를 모를 때)  
    403 : 클라이언트가 승인되지 않은 경우 (서버가 클라이언트를 알지만 권한이 없을 때)  
    404 : 요청한 자원이 없을 시  
    405 : 서버가 지원하지 않는 Method인 경우  
    409 : 요청이 서버의 내용과 모순되는 경우 (ex. 없는 데이터를 삭제요청 받을 때)  
    429 : 너무 많은 요청이 올 경우  
  
- 5-- 서버의 에러  
