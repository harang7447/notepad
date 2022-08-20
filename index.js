function getDate(){ // YYYYMMDDHHMMSS
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const date = today.getDate()
    const hour = today.getHours()
    const minute = today.getMinutes()
    const second = today.getSeconds()
    const milliseconds = today.getMilliseconds()

    return `${year}${month}${date}${hour}${minute}${second}${milliseconds}`
}

function addMemo(){
    // memos 배열에 메모 추가 
    memos.push({
        date: getDate(),
        text: writeMemo.value
    })
}

function loadModifyMemo(modifyButtonId){
    isAdd = false; // 지금부터는 수정할것입니다.
    modifyingDate = modifyButtonId.replace("mod", "")
    memos.forEach(memo => {
        if(memo.date == modifyingDate){
            writeMemo.value = memo.text
        }
    })

    // memos에서 modifyingDate와 date가 같은 요소를 찾고, 
    // 그 친구의 text값을 writeMemo.value로 지정해주면 되겠죠?
}

function modifyMemo(){
    // modifyingDate와 Date가 같은 요소를 찾고,
    // 이번에는 writeMemo.value로 그 친구의 text값을 지정해주면 

    memos.forEach(memo => {
        if(memo.date == modifyingDate){
            memo.text = writeMemo.value
        }
    })
    
    isAdd = true;
}

function saveAndModMemo(memo){
    if (writeMemo.value != ""){
        if (isAdd) addMemo();
        else modifyMemo();
        writeMemo.value = ""
    }
    else{
        warningMessage()
    }
}

function warningMessage(){
    warning.innerHTML = `
    <div class="alert alert-info alert-dismissible" role="alert" id="liveAlert">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        매모를 입력하지 않았습니다
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
}

function deleteMemo(deleteButtonId){
    const targetDate = deleteButtonId.replace("del", "")
    memos = memos.filter(memo => memo.date !== targetDate)
}

function saveMemosToLocalstorage(){
    localStorage.setItem("memos", JSON.stringify(memos))
}

function loadMemosFromLocalstorage(){
    const tmp = localStorage.getItem("memos");
    return JSON.parse(tmp ? tmp : "[]");
}

function renderMemos(){
    const memoDivs = memos.map(memo =>`
    <div id="memo${memo.date}">
        <p id="val${memo.date}">${memo.text}</p>
        <button type="button" class="btn btn-primary mb-3 del" id="del${memo.date}" class="del">삭제</button>
        <button type="button" class="btn btn-light mb-3 mod" id="mod${memo.date}">수정</button>
    </div>`)
    memoList.innerHTML = memoDivs.join("")

    const deleteButtons = document.querySelectorAll(".del")
    const modifyButtons = document.querySelectorAll(".mod")

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", () => {deleteMemo(deleteButton.id); renderMemos();});
    })

    modifyButtons.forEach(modifyButton => {
        modifyButton.addEventListener("click", () => {loadModifyMemo(modifyButton.id);})
    })

    saveMemosToLocalstorage()
}

const saveMemo = document.querySelector("#save")
const writeMemo = document.querySelector("#write")
const memoList = document.querySelector("#memolist")
const warning = document.querySelector("#warning")

let memos = loadMemosFromLocalstorage()
let isAdd = true;
let modifyingDate = undefined;

saveMemo.addEventListener("click", () => {saveAndModMemo(); renderMemos();})
renderMemos()
// 1. 수정 버튼을 누르면 textarea #write에 memo.text가 입력될거에요 
// 2. text area에 수정할 메모를 입력하고 
// 3. 저장버튼을 누르면 수정이 되는거죠.