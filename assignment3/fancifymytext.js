function bigger(){
    document.getElementById("fancify-text-area").style.fontSize = "24px";
}
function fancify(){
    document.getElementById("fancify-text-area").classList.add("styled");
}
function reset(){
    document.getElementById("fancify-text-area").classList.remove("styled");
    document.getElementById("fancify-text-area").style.fontSize = "13px";
}
function moo(){
    var textArea = document.getElementById("fancify-text-area");
    var text = textArea.value;
    var fancifiedText = text.split('.').map(function(sentence, index, array) {
        return sentence.trim() + (index < array.length - 1 ? " Moo. " : "");
    }).join('');

    textArea.value = fancifiedText;


}