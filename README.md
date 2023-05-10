# JS를 사용하여, Casino 게임들을 만들어봅니다.

<a href="https://github.com/dition0221" target="_blank">@dition0221</a>, <a href="https://github.com/LeeMinGwi" target="_blank">@LeeMinGwi</a>

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
        - [해결] 플레이어의 합계, 딜러의 합계(playerSum, dealerSum)의 유형을 object에서 number로 변경해야 함
- **23-05-08**
    - Fix : 
        - [230428 issue] Number형으로 변환
            - console.dir()를 사용하여 값 탐색
            - Number(playerSum.innerText) + let타입을 사용하여 해결
- **23-05-09**
    - Update
        - 카드 8덱으로 변경
    - Fix
        - 'play'시 플레이어가 블랙잭일 때 결과창이 나타나지 않는 현상 수정
        - 'stay'시 딜러가 이김에도 불구하고 버스트까지 드로우하는 현상 수정
            - 딜러가 17보다 작아도 플레이어보다 숫자가 크면 더 이상 드로우하지 않음
        - 'Hit'시 블랙잭이 나오면 승리 결과 표시
- **23-05-10**
    - Update
        - localStorage에 승/패/무 저장
    - Fix
        - 'hit' 시 Burst가 나온 경우에 승패결과가 나오지않는 현상 수정
        - 'stay' 시 딜러 Burst로 플레이어가 승리할 시 승,패 둘 다 적용되는 현상 해결
- **23-05-11**
    - Update
        - 게임을 끝내지 않고 'reset'버튼 클릭 시 1패 적립
        - 게임전적(전, 승, 무, 패, 승률) 표시
    - Fix
        - 상수값("Burst!", "Black Jack!", localStorage 변수) 변수화
        - localStorage에 저장하는 코드 간소화 (함수로 묶음)

---
  
- **to-do**  
    - 승패 효과음 (크아)
    - 배팅액
    - 버튼 클릭 시 효과음 넣기
    - 배경음 넣기
    - 'stay'버튼 1번 당 딜러가 1장씩만 드로우 하기
        - 모든 카드를 일정 시간을 텀을 두고, 자동으로 드로우하기
    - 전적 리셋 버튼 추가