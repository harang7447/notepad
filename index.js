const saveMemo = document.querySelector("#save")
const writeMemo = document.querySelector("#write")
const memoList = document.querySelector("#memolist")


const memos = Array()


function getDate(){ // YYYYMMDDHHMMSS
    const today = new Date()

    const year = today.getFullYear()
    const month = today.getMonth()

    const date = today.getDate()
    const hour = today.getHours()
    const minute = today.getMinutes()
    const second = today.getSeconds()

    return `${year}${month}${date}${hour}${minute}${second}`
}

function addMemo(){
    // memos 배열에 메모 추가 
    memos.push({
        date: getDate(),
        text: writeMemo.value
    })
}

function deleteMemo(){
    // memos 배열의 메모 삭제
    
}

function modifyMemo(modifiedText, memoIndex){
    // memos 배열의 메모 수정
}



function renderMemos(){
    const memoDivs = memos.map(memo => `<div id="memo${memo.date}">
    <span>${memo.text}</span>
    <br>
    <button>삭제</button>
    <button>수정</button>
    </div>`)
    memoList.innerHTML = memoDivs.join("")
}



save.addEventListener("click", () => {addMemo(); renderMemos();})

// 메모를 배열에 저장, div태그안에 목록추가



// 2단계에 거쳐서 메모를 변경할 건데, 


// 1. 배열에 메모를 추가, 수정, 삭제 하는 함수
// 2. 현재 배열에 있는 메모를 화면에 출력하는 함수


// savememo를 실행하면 array에 메모를 추가하고, array안에 들어가 있는 value를 HTML문서 상에 추가하는 것 (현재)

// 메모를 추가하는 행위랑 메모를 출력하는 행위를 분리할거에요

// 그래서? 메모를 추가하고 삭제하는 것은, 배열만 추가하고 삭제하면 자동으로 변하게끔 