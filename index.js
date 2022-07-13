const save = document.querySelector("#save")
const writememo = document.querySelector("#write")
function savememo(){
    const memo = writememo.value
    console.log(memo)
}
save.addEventListener("click", savememo)
// 메모를 배열에 저장, div태그안에 목록추가