// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const formElement = document.getElementById('introForm');
    const clearBtn = document.getElementById('clearBtn');
    const addCourseBtn = document.getElementById('addCourse');
    const coursesContainer = document.getElementById('courses-container');
    const formContainer = document.getElementById('form-container');
    const resultContainer = document.getElementById('result-container');
    const pictureFileInput = document.getElementById('pictureFile');

    // Variable to store uploaded image data
    let uploadedImageData = null;

    // Function to add delete listeners to existing delete buttons
    function addDeleteListeners() {
        const deleteButtons = document.querySelectorAll('.deleteCourse');
        deleteButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                this.closest('.course-entry').remove();
            });
        });
    }

    // Generate result page matching introduction.html exactly
    function generateResult() {
        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const middleName = document.getElementById('middleName').value.trim();
        const nickname = document.getElementById('nickname').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const mascotAdjective = document.getElementById('mascotAdjective').value.trim();
        const mascotAnimal = document.getElementById('mascotAnimal').value.trim();
        
        // Use uploaded image data
        const pictureUrl = uploadedImageData;
        
        const pictureCaption = document.getElementById('pictureCaption').value.trim();
        
        // Get background information
        const personalBg = document.getElementById('personalBg').value.trim();
        const academicBg = document.getElementById('academicBg').value.trim();
        const subjectBg = document.getElementById('subjectBg').value.trim();
        const platform = document.getElementById('platform').value.trim();
        const funnyItem = document.getElementById('funnyItem').value.trim();

        // Get courses
        const courseEntries = coursesContainer.querySelectorAll('.course-entry');
        const courses = [];
        courseEntries.forEach(function(entry) {
            const dept = entry.querySelector('.courseDept').value.trim();
            const num = entry.querySelector('.courseNum').value.trim();
            const name = entry.querySelector('.courseName').value.trim();
            const reason = entry.querySelector('.courseReason').value.trim();
            if (dept && num && name && reason) {
                courses.push({ dept: dept, num: num, name: name, reason: reason });
            }
        });

        // Build full name
        let fullName = firstName;
        if (middleName) {
            fullName += ' ' + middleName;
        }
        if (nickname) {
            fullName += ' "' + nickname + '"';
        }
        fullName += ' ' + lastName;

        // Generate result HTML matching the EXACT structure of introduction.html
        let resultHTML = '';
        resultHTML += '<h2>Introduction Form</h2>';
        resultHTML += '<h2>' + fullName + ' || ' + mascotAdjective + ' ' + mascotAnimal + '</h2>';
        resultHTML += '<figure>';
        resultHTML += '<img src="' + pictureUrl + '" alt="' + pictureCaption + '">';
        resultHTML += '<figcaption>' + pictureCaption + '</figcaption>';
        resultHTML += '</figure>';
        resultHTML += '<ul>';
        resultHTML += '<li><b>Personal Background</b>: ' + personalBg + '</li>';
        resultHTML += '<li><b>Academic Background</b>: ' + academicBg + '</li>';
        resultHTML += '<li><b>Background in the Subject</b>: ' + subjectBg + '</li>';
        resultHTML += '<li><b>Primary Platform/Computer</b>: ' + platform + '</li>';

        // Add courses section if there are any courses
        if (courses.length > 0) {
            resultHTML += '<li><b>Courses I\'m Taking, & Why</b>:';
            resultHTML += '<ul>';
            
            courses.forEach(function(course) {
                resultHTML += '<li><b>' + course.dept + ' ' + course.num + '</b> - ' + course.name + ': ' + course.reason + '</li>';
            });
            
            resultHTML += '</ul>';
            resultHTML += '</li>';
        }

        // Close the main ul and add funny item
        resultHTML += '<li><b>Funny/Interesting Item</b>: ' + funnyItem + '</li>';
        resultHTML += '</ul>';
        resultHTML += '<button type="button" id="resetResult">Reset Form</button>';

        // Display result
        resultContainer.innerHTML = resultHTML;
        
        // Hide form, show result
        formContainer.style.display = 'none';
        resultContainer.style.display = 'block';

        // Add reset functionality to result page
        document.getElementById('resetResult').addEventListener('click', function() {
            // Show form, hide result
            formContainer.style.display = 'block';
            resultContainer.style.display = 'none';
            
            // Reset form to default values
            formElement.reset();
            
            // Clear uploaded image data
            uploadedImageData = null;
            
            // Scroll to top
            window.scrollTo(0, 0);
        });

        // Scroll to top when result is shown
        window.scrollTo(0, 0);
    }

    // Add delete functionality to existing delete buttons
    addDeleteListeners();

    // Handle file upload
    pictureFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                uploadedImageData = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Prevent default form submission
    formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate required fields
        if (!formElement.checkValidity()) {
            formElement.reportValidity();
            return;
        }

        // Check if image file is uploaded
        if (!uploadedImageData) {
            alert('Please upload an image file.');
            return;
        }

        // Generate the result page
        generateResult();
    });

    // Reset button functionality (built-in, but can add custom behavior if needed)
    formElement.addEventListener('reset', function(e) {
        // The browser handles this automatically
        // This event listener is here in case you need custom reset behavior
        uploadedImageData = null;
    });

    // Clear button functionality
    clearBtn.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Clear all input fields
        const inputs = formElement.querySelectorAll('input:not([type="button"]):not([type="submit"]):not([type="reset"])');
        inputs.forEach(function(input) {
            input.value = '';
        });
        
        // Clear all textareas
        const textareas = formElement.querySelectorAll('textarea');
        textareas.forEach(function(textarea) {
            textarea.value = '';
        });
        
        // Clear file input and reset uploaded image
        const fileInput = document.getElementById('pictureFile');
        if (fileInput) {
            fileInput.value = '';
        }
        uploadedImageData = null;
    });

    // Add course functionality
    addCourseBtn.addEventListener('click', function() {
        const courseEntry = document.createElement('div');
        courseEntry.className = 'course-entry';
        courseEntry.innerHTML = '<label>Department: *</label>' +
            '<input type="text" class="courseDept" required placeholder="e.g., ITIS">' +
            '<label>Number: *</label>' +
            '<input type="text" class="courseNum" required placeholder="e.g., 3135">' +
            '<label>Name: *</label>' +
            '<input type="text" class="courseName" required placeholder="e.g., Web Development">' +
            '<label>Reason: *</label>' +
            '<textarea class="courseReason" required rows="2" placeholder="Why taking this course"></textarea>' +
            '<button type="button" class="deleteCourse">Delete Course</button>';
        
        coursesContainer.appendChild(courseEntry);
        
        // Add delete functionality to the new delete button
        const deleteBtn = courseEntry.querySelector('.deleteCourse');
        deleteBtn.addEventListener('click', function() {
            courseEntry.remove();
        });
    });
});