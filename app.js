document.addEventListener('DOMContentLoaded', () => {
    // Function to handle form submission
    const addStudentForm = document.getElementById('addStudentForm');
    addStudentForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevents the default form submission behavior

        // Get form input values
        const studentName = document.getElementById('name').value;
        const studentID = document.getElementById('studentID').value;
        const emailId = document.getElementById('emailId').value;
        const phoneId = document.getElementById('phoneId').value;

        // Call the function to add the student card
        addStudent(studentName, studentID, emailId, phoneId);

        // Clear the form inputs after submission
        addStudentForm.reset();
    });

    // Function to create a new student card
    function addStudent(name, id, email, phone) {
        // Create a new student card element
        const studentCard = document.createElement('div');
        studentCard.classList.add('student-card');

        // Create the student info content
        const studentInfo = document.createElement('div');
        studentInfo.classList.add('student-info');

        const studentDetail = document.createElement('div');
        studentDetail.classList.add('student-detail');

        studentDetail.innerHTML = `
                    <h1>${name}</h1>
                    <p>Student ID: ${id}</p>
                    <p>Email: ${email}</p>
                    <p>Phone: ${phone}</p>
                `;

        // Create buttons for the student card
        const btnStudent = document.createElement('div');
        btnStudent.classList.add('btn-student');

        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.classList.add('btn', 'add-btn');
        addBtn.innerText = 'Add';

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.classList.add('btn', 'edit-btn');
        editBtn.innerText = 'Edit';

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.classList.add('btn', 'delete-btn');
        deleteBtn.innerText = 'Delete';

        btnStudent.appendChild(addBtn);
        btnStudent.appendChild(editBtn);
        btnStudent.appendChild(deleteBtn);

        // Append student details and buttons to the student card
        studentInfo.appendChild(studentDetail);
        studentInfo.appendChild(btnStudent);
        studentCard.appendChild(studentInfo);

        // Append the new student card to the container
        const studentsContainer = document.getElementById('students-container');
        studentsContainer.appendChild(studentCard);
    }
});