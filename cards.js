$(document).ready(function() {
    const cardContainer = $('#card');
    fetch('http://localhost:7000/card')
    .then((response) => response.json())
    .then((data) => {
      appendData(data)
    }
    );
   
  
    const appendData = (cardData) => {
        cardContainer.html('');
        cardData.forEach(card => {
            const cardDiv = $('<div>').attr('id', `id_${card.id}`);
  
            const cardName = $('<h3>').html(card.name);
            cardDiv.append(cardName);
  
            // Detail button
            const detailBtn = $('<button>').html('Detail').attr('id', `detail_${card.id}`);
            let toggleBtn = true;
            detailBtn.click(() => {
                if (toggleBtn == true) {
                    // Show detail
                    const detailEle = $('<div>').html(`
                        <h4>Description: ${card.description}</h4>
                        <h4>Level: ${card.level}</h4>
                        <h4>Point: ${card.point}</h4>
                        <img src=${card.imageURL} width="100px">
                    `);
                    cardName.after(detailEle);
                    toggleBtn = false;
                } else {
                    cardDiv.find('div').remove();
                    toggleBtn = true;
                }
            });
            cardDiv.append(detailBtn);
  
            // Edit button
            const editBtn = $('<button>').html('Edit').attr('id', `edit_${card.id}`);
            editBtn.click(() => {
                window.localStorage.setItem('data', JSON.stringify(card));
                window.location.href = 'edit.html';
            });
            cardDiv.append(editBtn);
  
            // Delete button
            const deleteBtn = $('<button>').html('Delete').attr('id', `delete_${card.id}`);
            deleteBtn.click(() => {
                deleteCard(card.id);
            });
            cardDiv.append(deleteBtn);
  
            cardContainer.append(cardDiv);
        });
    };
  
    const deleteCard = (id) => {
        $.ajax({
            url: 'http://localhost:7000/card/' + id,
            type: 'DELETE',
            success: function(data) {
                appendData(data);
            }
        });
    };
  
    $('#add').click(() => {
        window.location.href = 'add.html';
    });
  });
  