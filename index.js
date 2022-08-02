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

function saveAndModMemo(memo){
    if (isAdd) addMemo();
    else modifyMemo();
    writeMemo.value = ""
}

function deleteMemo(deleteButtonId){
    const targetDate = deleteButtonId.replace("del", "")
    memos = memos.filter(memo => memo.date !== targetDate)
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

    // writeMemo.vale = memo.text

}



function modifyMemo(){

    // modifyingDate와 Date가 같은 요소를 찾고,
    // 이번에는 writeMemo.value로 그 친구의 text값을 지정해주면 

    // memo.text = writeMemo.value

    memos.forEach(memo => {
        if(memo.date == modifyingDate){
            memo.text = writeMemo.value
        }
    })

    isAdd = true;
}


function renderMemos(){
    const memoDivs = memos.map(memo =>`
    <div id="memo${memo.date}">
        <p id="val${memo.date}">${memo.text}</p>
        <button id="del${memo.date}" class="del">삭제</button>
        <button id="mod${memo.date}" class="mod">수정</button>
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
}

const saveMemo = document.querySelector("#save")
const writeMemo = document.querySelector("#write")
const memoList = document.querySelector("#memolist")

let memos = Array()
let isAdd = true;
let modifyingDate = undefined;

saveMemo.addEventListener("click", () => {saveAndModMemo(); renderMemos();})

// 1. 수정 버튼을 누르면 textarea #write에 memo.text가 입력될거에요 
// 2. text area에 수정할 메모를 입력하고 
// 3. 저장버튼을 누르면 수정이 되는거죠. 