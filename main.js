document.querySelector(".button").addEventListener('click', () =>{
     
    let yourName = prompt("Whats Your Name");

    if(yourName == null || yourName == ""){

        document.querySelector(".name span").innerHTML = 'Unknow';
    }else{
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".button").remove(); 
    
    flipAllBlocks();

    setTimeout(() =>{
        
     flipAllBlocksAgain();

    },duration +500);

});



    function flipAllBlocks() {

      blocks.forEach((block) => {

        flipBlock(block);

      });
    }
    function flipAllBlocksAgain() {

        blocks.forEach(block => {

            block.classList.remove('is-flipped');

            block.classList.remove('has-match');

        });
    }

let duration = 1000;

let blocksContainer = document.querySelector(".game-container");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block , index) => {

    block.style.order = orderRange[index];
    
    block.addEventListener("click", function(){
        
        flipBlock(block);

    });
});


function flipBlock(selectedBlock){

    selectedBlock.classList.toggle('is-flipped');
    
    let allFlippedBlocks = blocks.filter(flippedblock => flippedblock.classList.contains('is-flipped'));

    if(allFlippedBlocks.length === 2){
        
        stopClicking();
        
        checkedMatchBlocks(allFlippedBlocks[0] , allFlippedBlocks[1]);
    }
}
function stopClicking(){

    blocksContainer.classList.add('no-clicking');

    setTimeout(() =>{
        
        blocksContainer.classList.remove('no-clicking');

    },duration);

}
//Checked Matched Block
function checkedMatchBlocks(firstBlock,secondBlock){

    let triesElement = document.querySelector(".tries span");

    if(firstBlock.dataset.animal === secondBlock.dataset.animal){

        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

    }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");

        },duration);

    }
}
// Shuffle Function
function shuffle(array){
    let current = array.length,
        temp,
        random;
    
    while (current > 0){
        
        random = Math.floor(Math.random() * current);
        
        current--;
        
        temp = array[current];
        
        array[current] = array[random];
        
        array[random] = temp;
    }
    return array;
}
