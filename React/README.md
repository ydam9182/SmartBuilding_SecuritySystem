# 페이지별 설명
- 로그인 페이지 : 로그인 정보를 통한 인증(RoomNO(로그인ID), LoginPW -> DB 데이터 조회)
  로그인 성공 시 인증토큰 발급(Jsonwebtoken)
- 메뉴페이지
  - 패스워드 변경 : 현재의 패스워드 및 변경패스워드, 변경확인패스워드가 모두 일치 시 Linux(C)서버에 방 호수(RoomNO)와 변경된 패스워드 전달(LoginPW)
  - 원격 문 제어 : 버튼 이벤트를 통해 서버에 RoomNO, open 메세지 전달  
  - 출입자 확인 : RoomNO로 식별한 DB에 등록된 Image 및 time 데이터 조회
