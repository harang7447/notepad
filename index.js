const save = document.querySelector("#save")
const writememo = document.querySelector("#write")
const memos = Array()

function savememo(){
    memos.push(writememo.value)
    let div = document.createElement("div")
    div.innerHTML = memos.slice(-1)[0]
    memolist.append(div)

    // let newMemo = document.createElement("span")
    // newMemo.id = `memo${memos.length}`
    // newMemo.innerHTML = memos.slice(-1)[0]
    // memos.length.append(newMemo)
    
}
save.addEventListener("click", savememo)


// 메모를 배열에 저장, div태그안에 목록추가