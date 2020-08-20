function loadCards() {
    var body = document.getElementById("roots");
    fetch('http://mysqlcs639.cs.wisc.edu:5000/cards')
        .then(response => response.json())
        .then(data => {
            
            //setting up the cards layout
            var cardParent = document.createElement('div');
            cardParent.className = "card mb-3";
            var temp1 = document.createElement("div");
            temp1.className = "row no-gutters";
            cardParent.appendChild(temp1);
            body.appendChild(cardParent);
            body = temp1;

            for( i = 0; i < data.cards.length; i++){
                var card = document.createElement('div');
                card.className = "card body";
                card.style = "min-width: 200px; background-color: rgb(229, 246, 255);";
                var cardChild = document.createElement("h5");
                cardChild.className = "card-title";
                cardChild.style = "font-size: 2rem; text-align: center; font-family: \"Brush Script MT\", \"Brush Script Std\", cursive;";
                cardChild.innerHTML = data.cards[i].title;
                card.appendChild(cardChild);

                //lists
                cardChild = document.createElement("ul");
                cardChild.className = "card-text";
                for(j = 0; j < data.cards[i].body.length; j++){
                    cardChild.innerHTML += "<li>"+data.cards[i].body[j]+"</li>";
                }
                card.appendChild(cardChild);
                body.appendChild(card);
                
            }
    });
}
