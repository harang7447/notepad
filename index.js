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
    isAdd = false // 지금부터는 수정할것입니다.
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
    
    isAdd = true
}

function saveAndModMemo(memo){
    if (writeMemo.value != ""){
        if (isAdd) addMemo()
        else modifyMemo()
        writeMemo.value = ""
    }
    else{
        Message(warning)
    }
}

function Message(string){
    string.style.display = "block"
}

function deleteMemo(deleteButtonId){
    const isDelete = confirm("메모를 삭제하시겟습니까")
    if(isDelete){
        const targetDate = deleteButtonId.replace("del", "")
        memos = memos.filter(memo => memo.date !== targetDate)
    }
}

function saveMemosToLocalstorage(){
    localStorage.setItem("memos", JSON.stringify(memos))
}

function loadMemosFromLocalstorage(){
    const tmp = localStorage.getItem("memos")
    return JSON.parse(tmp ? tmp : "[]")
}

function moveMemo(){
    
}

function importMemo(){}

function renderMemos(){
    const memoDivs = memos.map(memo =>`
    <div id="memo${memo.date}">
        <p id="val${memo.date}">${memo.text}</p>
        <button type="button" class="btn btn-outline-primary mb-3 del" id="del${memo.date}" class="del">삭제</button>
        <button type="button" class="btn btn-outline-secondary mb-3 mod" id="mod${memo.date}">수정</button>
    </div>`)
    memoList.innerHTML = memoDivs.join("")

    const deleteButtons = document.querySelectorAll(".del")
    const modifyButtons = document.querySelectorAll(".mod")

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", () => {deleteMemo(deleteButton.id); renderMemos();})
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
const offButton = document.querySelector("#offButton")
const moveMemoButton = document.querySelector("#moveMemoButton")
const importMemoButton = document.querySelector("#importMemoButton")

let memos = loadMemosFromLocalstorage()
let isAdd = true
let modifyingDate = undefined

saveMemo.addEventListener("click", () => {saveAndModMemo(); renderMemos();})
offButton.addEventListener("click", () => {warning.style.display = "none"})
moveMemoButton.addEventListener("click", () => {moveMemo()})
importMemoButton.addEventListener("click", () => {importMemo(); renderMemos()})

renderMemos()
// 1. 수정 버튼을 누르면 textarea #write에 memo.text가 입력될거에요 
// 2. text area에 수정할 메모를 입력하고 
// 3. 저장버튼을 누르면 수정이 되는거죠.
// 부트스트랩으로 메모삭제 경고메세지, 메모 옮기기메세만들기
// 추가해야할 기능 휴지통, 설정
// 휴지통 30일 뒤에 메모 완전 삭제, 설정 언어, 메모삭제 메세지등등, 메모 저정했을 때 메모내역이 없으면 경고뜨는것 등 설정헤제, 설정 별표 친 메모는 삭제불가