# Kanban-board

#### [ 개요 ]
- CRUD가 가능한 To-do list에 드래그 앤 드랍으로 이동 가능한 칸반 보드 형식을 적용시킨 웹페이지
- 추가 버튼을 클릭하여 할 일 카드를 추가
- 각 카드는 다른 칼럼으로 이동하거나 수정 및 삭제 가능
#### [ 사용 기술 ]
<img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=black"/> <img alt="Vite" src ="https://img.shields.io/badge/Vite-646CFF.svg?&style=for-the-badge&logo=Vite&logoColor=white"/> <img alt="reactquery" src ="https://img.shields.io/badge/reactquery-FF4154.svg?&style=for-the-badge&logo=reactquery&logoColor=white"/><br/>
<img alt="axios" src ="https://img.shields.io/badge/axios-5A29E4.svg?&style=for-the-badge&logo=axios&logoColor=white"/> <img alt="testinglibrary" src ="https://img.shields.io/badge/testinglibrary-E33332.svg?&style=for-the-badge&logo=testinglibrary&logoColor=white"/> <img alt="jest" src ="https://img.shields.io/badge/jest-C21325.svg?&style=for-the-badge&logo=jest&logoColor=white"/>

#### [ 결과물 ]
- #### 기본 화면 (반응형)
<img width="1728" alt="스크린샷 2024-08-12 오후 4 25 51" src="https://github.com/user-attachments/assets/0f0f81a9-bd3a-48d3-8d01-1dc069260f2e">
<img width="1728" alt="스크린샷 2024-08-23 오후 5 30 08" src="https://github.com/user-attachments/assets/b9f6797d-8b3e-4fb0-8579-fd75fe69af88">
<img width="1728" alt="스크린샷 2024-08-23 오후 5 34 41" src="https://github.com/user-attachments/assets/474d14a2-8ed3-4b01-8acc-7d9371e31829">

- #### 카드 추가 / 수정 / 삭제

![Aug-23-2024 16-57-48](https://github.com/user-attachments/assets/406a7eaf-bf3a-4960-9f3a-47fd95e2d6ac)
↑ 추가 버튼(+) 클릭하면 자동으로 input칸에 포커스 됨. 할 일 입력 후 엔터키 또는 확인 버튼을 눌러 추가</br>

![Aug-23-2024 17-53-43](https://github.com/user-attachments/assets/0b6338cd-1aec-465d-a482-1995c7fda976)</br>
↑ 수정 / 삭제 및 카드 순서 변경

- #### 드래그 앤 드랍
  
![Aug-23-2024 18-11-53](https://github.com/user-attachments/assets/5d0b70a3-5508-4151-9f88-f1c8008ecfa2)
↑ 해당 칼럼으로 카드 이동 시 배경 색깔이 변하며 사용자가 알 수 있도록 함

- #### 로딩 화면 메세지 / 빈칸 입력 에러메세지

<img width="500" alt="스크린샷 2024-08-23 오후 6 16 04" src="https://github.com/user-attachments/assets/5c78414d-ce73-4df0-a1a1-6ccc45ff1d52"> <img width="500" alt="스크린샷 2024-08-23 오후 6 16 19" src="https://github.com/user-attachments/assets/f901a575-71a6-4f05-b139-2f6d8f5eab75"></br>
↑ 로딩 화면 및 로딩 실패 시 메시지 구현</br></br>

![Aug-23-2024 18-24-28](https://github.com/user-attachments/assets/074f3029-2b09-4df7-8dd6-ce14aaedc770)
↑ 내용을 입력하지 않고 추가 버튼 클릭 시 에러 메시지 구현
