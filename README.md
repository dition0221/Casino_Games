# JS를 사용하여, Casino 게임들을 만들어봅니다.

@dition0221, @LeeMinGwi

---

- **23-04-26**
    - Update
        - 블랙잭 초기설정
        - 블랙잭 시작버튼 (딜러 1장, 플레이어 2장 드로우)
        - 합계 생성 (J,Q,K = 10, Ace = 1 or 11)
- **23-04-27**
    - Update
        - js파일 주석 업데이트
        - 'hit' 버튼 기능 업데이트
        - 'stay' 버튼 추가
        - CSS 외관 업데이트
        - burst 기능 추가
    - Fix
        - 카드 드로우 및 중복제거 함수(pickCard) while 반복문, 변수명 수정
        - 카드 합계를 나타내는 함수(sumCard) 수정
        - 'play' 버튼 기능 수정
- **23-04-28**
    - Update
        - 'Stay' 버튼 : 딜러가 1장만 드로우 -> 카드 합이 17초과 될 때 까지 드로우
    - Fix
        - 주석 간소화
        - 하드코딩 변수화 (BLACKJACK = 21)
        - burst, black jack 시 글자에 색 추가
        - 'isBurst 함수' 코드 간소화
    - Issue
        - 플레이어의 합계, 딜러의 합계(playerSum, dealerSum)의 유형을 object에서 number로 변경해야 함

  
  
- **to-do**  
    - 블랙잭 게임을 끝내는 기능 추가
    - 게임의 승패 및 승률 추가