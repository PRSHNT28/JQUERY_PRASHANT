$(document).ready(function() {
    let card = JSON.parse(window.localStorage.getItem("data"));
    
    $('#nameInput').val(card.name);
    $('#descriptionInput').val(card.description);
    $('#levelInput').val(card.level);
    $('#pointInput').val(card.point);
    $('#imageURLInput').val(card.imageURL);

    $('#editForm').submit(function(event) {
        event.preventDefault();

        let updateCard = {};
        updateCard.name = $('#nameInput').val();
        updateCard.description = $('#descriptionInput').val();
        updateCard.level = $('#levelInput').val();
        updateCard.point = $('#pointInput').val();
        updateCard.imageURL = $('#imageURLInput').val();
        fetch('http://localhost:7000/card/' + card.id, 
            {
                method: 'PUT',
                body: JSON.stringify(updateCard),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                window.location.href="card.html";
            })
    });
});
