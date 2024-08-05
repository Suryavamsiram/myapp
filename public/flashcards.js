// flashcards.js

const fetchFlashcards = async () => {
    try {
      const res = await fetch('/api/flashcards', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      renderFlashcards(data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const renderFlashcards = (flashcards) => {
    const container = document.getElementById('flashcardsContainer');
    container.innerHTML = '';
    flashcards.forEach(card => {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('flashcard');
      cardDiv.innerHTML = `
        <h3>${card.question}</h3>
        <p>${card.answer}</p>
        <button class="edit-btn" onclick="editFlashcard('${card._id}')">Edit</button>
        <button class="delete-btn" onclick="deleteFlashcard('${card._id}')">Delete</button>
      `;
      container.appendChild(cardDiv);
    });
  };
  
  const addFlashcard = async (e) => {
    e.preventDefault();
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;
    const category = document.getElementById('category').value;
  
    try {
      const res = await fetch('/api/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ question, answer, category }),
      });
  
      const data = await res.json();
      if (data.message) {
        fetchFlashcards();
        document.getElementById('addFlashcardForm').reset();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };
  
  const deleteFlashcard = async (id) => {
    try {
      const res = await fetch(`/api/flashcards/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
  
      const data = await res.json();
      if (data.message) {
        fetchFlashcards();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };
  
  const editFlashcard = (id) => {
    // Fetch flashcard data and show edit form (implementation needed)
  };
  
  document.getElementById('addFlashcardForm').addEventListener('submit', addFlashcard);
  fetchFlashcards();  